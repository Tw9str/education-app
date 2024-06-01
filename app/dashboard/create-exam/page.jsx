import { fetchCategories } from "@/utils/fetchCategories";
import CreateExam from "@/components/dashboard/examForms/CreateExam";
import AddCategory from "@/components/dashboard/examForms/AddCategory";

export default async function CreateExamPage() {
  const categories = await fetchCategories();

  return (
    <section className="flex flex-col lg:flex-row justify-between items-start gap-4 w-full p-4">
      <CreateExam categories={categories} />
      <AddCategory />
    </section>
  );
}
