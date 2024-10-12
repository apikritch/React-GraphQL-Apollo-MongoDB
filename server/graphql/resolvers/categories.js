import Category from "../../models/Category.js";
import Product from "../../models/Product.js";

const categories = {
  Mutation: {
    addCategory: async (parent, { input }, context) => {
      try {
        const result = await Category.create(input);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    updateCategory: async (parent, { id, input }, context) => {
      try {
        const result = await Category.findByIdAndUpdate(id, input, {
          new: true,
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    deleteCategory: async (parent, { id }, context) => {
      try {
        await Category.findByIdAndDelete(id);
        return true;
      } catch (error) {
        console.log(error);
      }

      // db.products = db.products.map((product) => {
      //   if (product.categoryId === id) {
      //     return { ...product, categoryId: null };
      //   } else {
      //     return product;
      //   }
      // });
    },
  },
  Query: {
    categories: async (parent, { filter }, context) => {
      let filteredCategories = await Category.find();
      if (filter) {
        const { name } = filter;

        if (name) {
          filteredCategories = filteredCategories.filter((category) => {
            return category.name.toLowerCase().includes(name.toLowerCase());
          });
        }
      }
      return filteredCategories;
    },
    category: async (parent, { id }, context) => {
      const result = await Category.findById(id);
      return result;
    },
  },
  Category: {
    products: async ({ id: categoryId }, { filter }, context) => {
      let filteredProducts = await Product.find({ categoryId: categoryId });
      return filteredProducts;
    },
  },
};

export default categories;
