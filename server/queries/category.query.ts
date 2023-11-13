import { TableNames } from "../constants/table-names";
import { CategoryDto } from "../dtos/category.dto";
import Category from "../models/category.model";

export class CategoryQuery {
  static async getAll(userId: string): Promise<CategoryDto[]> {
    try {
      const categories = await Category.find({ userId });
      return categories.map((category) => category.toDto());
    } catch (err) {
      throw err;
    }
  }

  static async getById(id: string): Promise<CategoryDto | null> {
    try {
      const category = await Category.findById(id);
      if (!category) return null;
      return category.toDto();
    } catch (err) {
      throw err;
    }
  }
}
