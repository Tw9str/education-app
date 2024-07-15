"use client";
import { useState, useEffect } from "react";
import { fetchCategories } from "@/utils/fetchCategories";
import CreateExam from "@/components/dashboard/examForms/CreateExam";
import AddCategory from "@/components/dashboard/examForms/AddCategory";

export default function CreateExamPage() {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const fetchedCategories = await fetchCategories();
    setCategories(fetchedCategories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <section className="flex flex-col lg:flex-row justify-between items-start gap-4 w-full p-4">
      <CreateExam categories={categories} />
      <AddCategory onCategoryAdded={loadCategories} />
    </section>
  );
}
