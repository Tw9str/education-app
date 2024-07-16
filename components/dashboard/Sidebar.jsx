"use client";
import { setLogout } from "@/state/authSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import {
  EosIconsContentNew,
  HealthiconsIExamMultipleChoiceOutline,
  CharmGem,
  MaterialSymbolsSettingsOutline,
  MaterialSymbolsLogout,
} from "@/components/widgets/Icons";

export default function Sidebar() {
  const dispatch = useDispatch();
  return (
    <aside className="w-64 bg-white shadow-md">
      <Link href="/dashboard" className="block p-4 font-bold text-lg border-b">
        Grillo Dashboard
      </Link>
      <nav className="p-4">
        <ul>
          <li className="flex items-center gap-2 uppercase font-bold rounded p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900">
            <EosIconsContentNew />
            <Link href="/dashboard/create-exam">Create</Link>
          </li>
          <li className="flex items-center gap-2 uppercase font-bold rounded p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900">
            <HealthiconsIExamMultipleChoiceOutline />
            <Link href="/dashboard/exams">Exams</Link>
          </li>
          <li className="flex items-center gap-2 uppercase font-bold rounded p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900">
            <CharmGem />
            <Link href="#">Subscription</Link>
          </li>
          <li className="flex items-center gap-2 uppercase font-bold rounded p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900">
            <MaterialSymbolsSettingsOutline />
            <Link href="#">Settings</Link>
          </li>
          <li className="uppercase font-bold rounded p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900">
            <button
              onClick={() => dispatch(setLogout())}
              type="button"
              className="flex justify-center items-center"
            >
              <MaterialSymbolsLogout />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
