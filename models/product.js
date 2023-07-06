import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  selectCategory: { type: mongoose.Types.ObjectId, ref: "Category" },
});

export const Product = models.Product || model("Product", ProductSchema);
