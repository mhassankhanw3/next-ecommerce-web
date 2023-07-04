import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  categoryName: { type: String, required: true },
  parentCategory: { type: mongoose.Types.ObjectId, ref: "Category" },
});

export const Category = models?.Category || model("Category", CategorySchema);
