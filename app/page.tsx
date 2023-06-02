"use client";

import Image from "next/image";
import List from "./components/List";
import { useTheme } from "next-themes";

export default function Home() {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      {currentTheme === "dark" ? (
        <Image
          src={`/images/bg-desktop-dark.jpg`}
          alt="bg-desktop-dark"
          width={1000}
          height={500}
          className="w-full h-auto absolute"
        />
      ) : (
        <Image
          src={`/images/bg-desktop-light.jpg`}
          alt="bg-desktop-dark"
          width={1000}
          height={500}
          className="w-full h-auto absolute"
        />
      )}

      <div
        className={`dark:bg-[#161722] transition bg-white flex justify-center min-h-[600px]`}
      >
        <List />
      </div>
    </div>
  );
}
