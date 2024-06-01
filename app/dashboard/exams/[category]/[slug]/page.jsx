import ExamViewer from "@/components/ExamViewer";
import { fetchExam } from "@/utils/fetchExam";
import React from "react";

export default async function ExamPage({ params }) {
  const exam = await fetchExam(params.slug);
  return (
    <section className="flex-1 p-4">
      <ExamViewer exam={exam} />
    </section>
  );
}
