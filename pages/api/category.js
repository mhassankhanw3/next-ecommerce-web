import { mongooseConnect } from "../../lib/mongoose";
import { Category } from "../../models/category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parentCategory"));
  }

  if (method === "POST") {
    const { categoryName, parentCategory } = req.body;
    const categoryDoc = await Category.create({
      categoryName,
      parentCategory,
    });
    res.json(categoryDoc);
  }
  if (method === "PUT") {
    const { categoryName, parentCategory, _id } = req.body;
    await Category.updateOne({ _id }, { categoryName, parentCategory });
    res.json(true);
  }
}
