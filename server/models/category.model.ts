import mongoose, { Schema, Model } from "mongoose";
import { ObjectId } from "mongodb";
import { TableNames } from "../constants/table-names";
import { CategoryDto } from "../dtos/category.dto";
import BaseSchema, { IBase } from "./base.model";

export interface ICategory extends IBase {
  parentCategoryId?: string;
  name: string;
  description?: string;
  userId: ObjectId;
  toDto: () => CategoryDto;
}

const CategorySchema: Schema = new Schema(
  {
    parentCategoryId: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    userId: {
      type: ObjectId,
      required: true,
    },
  },
  {
    collection: TableNames.Category,
  }
);
CategorySchema.add(BaseSchema);

CategorySchema.methods.toDto = function (): CategoryDto {
  return {
    id: this._id.toString(),
    parentCategoryId: this.parentCategoryId,
    name: this.name,
    description: this.description,
    userId: this.userId.toString(),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const Category: Model<ICategory> = mongoose.model<ICategory>(
  TableNames.Category,
  CategorySchema
);

export default Category;
