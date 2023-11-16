import { CategoryDto } from "../dtos/category.dto";
import { ICategory } from "../models/category.model";
import { IRepositoryService } from "../services/interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";

export class CategoryQuery {
  constructor(private categoryRepository: IRepositoryService<ICategory>) {}

  async getAll(userId: string): Promise<CategoryDto[]> {
    try {
      const categories = await this.categoryRepository.findAllBy({
        userId: userId,
      });
      return categories.map((category) => category.toDto());
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async getById(id: string, userId: string): Promise<CategoryDto | null> {
    try {
      const category = await this.categoryRepository.findOne({
        _id: id,
        userId: userId,
      });
      if (!category) return null;
      return category.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async getAllChildrenByParentId(
    parentId: string,
    userId: string
  ): Promise<CategoryDto[]> {
    try {
      const categories = await this.categoryRepository.findAllBy({
        parentCategoryId: parentId,
        userId: userId,
      });
      return categories.map((category) => category.toDto());
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
