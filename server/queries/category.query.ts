import { CategoryDto } from "../dtos/category.dto";
import Category, { ICategory } from "../models/category.model";
import { IRepositoryService } from "../services/interfaces/repository.interface";

export class CategoryQuery {
  constructor(private categoryRepository: IRepositoryService<ICategory>) {}

  async getAll(userId: string): Promise<CategoryDto[]> {
    try {
      const categories = await this.categoryRepository.findAllBy({ userId });
      return categories.map((category) => category.toDto());
    } catch (err) {
      throw err;
    }
  }

  async getById(id: string): Promise<CategoryDto | null> {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) return null;
      return category.toDto();
    } catch (err) {
      throw err;
    }
  }
}
