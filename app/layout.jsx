import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./common/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "kreeshee",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen container mx-auto relative`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
