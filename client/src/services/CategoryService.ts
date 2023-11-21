import axiosInstance from "../interceptors/TokenInterceptor";
import { CategoryDto } from "../interfaces/CategoryDto";
import { handleError } from "../utils/ErrorHandlerUtil";

export class CategoryService {
  async get(): Promise<CategoryDto[]> {
    try {
      const response = await axiosInstance.get<CategoryDto[]>("/category");
      return response.data;
    } catch (error) {
      handleError(error);
    }
    return [];
  }

  async getById(id: string): Promise<CategoryDto | undefined> {
    try {
      const response = await axiosInstance.get<CategoryDto>(`/category/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async create(category: CategoryDto): Promise<CategoryDto | undefined> {
    try {
      const response = await axiosInstance.post<CategoryDto>(
        "/category",
        category
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async update(category: CategoryDto): Promise<CategoryDto | undefined> {
    try {
      const response = await axiosInstance.put<CategoryDto>(
        `/category/${category.id}`,
        category
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/category/${id}`);
    } catch (error) {
      handleError(error);
    }
  }
}
