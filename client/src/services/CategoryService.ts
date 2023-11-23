import axiosInstance from "../interceptors/TokenInterceptor";
import { CategoryDto } from "@shared/dtos/category.dto";
import { handleError } from "../utils/ErrorHandlerUtil";
import { NotificationService } from "./NotificationService";

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
      NotificationService.showSuccessNotification(
        "Category created successfully!"
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
      NotificationService.showSuccessNotification(
        "Category updated successfully!"
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/category/${id}`);
      NotificationService.showSuccessNotification(
        "Category deleted successfully!"
      );
    } catch (error) {
      handleError(error);
    }
  }
}
