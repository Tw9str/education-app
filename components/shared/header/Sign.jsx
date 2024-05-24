import Link from "next/link";
import React from "react";

export default function Sign() {
  return (
    <Link
      href="/sign"
      className="rounded-full text-white bg-green-500 py-4 px-6 shadow-md hover:bg-green-400 duration-300"
    >
      Login/Register
    </Link>
  );
}
