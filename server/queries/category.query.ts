import { TableNames } from "../constants/table-names";
import Category, { CategoryDto } from "../models/category.model";

export class CategoryQuery {
  static async getAll(): Promise<CategoryDto[]> {
    try {
      const categories = await Category.find().populate(TableNames.User);
      return categories.map((category) => category.toDto());
    } catch (err) {
      throw err;
    }
  }

  static async getById(id: string): Promise<CategoryDto | null> {
    try {
      const category = await Category.findById(id).populate(TableNames.User);
      if (!category) return null;
      return category.toDto();
    } catch (err) {
      throw err;
    }
  }
}
