import { ObjectId } from "mongodb";
import { ExpenseDto } from "../dtos/expense.dto";
import { IExpense } from "../models/expense.model";
import { IRepositoryService } from "./interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";

export class ExpenseService {
  constructor(private expenseRepository: IRepositoryService<IExpense>) {}

  async create(expenseDto: ExpenseDto): Promise<ExpenseDto | null> {
    try {
      const expense = await this.expenseRepository.create({
        name: expenseDto.name,
        description: expenseDto.description,
        amount: expenseDto.amount,
        userId: expenseDto.userId
          ? new ObjectId(expenseDto.userId)
          : undefined,
      });
      return expense.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async update(expenseDto: ExpenseDto): Promise<ExpenseDto | null> {
    try {
      const expense = await this.expenseRepository.update(expenseDto.id, {
        name: expenseDto.name,
        description: expenseDto.description,
        amount: expenseDto.amount,
        updatedAt: new Date(),
      });
      if (!expense) return null;
      return expense.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async delete(expenseDto: ExpenseDto): Promise<ExpenseDto | null> {
    try {
      const expense = await this.expenseRepository.delete(expenseDto.id);
      if (!expense) return null;
      return expense.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
