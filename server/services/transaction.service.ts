import { ObjectId } from "mongodb";
import { TransactionDto } from "../dtos/transaction.dto";
import { ITransaction } from "../models/transaction.model";
import { IRepositoryService } from "./interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";

export class TransactionService {
  constructor(
    private transactionRepository: IRepositoryService<ITransaction>
  ) {}

  async create(
    transactionDto: TransactionDto,
    userId: string
  ): Promise<TransactionDto | null> {
    try {
      const transaction = await this.transactionRepository.create({
        categoryId: transactionDto.categoryId
          ? new ObjectId(transactionDto.categoryId)
          : undefined,
        type: transactionDto.type,
        name: transactionDto.name,
        description: transactionDto.description,
        amount: transactionDto.amount,
        userId: new ObjectId(userId),
      });
      return transaction.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async update(transactionDto: TransactionDto): Promise<TransactionDto | null> {
    try {
      const transaction = await this.transactionRepository.update(
        transactionDto.id,
        {
          categoryId: transactionDto.categoryId
            ? new ObjectId(transactionDto.categoryId)
            : undefined,
          type: transactionDto.type,
          name: transactionDto.name,
          description: transactionDto.description,
          amount: transactionDto.amount,
        }
      );
      if (!transaction) return null;
      return transaction.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async delete(transactionDto: TransactionDto): Promise<TransactionDto | null> {
    try {
      const transaction = await this.transactionRepository.delete(
        transactionDto.id
      );
      if (!transaction) return null;
      return transaction.toDto();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}
