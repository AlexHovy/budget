import React, { useEffect, useState } from "react";
import { CategoryDto } from "@shared/dtos/category.dto";
import { CategoryService } from "../../services/CategoryService";
import Table from "../../components/Table/Table";
import Dialog from "../../components/Dialog/Dialog";
import CategoryForm from "./Form/CategoryForm";
import Button from "../../components/Button/Button";

const CategoryPage: React.FC = () => {
  const categoryService = new CategoryService();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    CategoryDto | undefined
  >(undefined);
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  const columns = [
    { title: "Name", render: (category: CategoryDto) => category.name },
    {
      title: "Description",
      render: (category: CategoryDto) => category.description,
    },
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  const handleEdit = (category: CategoryDto | undefined) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingCategory(undefined);
  };

  const loadCategories = async () => {
    const data = await categoryService.get();
    setCategories(data);
  };

  const handleCreate = async (category: CategoryDto) => {
    const newCategory = await categoryService.create(category);
    if (newCategory) setCategories([...categories, newCategory]);
  };

  const handleUpdate = async (category: CategoryDto) => {
    const updatedCategory = await categoryService.update(category);
    if (updatedCategory) {
      setCategories(
        categories.map((c) =>
          c.id === updatedCategory.id ? updatedCategory : c
        )
      );
    }
  };

  const handleDelete = async (category: CategoryDto) => {
    await categoryService.delete(category.id);
    setCategories(categories.filter((c) => c.id !== category.id));
  };

  const handleSubmit = async (category: CategoryDto) => {
    if (editingCategory) handleUpdate(category);
    else handleCreate(category);

    handleDialogClose();
  };

  return (
    <div>
      <h1>Category Management</h1>
      <Button onClick={() => handleEdit(undefined)}>Add New Category</Button>
      <Dialog
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        <CategoryForm initialValues={editingCategory} onSubmit={handleSubmit} />
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

export default CategoryPage;
