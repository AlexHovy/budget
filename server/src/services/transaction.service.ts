import { ITransaction } from "../models/transaction.model";
import { IRepositoryService } from "./interfaces/repository.interface";
import { InternalServerError } from "../utils/error.util";
import { TransactionDto } from "../dtos/transaction.dto";

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
        userId: userId,
        categoryId: transactionDto.categoryId,
        type: transactionDto.type,
        name: transactionDto.name,
        description: transactionDto.description,
        amount: transactionDto.amount,
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
          categoryId: transactionDto.categoryId,
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
