import User from "../../models/User.js";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const comparePassword = async (loginPassword, password) => {
  const result = await bcrypt.compare(loginPassword, password);
  return result;
};

const users = {
  Mutation: {
    async registerUser(parent, { registerInput }, context) {
      const { email, password } = registerInput;

      const oldUser = await User.findOne({ email: email });

      if (oldUser) {
        throw new GraphQLError(
          "A user is already registered with the email: " + email,
          { extensions: { code: "USER_ALREADY_EXISTS" } }
        );
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email: email,
        password: encryptedPassword,
        role: "USER",
      });

      const token = jwt.sign(
        {
          user_id: newUser._id,
          email,
          role: "USER",
        },
        "secret",
        { expiresIn: "2h" }
      );

      const result = await User.findByIdAndUpdate(
        newUser._id,
        {
          token,
        },
        {
          new: true,
        }
      );
      return result;
    },
    async loginUser(parent, { loginInput }, context) {
      const { email, password } = loginInput;

      const user = await User.findOne({ email });

      if (user) {
        const validPassword = await comparePassword(password, user.password);

        if (validPassword) {
          const token = jwt.sign(
            {
              user_id: user._id,
              email,
              role: user.role,
            },
            "secret",
            { expiresIn: "2h" }
          );

          const result = await User.findOneAndUpdate(
            { email },
            { token },
            { returnOriginal: false }
          );

          return result;
        } else {
          throw new GraphQLError("Incorrect email or password", {
            extensions: { code: "INCORRECT_EMAIL_OR_PASSWORD" },
          });
        }
      } else {
        throw new GraphQLError("Incorrect email or password", {
          extensions: { code: "INCORRECT_EMAIL_OR_PASSWORD" },
        });
      }
    },
  },
  Query: {
    user: async (parent, { id }, context) => {
      const result = await User.findById(id);
      return result;
    },
  },
};

export default users;
