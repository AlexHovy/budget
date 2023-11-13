import { ObjectId } from "mongodb";
import { CategoryDto } from "../dtos/category.dto";
import Category, { ICategory } from "../models/category.model";
import { IRepositoryService } from "./interfaces/repository.interface";

export class CategoryService {
  constructor(private categoryRepository: IRepositoryService<ICategory>) {}

  async create(categoryDto: CategoryDto): Promise<CategoryDto | null> {
    try {
      const category = await this.categoryRepository.create({
        parentCategoryId: categoryDto.parentCategoryId,
        name: categoryDto.name,
        description: categoryDto.description,
        userId: new ObjectId(categoryDto.userId),
      });
      return category.toDto();
    } catch (err) {
      throw err;
    }
  }

  async update(categoryDto: CategoryDto): Promise<CategoryDto | null> {
    try {
      const category = await this.categoryRepository.update(categoryDto.id, {
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

  async delete(id: string): Promise<void> {
    try {
      await this.categoryRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
