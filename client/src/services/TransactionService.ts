import axiosInstance from "../interceptors/TokenInterceptor";
import { TransactionDto } from "@shared/dtos/transaction.dto";
import { handleError } from "../utils/ErrorHandlerUtil";
import { NotificationService } from "./NotificationService";

export class TransactionService {
  async get(): Promise<TransactionDto[]> {
    try {
      const response = await axiosInstance.get<TransactionDto[]>(
        "/transaction"
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
    return [];
  }

  async getById(id: string): Promise<TransactionDto | undefined> {
    try {
      const response = await axiosInstance.get<TransactionDto>(
        `/transaction/${id}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async create(
    transaction: TransactionDto
  ): Promise<TransactionDto | undefined> {
    try {
      const response = await axiosInstance.post<TransactionDto>(
        "/transaction",
        transaction
      );
      NotificationService.showSuccessNotification(
        "Transaction created successfully!"
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async update(
    transaction: TransactionDto
  ): Promise<TransactionDto | undefined> {
    try {
      const response = await axiosInstance.put<TransactionDto>(
        `/transaction/${transaction.id}`,
        transaction
      );
      NotificationService.showSuccessNotification(
        "Transaction updated successfully!"
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/transaction/${id}`);
      NotificationService.showSuccessNotification(
        "Transaction deleted successfully!"
      );
    } catch (error) {
      handleError(error);
    }
  }
}
