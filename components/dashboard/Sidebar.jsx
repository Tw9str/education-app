"use client";
import { setLogout } from "@/state/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  EosIconsContentNew,
  HealthiconsIExamMultipleChoiceOutline,
  CharmGem,
  MaterialSymbolsSettingsOutline,
  MaterialSymbolsLogout,
} from "@/components/widgets/Icons";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const linkClasses = (path) =>
    `flex items-center gap-2 uppercase font-bold rounded p-2 text-gray-600 hover:bg-green-400 hover:text-gray-900 ${
      pathname === path ? "bg-green-400 text-gray-900" : ""
    }`;

  return (
    <aside className="w-64 bg-white shadow-md">
      <Link href="/dashboard" className="block p-4 font-bold text-lg border-b">
        Grillo Dashboard
      </Link>
      <nav className="p-4">
        <ul className="space-y-1">
          <li className={linkClasses("/dashboard/create-exam")}>
            <EosIconsContentNew />
            <Link href="/dashboard/create-exam">Create</Link>
          </li>
          <li className={linkClasses("/dashboard/exams")}>
            <HealthiconsIExamMultipleChoiceOutline />
            <Link href="/dashboard/exams">Exams</Link>
          </li>
          <li className={linkClasses("#subscription")}>
            <CharmGem />
            <Link href="#subscription">Subscription</Link>
          </li>
          <li className={linkClasses("#settings")}>
            <MaterialSymbolsSettingsOutline />
            <Link href="#settings">Settings</Link>
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
