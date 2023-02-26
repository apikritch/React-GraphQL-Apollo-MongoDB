import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import dotenv from "dotenv";

import typeDefs from "./graphql/typeDefs/index.js";
import resolvers from "./graphql/resolvers/index.js";

dotenv.config();

mongoose.set("strictQuery", true);

await mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT, host: process.env.HOST },
  context: async ({ req }) => {
    // const user = Authentication(req);
    // return { user: user };
  },
});

console.log(`🚀  Server ready at: ${url}`);

// const startServer = async () => {
//   await mongoose
//     .connect(process.env.MONGODB)
//     .catch((err) => console.error(err))
//     .then(() => {
//       console.log("Connected");
//       return startStandaloneServer(server, {
//         listen: { port: 4000, host: "localhost" },
//         context: async ({ req }) => {
//           // const user = Authentication(req);
//           // return { user: user };
//         },
//       });
//     })
//     .then(({ url }) => {
//       console.log(`🚀  Server ready at: ${url}`);
//     });
// };
// startServer();
