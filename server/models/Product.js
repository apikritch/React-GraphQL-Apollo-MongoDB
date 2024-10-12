import { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: String,
  description: String,
  quantity: Number,
  price: Number,
  image: String,
  onSale: Boolean,
  categoryId: String,
});

const Product = model("Product", productSchema);

export default Product;
