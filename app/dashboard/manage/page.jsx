"use client";
import React, { useState, useEffect } from "react";
import ManageCategories from "@/components/dashboard/manage/ManageCategories";
import ManageExams from "@/components/dashboard/manage/ManageExams";
import ManageUsers from "@/components/dashboard/manage/ManageUsers";
import LoadingSpinner from "@/components/widgets/LoadingSpinner";

export default function Manage() {
  const [categories, setCategories] = useState([]);
  const [exams, setExams] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, examsResponse, usersResponse] =
          await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/categories`).then(
              (res) => res.json()
            ),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/exams`).then((res) =>
              res.json()
            ),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/users`).then((res) =>
              res.json()
            ),
          ]);

        setCategories(categoriesResponse);
        setExams(examsResponse);
        setUsers(usersResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryDelete = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category._id !== id)
    );
  };

  const handleCategoryUpdate = (id, updatedFields) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === id ? { ...category, ...updatedFields } : category
      )
    );
  };

  const handleExamDelete = (id) => {
    setExams((prevExams) => prevExams.filter((exam) => exam._id !== id));
  };

  const handleExamUpdate = (id, updatedFields) => {
    setExams((prevExams) =>
      prevExams.map((exam) =>
        exam._id === id ? { ...exam, ...updatedFields } : exam
      )
    );
  };

  const handleUserDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  };

  const handleUserPromote = (id, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const handleUserUpdate = (id, updatedFields) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, ...updatedFields } : user
      )
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid gap-4">
        <ManageCategories
          categories={categories}
          onDelete={handleCategoryDelete}
          onUpdate={handleCategoryUpdate}
        />
        <ManageExams
          exams={exams}
          onDelete={handleExamDelete}
          onUpdate={handleExamUpdate}
        />
        <ManageUsers
          users={users}
          onDelete={handleUserDelete}
          onPromote={handleUserPromote}
          onUpdate={handleUserUpdate}
        />
      </div>
    </div>
  );
}
