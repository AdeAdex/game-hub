//  /app/components/ThemeToggle

import React from "react";
import { useTheme } from "@/app/lib/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="cursor-pointer text-xl my-auto">
      {theme === "dark" ? <FiMoon size={20} /> : <FiSun size={20} /> }
    </button>
  );
};

export default ThemeToggle;

