import React, { useState, useEffect } from "react";
import { TransactionDto } from "@shared/dtos/transaction.dto";
import Input from "../../../components/Input/Input";
import TextArea from "../../../components/TextArea/TextArea";
import Button from "../../../components/Button/Button";
import { TransactionType } from "@shared/constants/transaction-type";

interface TransactionFormProps {
  initialValues?: TransactionDto | undefined;
  onSubmit: (transaction: TransactionDto) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const defaultTransaction = {
    type: 0,
    name: "",
    description: "",
    amount: 0,
  } as TransactionDto;
  const [transaction, setTransaction] =
    useState<TransactionDto>(defaultTransaction);

  useEffect(() => {
    setTransaction(initialValues || defaultTransaction);
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transaction) onSubmit(transaction);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="name"
        value={transaction.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <TextArea
        name="description"
        value={transaction.description ?? ""}
        onChange={handleChange}
        placeholder="Description"
      />
      <Input
        name="number"
        value={transaction.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default TransactionForm;
