"use client";
import { setLogout } from "@/state/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  EosIconsContentNew,
  HealthiconsIExamMultipleChoiceOutline,
  CharmGem,
  MaterialSymbolsSettingsOutline,
  MaterialSymbolsLogout,
  MingcuteEditLine,
} from "@/components/widgets/Icons";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const CUSTOMER_PORTAL_LINK =
    process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_LINK;

  const linkClasses = (path) =>
    `flex items-center gap-2 uppercase font-bold rounded p-2 text-gray-600 hover:bg-green-400 hover:text-gray-900 ${
      pathname.includes(path) ? "bg-green-400 text-gray-900" : ""
    }`;

  return (
    <aside className="w-64 bg-white shadow-md">
      <Link href="/dashboard" className="block p-4 font-bold text-lg border-b">
        Grile Dashboard
      </Link>
      <nav className="p-4">
        <ul className="space-y-1">
          {user.role !== "student" && (
            <>
              <li className={linkClasses("/dashboard/create-exam")}>
                <EosIconsContentNew />
                <Link className="w-full" href="/dashboard/create-exam">
                  Create
                </Link>
              </li>
              <li className={linkClasses("/dashboard/manage")}>
                <MingcuteEditLine />
                <Link className="w-full" href="/dashboard/manage">
                  Manage
                </Link>
              </li>
            </>
          )}
          <li className={linkClasses("/dashboard/exams")}>
            <HealthiconsIExamMultipleChoiceOutline />
            <Link className="w-full" href="/dashboard/exams">
              Exams
            </Link>
          </li>
          <li className={linkClasses("/dashboard/subscription")}>
            <CharmGem />
            <Link className="w-full" href="/dashboard/subscription">
              Subscription
            </Link>
          </li>
          <li className="flex items-center gap-2 uppercase font-bold rounded p-2 text-gray-600 hover:bg-green-400 hover:text-gray-900">
            <MaterialSymbolsSettingsOutline />
            <Link
              className="w-full"
              href={`${CUSTOMER_PORTAL_LINK}?prefilled_email=${user.email}`}
              target="_blank"
            >
              Settings
            </Link>
          </li>
          <li className="uppercase font-bold rounded p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900">
            <button
              onClick={() => dispatch(setLogout())}
              type="button"
              className="flex items-center w-full"
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
