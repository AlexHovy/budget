import { TableNames } from "../constants/table-names";
import Category, { CategoryDto } from "../models/category.model";

export class CategoryService {
  static async Create(categoryDto: CategoryDto): Promise<CategoryDto> {
    try {
      const category = await Category.create(categoryDto);
      return category.toDto();
    } catch (err) {
      throw err;
    }
  }

  static async Update(categoryDto: CategoryDto): Promise<CategoryDto | null> {
    try {
      const category = await Category.findByIdAndUpdate(
        categoryDto.id,
        categoryDto
      ).populate(TableNames.User);
      if (!category) return null;
      return category.toDto();
    } catch (err) {
      throw err;
    }
  }

  static async Delete(id: string): Promise<void> {
    try {
      await Category.findByIdAndRemove(id);
    } catch (err) {
      throw err;
    }
  }
}
