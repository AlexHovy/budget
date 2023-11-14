import mongoose, { Schema, Model } from "mongoose";
import { TableNames } from "../constants/table-names";
import { CategoryDto } from "../dtos/category.dto";
import UserBaseSchema, { IUserBase } from "./bases/user-base.model";

export interface ICategory extends IUserBase {
  parentCategoryId?: string;
  name: string;
  description?: string;
  toDto: () => CategoryDto;
}

const CategorySchema: Schema = new Schema(
  {
    parentCategoryId: { type: String },
    name: { type: String, required: true },
    description: { type: String },
  },
  {
    collection: TableNames.Category,
  }
);
CategorySchema.add(UserBaseSchema);

CategorySchema.methods.toDto = function (): CategoryDto {
  const userBaseDto = UserBaseSchema.methods.toDto.call(this);
  return {
    id: this._id.toString(),
    parentCategoryId: this.parentCategoryId,
    name: this.name,
    description: this.description,
    ...userBaseDto,
  };
};

const Category: Model<ICategory> = mongoose.model<ICategory>(
  TableNames.Category,
  CategorySchema
);

export default Category;
