import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: String,
  image: String,
});

const Category = model("Category", categorySchema);

export default Category;
