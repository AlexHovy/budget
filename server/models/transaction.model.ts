import mongoose, { Schema, Model } from "mongoose";
import { TableNames } from "../constants/table-names";
import { TransactionDto } from "@shared/dtos/transaction.dto";
import UserBaseSchema, { IUserBase } from "./bases/user-base.model";
import { TransactionType } from "@shared/constants/transaction-type";

export interface ITransaction extends IUserBase {
  categoryId?: string;
  type: TransactionType;
  name: string;
  description?: string;
  amount: number;
  toDto: () => TransactionDto;
}

const TransactionSchema: Schema = new Schema(
  {
    categoryId: { type: String },
    type: { type: Number, required: true, default: TransactionType.Unknown },
    name: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
  },
  {
    collection: TableNames.Transaction,
  }
);
TransactionSchema.add(UserBaseSchema);

TransactionSchema.methods.toDto = function (): TransactionDto {
  const userBaseDto = UserBaseSchema.methods.toDto.call(this);
  return {
    id: this._id.toString(),
    categoryId: this.categoryId?.toString(),
    type: this.type,
    name: this.name,
    description: this.description,
    amount: this.amount,
    ...userBaseDto,
  };
};

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>(
  TableNames.Transaction,
  TransactionSchema
);

export default Transaction;
