"use client";
import { setLogout } from "@/state/authSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 font-bold text-lg border-b">Grillo Dashboard</div>
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <Link
              href="/dashboard/create-exam"
              className="text-gray-600 hover:text-gray-800"
            >
              Create exam
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/exams"
              className="text-gray-600 hover:text-gray-800"
            >
              Exams
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-600 hover:text-gray-800">
              Link 3
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-600 hover:text-gray-800">
              Link 4
            </Link>
          </li>
          <li>
            <button
              onClick={() => dispatch(setLogout())}
              type="button"
              className="flex justify-center items-center text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="black"
                  d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
                ></path>
              </svg>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
