import { BaseDto } from "./base.dto";

export interface ExpenseDto extends BaseDto {
  name: string;
  description?: string;
  amount: number;
}
