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
  }, []);

  const visibleCategories = categories.filter((category) => category.isVisible);

  return (
    <section className="flex-1 p-4">
      {visibleCategories.length > 0 ? (
        <ExamCategories categories={visibleCategories} />
      ) : (
        <NoData description="No Exams available." />
      )}
    </section>
  );
}
