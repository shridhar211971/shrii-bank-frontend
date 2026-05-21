import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { themes } from "../theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    setMode(initialTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const theme = themes[mode];

    root.classList.remove(mode === "dark" ? "light" : "dark");
    root.classList.add(theme.name);

    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((current) => (current === "dark" ? "light" : "dark"));
  };

  const value = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};