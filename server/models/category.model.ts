import mongoose, { Schema, Document, Model } from "mongoose";
import { TableNames } from "../constants/table-names";
import { CategoryDto } from "../dtos/category.dto";
import { IUser } from "./user.model";

export interface ICategory extends Document {
  parentCategoryId?: string;
  name: string;
  description?: string;
  user: IUser | mongoose.Schema.Types.ObjectId;
  toDto: () => CategoryDto;
}

const CategorySchema: Schema = new Schema(
  {
    parentCategoryId: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: TableNames.User,
      required: true,
    },
  },
  {
    collection: TableNames.Category,
  }
);

CategorySchema.methods.toDto = function (): CategoryDto {
  return {
    id: this._id.toString(),
    parentCategoryId: this.parentCategoryId,
    name: this.name,
    description: this.description,
    user: (this.user as IUser).toDto(),
  };
};

const Category: Model<ICategory> = mongoose.model<ICategory>(
  TableNames.Category,
  CategorySchema
);

export default Category;
