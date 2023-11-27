import { ICategory } from "../models/category.model";
import { IRepositoryService } from "./interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";
import { categoryQuery } from "../configs/dependency.config";
import { CategoryDto } from "../dtos/category.dto";

export class CategoryService {
  constructor(private categoryRepository: IRepositoryService<ICategory>) {}

  async create(
    categoryDto: CategoryDto,
    userId: string
  ): Promise<CategoryDto | null> {
    try {
      const category = await this.categoryRepository.create({
        userId: userId,
        parentCategoryId: categoryDto.parentCategoryId,
        name: categoryDto.name,
        description: categoryDto.description,
      });
      return category.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async update(categoryDto: CategoryDto): Promise<CategoryDto | null> {
    try {
      const category = await this.categoryRepository.update(categoryDto.id, {
        parentCategoryId: categoryDto.parentCategoryId,
        name: categoryDto.name,
        description: categoryDto.description,
      });
      if (!category) return null;
      return category.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async delete(categoryDto: CategoryDto): Promise<CategoryDto | null> {
    try {
      const category = await this.categoryRepository.delete(categoryDto.id);
      if (!category) return null;
      return category.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async deleteChildren(
    parentCategory: CategoryDto,
    userId: string
  ): Promise<void> {
    try {
      const categories = await categoryQuery.getAllChildrenByParentId(
        parentCategory.id,
        userId
      );

      for (const category of categories) {
        await this.delete(category);

        if (category.parentCategoryId)
          await this.deleteChildren(category, userId);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
