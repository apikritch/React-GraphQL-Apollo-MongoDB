import Review from "../../models/Review.js";
import moment from "moment";

const reviews = {
  Mutation: {
    addReview: async (parent, { input }, context) => {
      console.log({
        ...input,
        date: moment(Date.now()).format("YYYY-MM-DD"),
      });
      try {
        const result = await Review.create({
          ...input,
          date: moment(Date.now()).format("YYYY-MM-DD"),
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    updateReview: async (parent, { id, input }, context) => {
      try {
        const result = await Review.findByIdAndUpdate(
          id,
          {
            ...input,
            date: moment(Date.now()).format("YYYY-MM-DD"),
          },
          {
            new: true,
          }
        );
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    deleteReview: async (parent, { id }, context) => {
      try {
        await Review.findByIdAndDelete(id);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Query: {
    reviews: async (parent, args, context) => {
      const result = await Review.find();
      return result;
    },
  },
};

export default reviews;
