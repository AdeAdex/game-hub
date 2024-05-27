import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="cursor-pointer text-xl my-auto">
      {theme === "light" ? <FiSun size={20} /> : <FiMoon size={20}/>}
    </button>
  );
};

export default ThemeToggle;
