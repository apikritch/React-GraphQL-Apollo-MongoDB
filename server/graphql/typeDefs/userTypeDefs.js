const userTypeDefs = `#graphql
    type Query {
        user(id:ID!): User
    }

    type Mutation {
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
    }

    type User {
        email: String
        password: String
        token: String
        role: String
    }

    input RegisterInput {
        email: String!
        password: String!
    }

    input LoginInput {
        email: String
        password: String
    }
`;

export default userTypeDefs;
