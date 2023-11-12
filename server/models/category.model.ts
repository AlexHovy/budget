import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const Category: Model<ICategory> = mongoose.model<ICategory>(
  "category",
  CategorySchema
);

export default Category;
