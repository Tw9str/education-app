"use client";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ExamCategories({ categories }) {
  const [categoryList, setCategoryList] = useState(categories);
  const token = useSelector((state) => state.auth.token);

  async function handleDeleteClick(id) {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/categories/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategoryList((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
      {categoryList?.map((category) => {
        return (
          <li key={category._id} className="bg-white rounded-lg shadow-md">
            <Link
              className="grid place-content-center gap-8 p-4 font-bold"
              href={`/dashboard/exams/${category.title}`}
            >
              {category.title.replace("-", " ")}
            </Link>
            <div className="flex justify-between items-end">
              <span className="p-4">Count: {category.examCount}</span>
              <button
                onClick={() => handleDeleteClick(category._id)}
                className="p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ef4444"
                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                  ></path>
                </svg>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
