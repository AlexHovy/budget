import { CategoryDto } from "../dtos/category.dto";
import Category from "../models/category.model";

export class CategoryService {
  static async create(categoryDto: CategoryDto): Promise<CategoryDto | null> {
    try {
      const category = await Category.create({
        parentCategoryId: categoryDto.parentCategoryId,
        name: categoryDto.name,
        description: categoryDto.description,
        userId: categoryDto.userId,
      });
      return category.toDto();
    } catch (err) {
      throw err;
    }
  }

  static async update(categoryDto: CategoryDto): Promise<CategoryDto | null> {
    try {
      const category = await Category.findByIdAndUpdate(categoryDto.id, {
        parentCategoryId: categoryDto.parentCategoryId,
        name: categoryDto.name,
        description: categoryDto.description,
        updatedAt: new Date(),
      });
      if (!category) return null;
      return category.toDto();
    } catch (err) {
      throw err;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await Category.findByIdAndRemove(id);
    } catch (err) {
      throw err;
    }
  }
}
