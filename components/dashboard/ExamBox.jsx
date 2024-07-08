import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ExamBox({
  exam: { title, category, user, createdAt, slug },
}) {
  const date = new Date(createdAt);
  return (
    <Link
      className="block bg-white p-8 rounded-xl border-2 border-neutral-100 shadow-lg capitalize"
      href={`/dashboard/exams/${category.title}/${slug}`}
    >
      <header>
        <h2 className="text-2xl font-bold uppercase">{title}</h2>
      </header>
      <article className="exam-box">
        <div className="exam-details">
          <p>
            <strong>{category.title.replace("-", " ")}</strong>
          </p>
          <figcaption className=" flex items-center mt-6">
            <div className="relative w-12 h-12">
              <Image className="rounded-full" src="/pc.jpg" alt="" fill />
            </div>
            <div className="ml-4">
              <p className="font-semibold">
                <strong>Created by:</strong> {user.username}
              </p>
              <p className="text-neutral-500">
                <strong>Created at:</strong> {date.toLocaleDateString()}
              </p>
            </div>
          </figcaption>
        </div>
      </article>
    </Link>
  );
}
