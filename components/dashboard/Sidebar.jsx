import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 font-bold text-lg border-b">Dashboard</div>
      <nav className="p-4">
        <ul>
          <li className="mb-4">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-800"
            >
              Link 1
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/dashboard/create-exam"
              className="text-gray-600 hover:text-gray-800"
            >
              Create exam
            </Link>
          </li>
          <li className="mb-4">
            <Link href="#" className="text-gray-600 hover:text-gray-800">
              Link 3
            </Link>
          </li>
          <li className="mb-4">
            <Link href="#" className="text-gray-600 hover:text-gray-800">
              Link 4
            </Link>
          </li>
          <li className="mb-4">
            <Link href="#" className="text-gray-600 hover:text-gray-800">
              Link 5
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
