import { CategoryDto } from "../dtos/category.dto";
import Category, { ICategory } from "../models/category.model";
import { IRepositoryService } from "../services/interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";

export class CategoryQuery {
  constructor(private categoryRepository: IRepositoryService<ICategory>) {}

  async getAll(userId: string): Promise<CategoryDto[]> {
    try {
      const categories = await this.categoryRepository.findAllBy({ userId });
      return categories.map((category) => category.toDto());
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async getById(id: string): Promise<CategoryDto | null> {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) return null;
      return category.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
