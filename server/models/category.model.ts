import mongoose, { Schema, Document, Model } from "mongoose";

export interface CategoryDto {
  id: string;
  name: string;
  description?: string;
}

interface ICategory extends Document {
  name: string;
  description?: string;
  toDto: () => CategoryDto;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

CategorySchema.methods.toDto = function (): CategoryDto {
  return {
    id: this._id.toString(),
    name: this.name,
    description: this.description,
  };
};

const Category: Model<ICategory> = mongoose.model<ICategory>(
  "category",
  CategorySchema
);

export default Category;
