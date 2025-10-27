import { useEffect, useState } from "react";
import { updateUserTheme } from "../lib/users";

export function useTheme(initialTheme?: string) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (initialTheme) return initialTheme === "DARK";

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
    if (initialTheme) setIsDark(initialTheme === "DARK");
  }, [initialTheme]);

  const toggleTheme = async () => {
    const newTheme = isDark ? "LIGHT" : "DARK";
    setIsDark((prev) => !prev);

    try {
      await updateUserTheme(newTheme);
      console.log(`Tema alterado para ${newTheme}`);
    } catch (error: any) {
      console.error(`Erro ao atualizar tema: ${error.message}`);
    }
  };

  return { isDark, toggleTheme };
}
