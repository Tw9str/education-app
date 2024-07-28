import { Rubik } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Grile Info",
  description: "SEO friendly description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
