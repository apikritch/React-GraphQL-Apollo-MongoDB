import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
  date: String,
  title: String,
  comment: String,
  rating: Number,
  productId: String,
});

const Review = model("Review", reviewSchema);

export default Review;
