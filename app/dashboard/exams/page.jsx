"use client";
import { useEffect, useState } from "react";
import ExamCategories from "@/components/dashboard/examForms/ExamCategories";
import { fetchCategories } from "@/utils/fetchCategories";

export default function ExamCategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const updateCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    updateCategories();
  }, []);

  return (
    <section className="flex-1 p-4">
      <ExamCategories categories={categories} />
    </section>
  );
}
