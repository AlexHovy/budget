import { ObjectId } from "mongodb";
import { TransactionDto } from "../dtos/transaction.dto";
import { ITransaction } from "../models/transaction.model";
import { IRepositoryService } from "./interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";

export class TransactionService {
  constructor(private transactionRepository: IRepositoryService<ITransaction>) {}

  async create(transactionDto: TransactionDto): Promise<TransactionDto | null> {
    try {
      const transaction = await this.transactionRepository.create({
        name: transactionDto.name,
        description: transactionDto.description,
        amount: transactionDto.amount,
        userId: transactionDto.userId
          ? new ObjectId(transactionDto.userId)
          : undefined,
      });
      return transaction.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async update(transactionDto: TransactionDto): Promise<TransactionDto | null> {
    try {
      const transaction = await this.transactionRepository.update(transactionDto.id, {
        name: transactionDto.name,
        description: transactionDto.description,
        amount: transactionDto.amount,
        updatedAt: new Date(),
      });
      if (!transaction) return null;
      return transaction.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async delete(transactionDto: TransactionDto): Promise<TransactionDto | null> {
    try {
      const transaction = await this.transactionRepository.delete(transactionDto.id);
      if (!transaction) return null;
      return transaction.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
