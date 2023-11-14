import { UserBaseDto } from "./bases/user-base.dto";

export interface ExpenseDto extends UserBaseDto {
  name: string;
  description?: string;
  amount: number;
}
