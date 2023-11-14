import { ExpenseDto } from "../dtos/expense.dto";
import { IExpense } from "../models/expense.model";
import { IRepositoryService } from "../services/interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";

export class ExpenseQuery {
  constructor(private expenseRepository: IRepositoryService<IExpense>) {}

  async getAll(userId: string): Promise<ExpenseDto[]> {
    try {
      const categories = await this.expenseRepository.findAllBy({
        userId: userId,
      });
      return categories.map((expense) => expense.toDto());
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async getById(id: string, userId: string): Promise<ExpenseDto | null> {
    try {
      const expense = await this.expenseRepository.findOne({
        _id: id,
        userId: userId,
      });
      if (!expense) return null;
      return expense.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
