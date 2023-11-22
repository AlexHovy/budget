import { TransactionDto } from "@shared/dtos/transaction.dto";
import { ITransaction } from "../models/transaction.model";
import { IRepositoryService } from "../services/interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";

export class TransactionQuery {
  constructor(private transactionRepository: IRepositoryService<ITransaction>) {}

  async getAll(userId: string): Promise<TransactionDto[]> {
    try {
      const transactions = await this.transactionRepository.findAllBy({
        userId: userId,
      });
      return transactions.map((transaction) => transaction.toDto());
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async getById(id: string, userId: string): Promise<TransactionDto | null> {
    try {
      const transaction = await this.transactionRepository.findOne({
        _id: id,
        userId: userId,
      });
      if (!transaction) return null;
      return transaction.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
