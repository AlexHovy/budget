import mongoose, { Schema, Document, Model } from "mongoose";
import { TableNames } from "../constants/table-names";
import { UserDto } from "./user.model";

export interface CategoryDto {
  id: string;
  parentCategoryId?: string;
  user: UserDto;
  name: string;
  description?: string;
}

interface ICategory extends Document {
  parentCategoryId?: string;
  name: string;
  description?: string;
  toDto: () => CategoryDto;
}

const CategorySchema: Schema = new Schema({
  parentCategoryId: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: TableNames.User },
});

CategorySchema.methods.toDto = function (): CategoryDto {
  return {
    id: this._id.toString(),
    parentCategoryId: this.parentCategoryId,
    user: this.user.toDto(),
    name: this.name,
    description: this.description,
  };
};

const Category: Model<ICategory> = mongoose.model<ICategory>(
  TableNames.Category,
  CategorySchema
);

export default Category;
