import ExamBox from "@/components/dashboard/ExamBox";
import { fetchCategoryExams } from "@/utils/fetchCategoryExams";

export default async function Category({ params }) {
  const categoryExams = await fetchCategoryExams(params.category);

  return (
    <section className="flex-1 text-center mb-8 p-4">
      <header>
        <h1 className="text-4xl font-bold my-3">
          {params.category.replace("-", " ")}
        </h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
        {categoryExams?.length > 0 ? (
          categoryExams.map((exam) => <ExamBox exam={exam} key={exam._id} />)
        ) : (
          <p>No exams available for this category.</p>
        )}
      </div>
    </section>
  );
}
