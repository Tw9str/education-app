import Link from "next/link";
import React from "react";

export default function Menu() {
  return (
    <nav>
      <ul className="hidden md:flex justify-center items-center gap-8 font-medium">
        <li className="border-b-2 border-b-transparent hover:border-b-2 hover:border-green-500 hover:text-green-500 duration-300">
          <Link href="/">Home</Link>
        </li>
        <li className="border-b-2 border-b-transparent hover:border-b-2 hover:border-green-500 hover:text-green-500 duration-300">
          <Link href="">Courses</Link>
        </li>
        <li className="border-b-2 border-b-transparent hover:border-b-2 hover:border-green-500 hover:text-green-500 duration-300">
          <Link href="">Blog</Link>
        </li>
        <li className="border-b-2 border-b-transparent hover:border-b-2 hover:border-green-500 hover:text-green-500 duration-300">
          <Link href="">About</Link>
        </li>
        <li className="border-b-2 border-b-transparent hover:border-b-2 hover:border-green-500 hover:text-green-500 duration-300">
          <Link href="">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
