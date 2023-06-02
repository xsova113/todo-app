"use client";

import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Inter } from "next/font/google";
import Head from "./components/Head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark transition" lang="en">
      <ThemeProvider attribute="class" enableSystem={true}>
        <Head />
        <body className={`${inter.className}`}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
