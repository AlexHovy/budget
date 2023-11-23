import React, { useEffect, useState } from "react";
import { TransactionService } from "../../services/TransactionService";
import { TransactionDto } from "../../dtos/transaction.dto";
import Button from "../../components/Button/Button";
import Dialog from "../../components/Dialog/Dialog";
import TransactionForm from "./Form/TransactionForm";
import Table from "../../components/Table/Table";
import { TransactionType } from "../../constants/transaction-type";

const TransactionPage: React.FC = () => {
  const transactionService = new TransactionService();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    TransactionDto | undefined
  >(undefined);
  const [categories, setCategories] = useState<TransactionDto[]>([]);

  const columns = [
    {
      title: "Name",
      render: (transaction: TransactionDto) => transaction.name,
      renderDescription: (transaction: TransactionDto) =>
        transaction.description,
    },
    {
      title: "Amount",
      className: (transaction: TransactionDto) => {
        const className =
          transaction.type === TransactionType.Unknown
            ? "unknown"
            : transaction.type === TransactionType.Income
            ? "income"
            : "expense";
        return className;
      },
      render: (transaction: TransactionDto) => {
        const prefix =
          transaction.type === TransactionType.Unknown
            ? ""
            : transaction.type === TransactionType.Income
            ? "+"
            : "-";
        return `${prefix}${transaction.amount.toFixed(2)}`;
      },
    },
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  const handleEdit = (transaction: TransactionDto | undefined) => {
    setEditingTransaction(transaction);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingTransaction(undefined);
  };

  const loadCategories = async () => {
    const data = await transactionService.get();
    setCategories(data);
  };

  const handleCreate = async (transaction: TransactionDto) => {
    const newTransaction = await transactionService.create(transaction);
    if (newTransaction) setCategories([...categories, newTransaction]);
  };

  const handleUpdate = async (transaction: TransactionDto) => {
    const updatedTransaction = await transactionService.update(transaction);
    if (updatedTransaction) {
      setCategories(
        categories.map((c) =>
          c.id === updatedTransaction.id ? updatedTransaction : c
        )
      );
    }
  };

  const handleDelete = async (transaction: TransactionDto) => {
    await transactionService.delete(transaction.id);
    setCategories(categories.filter((c) => c.id !== transaction.id));
  };

  const handleSubmit = async (transaction: TransactionDto) => {
    if (editingTransaction) handleUpdate(transaction);
    else handleCreate(transaction);

    handleDialogClose();
  };

  return (
    <div>
      <h1>Transaction Management</h1>
      <Button onClick={() => handleEdit(undefined)}>Add New Transaction</Button>
      <Dialog
        title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        <TransactionForm
          initialValues={editingTransaction}
          onSubmit={handleSubmit}
        />
      </Dialog>
      <Table
        data={categories}
        columns={columns}
        onUpdate={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TransactionPage;
