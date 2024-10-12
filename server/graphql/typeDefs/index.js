import { mergeTypeDefs } from "@graphql-tools/merge";

import categoryTypeDefs from "./categoryTypeDefs.js";
import productTypeDefs from "./productTypeDefs.js";
import reviewTypeDefs from "./reviewTypeDefs.js";
import userTypeDefs from "./userTypeDefs.js";

const mergedTypeDefs = mergeTypeDefs([
  categoryTypeDefs,
  productTypeDefs,
  reviewTypeDefs,
  userTypeDefs,
]);

export default mergedTypeDefs;
