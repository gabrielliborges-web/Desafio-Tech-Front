import { useEffect, useState } from "react";

export function useTheme(theme: string) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (theme) return theme === "DARK";

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";

    return true;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    if (theme) setIsDark(theme === "DARK");
  }, [theme]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
}
