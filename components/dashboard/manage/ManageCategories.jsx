"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/categories`
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/categories/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(categories.filter((category) => category._id !== id));
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Visible</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-b">
              <td className="p-4">{category.title}</td>
              <td className="p-4">{category.isVisible ? "Yes" : "No"}</td>
              <td className="p-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => deleteCategory(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
