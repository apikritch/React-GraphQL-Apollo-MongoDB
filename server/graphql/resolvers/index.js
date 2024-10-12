import categories from "./categories.js";
import products from "./products.js";
import reviews from "./reviews.js";
import users from "./users.js";

const resolvers = {
  Query: {
    ...categories.Query,
    ...products.Query,
    ...reviews.Query,
    ...users.Query,
  },
  Mutation: {
    ...categories.Mutation,
    ...products.Mutation,
    ...reviews.Mutation,
    ...users.Mutation,
  },
  Category: { ...categories.Category },
  Product: { ...products.Product },
};

export default resolvers;
