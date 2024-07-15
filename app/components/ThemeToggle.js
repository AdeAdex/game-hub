//  /app/components/ThemeToggle

import React from "react";
import { useTheme } from "@/app/lib/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="cursor-pointer my-auto" onClick={toggleTheme}>
      <div className="toggle my-auto">
        <input type="checkbox" />
        <span className="button"></span>
        {theme === "dark" ? <span className="label">☾</span> : <span className="label">☼</span>}
      </div>
    </div>
  );
};

export default ThemeToggle;
