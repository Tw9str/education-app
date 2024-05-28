import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Grillo Info",
  description: "SEO friendly description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
