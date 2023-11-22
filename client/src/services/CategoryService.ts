import { notificationEmitter } from "../config/EventsConfig";
import { EventTypes } from "../constants/EventTypes";
import axiosInstance from "../interceptors/TokenInterceptor";
import { CategoryDto } from "@shared/dtos/category.dto";
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
      notificationEmitter.emit(
        EventTypes.NOTIFICATION_SUCCESS,
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
      notificationEmitter.emit(
        EventTypes.NOTIFICATION_SUCCESS,
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
      notificationEmitter.emit(
        EventTypes.NOTIFICATION_SUCCESS,
        "Category deleted successfully!"
      );
    } catch (error) {
      handleError(error);
    }
  }
}
