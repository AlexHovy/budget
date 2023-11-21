import React, { useState, useEffect } from "react";
import { CategoryDto } from "../../interfaces/CategoryDto";
import { CategoryService } from "../../services/CategoryService";

const CategoryPage = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const service = new CategoryService();
      const data = await service.get();
      setCategories(data);
    } catch (error) {
      setError("Failed to fetch categories");
      // Handle the error based on your requirements
    }
  };

  // Implement additional methods for getById, create, update, and delete here

  return (
    <div>
      <h1>Category Management</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                {/* Add buttons or links for editing and deleting categories */}
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Here, you can add forms for creating and updating categories */}
    </div>
  );
};

export default CategoryPage;
