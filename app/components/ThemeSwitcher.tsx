import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {currentTheme === "dark" ? (
        <button className="" onClick={() => setTheme("light")}>
          <Image
            src={`/images/icon-moon.svg`}
            alt="button"
            width={20}
            height={20}
          />
        </button>
      ) : (
        <button className="" onClick={() => setTheme("dark")}>
          <Image
            src={`/images/icon-sun.svg`}
            alt="button"
            width={20}
            height={20}
          />
        </button>
      )}
    </>
  );
};

export default ThemeSwitcher;
