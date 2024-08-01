"use client";
import { useEffect, useState } from "react";
import ExamCategories from "@/components/dashboard/examForms/ExamCategories";
import { fetchCategories } from "@/utils/fetchCategories";
import NoData from "@/components/shared/NoData";

export default function ExamCategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const updateCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    updateCategories();
  }, [categories]);

  return (
    <section className="flex-1 p-4">
      {categories.length > 0 ? (
        <ExamCategories categories={categories} />
      ) : (
        <NoData description={"No Exams available."} />
      )}
    </section>
  );
}
