import mongoose, { Schema, Document, Model } from "mongoose";
import { TableNames } from "../constants/table-names";
import { ExpenseDto } from "../dtos/expense.dto";

export interface IExpense extends Document {
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

ExpenseSchema.methods.toDto = function (): ExpenseDto {
  return {
    id: this._id.toString(),
    name: this.name,
    description: this.description,
    amount: this.amount,
  };
};

const Expense: Model<IExpense> = mongoose.model<IExpense>(
  TableNames.Expense,
  ExpenseSchema
);

export default Expense;
