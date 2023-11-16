import { ObjectId } from "mongodb";
import { CategoryDto } from "../dtos/category.dto";
import { ICategory } from "../models/category.model";
import { IRepositoryService } from "./interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";

export class CategoryService {
  constructor(private categoryRepository: IRepositoryService<ICategory>) {}

  async create(
    categoryDto: CategoryDto,
    userId: string
  ): Promise<CategoryDto | null> {
    try {
      const category = await this.categoryRepository.create({
        parentCategoryId: categoryDto.parentCategoryId,
        name: categoryDto.name,
        description: categoryDto.description,
        userId: new ObjectId(userId),
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
}
