import React from "react";
import Link from "next/link";
import {
  MdiFacebook,
  MdiInstagram,
  MdiYoutube,
  RiTwitterXFill,
} from "./SocialIcons";

export default function Socials() {
  return (
    <ul className="flex flex-col gap-4">
      <li>
        <Link href="/">
          <RiTwitterXFill />
        </Link>
      </li>
      <li>
        <Link href="/">
          <MdiInstagram />
        </Link>
      </li>
      <li>
        <Link href="/">
          <MdiFacebook />
        </Link>
      </li>
      <li>
        <Link href="/">
          <MdiYoutube />
        </Link>
      </li>
    </ul>
  );
}
