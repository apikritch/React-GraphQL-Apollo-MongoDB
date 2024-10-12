import Product from "../../models/Product.js";
import Category from "../../models/Category.js";
import Review from "../../models/Review.js";

const products = {
  Mutation: {
    addProduct: async (parent, { input }, context) => {
      try {
        const result = await Product.create(input);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    updateProduct: async (parent, { id, input }, context) => {
      try {
        const result = await Product.findByIdAndUpdate(id, input, {
          new: true,
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct: async (parent, { id }, context) => {
      try {
        await Product.findByIdAndDelete(id);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Query: {
    products: async (parent, { filter }, context) => {
      let filteredProducts = await Product.find();
      if (filter) {
        const { name, categoryId, onSale, avgRating } = filter;

        if (name) {
          filteredProducts = filteredProducts.filter((product) => {
            return product.name.toLowerCase().includes(name.toLowerCase());
          });
        }
        if (categoryId) {
          filteredProducts = filteredProducts.filter((product) => {
            return product.categoryId === categoryId;
          });
        }
      }
      return filteredProducts;
    },
    product: async (parent, { id }, context) => {
      const result = await Product.findById(id);
      return result;
    },
  },
  Product: {
    category: async ({ categoryId }, args, context) => {
      const result = await Category.findById(categoryId);
      return result;
    },
    reviews: async ({ id: productId }, args, context) => {
      const result = await Review.find({ productId: productId });
      return result;
    },
  },
};

export default products;
