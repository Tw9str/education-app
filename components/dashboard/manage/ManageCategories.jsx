"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DeleteIcon, EditIcon } from "../Icons";
import OverlayAlert from "@/components/widgets/OverlayAlert";

const ManageCategories = ({ categories, onDelete }) => {
  const token = useSelector((state) => state.auth.token);
  const [showOverlay, setShowOverlay] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const confirmDelete = (id) => {
    setShowOverlay(true);
    setCategoryToDelete(id);
  };

  const handleConfirm = async () => {
    if (categoryToDelete) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/categories/delete/${categoryToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(categoryToDelete); // Update parent state
      setShowOverlay(false);
      setCategoryToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowOverlay(false);
    setCategoryToDelete(null);
  };

  const editCategory = (id) => {
    // Add your edit logic here
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Visible</th>
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="p-4">{category.title}</td>
                <td className="p-4">{category.isVisible ? "Yes" : "No"}</td>
                <td className="p-4">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => editCategory(category._id)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => confirmDelete(category._id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No categories available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showOverlay && (
        <OverlayAlert
          title="Confirm Deletion"
          description="Are you sure you want to delete this category?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ManageCategories;
