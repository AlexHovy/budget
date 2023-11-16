import { UserBaseDto } from "./bases/user-base.dto";

export interface TransactionDto extends UserBaseDto {
  name: string;
  description?: string;
  amount: number;
}
