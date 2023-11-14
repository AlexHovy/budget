import mongoose, { Schema, Model } from "mongoose";
import { TableNames } from "../constants/table-names";
import { ExpenseDto } from "../dtos/expense.dto";
import UserBaseSchema, { IUserBase } from "./bases/user-base.model";

export interface IExpense extends IUserBase {
  name: string;
  description?: string;
  amount: number;
  toDto: () => ExpenseDto;
}

const ExpenseSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
  },
  {
    collection: TableNames.Expense,
  }
);
ExpenseSchema.add(UserBaseSchema);

ExpenseSchema.methods.toDto = function (): ExpenseDto {
  const userBaseDto = UserBaseSchema.methods.toDto.call(this);
  return {
    id: this._id.toString(),
    name: this.name,
    description: this.description,
    amount: this.amount,
    ...userBaseDto,
  };
};

const Expense: Model<IExpense> = mongoose.model<IExpense>(
  TableNames.Expense,
  ExpenseSchema
);

export default Expense;
