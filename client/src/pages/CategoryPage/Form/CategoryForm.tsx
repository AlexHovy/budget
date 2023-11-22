import React, { useState, useEffect } from "react";
import { CategoryDto } from "../../../interfaces/CategoryDto";
import Input from "../../../components/Input/Input";
import TextArea from "../../../components/TextArea/TextArea";
import Button from "../../../components/Button/Button";

interface CategoryFormProps {
  initialValues?: CategoryDto | undefined;
  onSubmit: (category: CategoryDto) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const defaultCategory = {
    name: "",
    description: "",
  } as CategoryDto;
  const [category, setCategory] = useState<CategoryDto>(defaultCategory);

  useEffect(() => {
    setCategory(initialValues || defaultCategory);
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) onSubmit(category);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="name"
        value={category.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <TextArea
        name="description"
        value={category.description ?? ""}
        onChange={handleChange}
        placeholder="Description"
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default CategoryForm;
