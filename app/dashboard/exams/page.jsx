import ExamCategories from "@/components/dashboard/examForms/ExamCategories";
import { fetchCategories } from "@/utils/fetchCategories";

export default async function ExamCategoriesPage() {
  const categories = await fetchCategories();

  return (
    <section className="flex-1 p-4">
      <ExamCategories categories={categories} />
    </section>
  );
}
