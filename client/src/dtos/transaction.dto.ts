import { TransactionType } from "../constants/transaction-type";
import { UserBaseDto } from "./bases/user-base.dto";

export interface TransactionDto extends UserBaseDto {
  categoryId?: string;
  type: TransactionType;
  name: string;
  description?: string;
  amount: number;
}
