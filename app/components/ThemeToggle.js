import React, { useContext } from "react";
import { ThemeContext } from "@/app/lib/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="cursor-pointer text-xl my-auto">
      {theme === "light" ? <FiSun size={15} /> : <FiMoon size={15}/>}
    </button>
  );
};

export default ThemeToggle;
