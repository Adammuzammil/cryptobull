import React from "react";
import { useTheme } from "../Context/ThemeContext";
import { HiMoon, HiSun } from "react-icons/hi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      {theme === "dark" ? (
        <span onClick={toggleTheme}>
          <HiSun />
        </span>
      ) : (
        <span onClick={toggleTheme}>
          <HiMoon />
        </span>
      )}
    </div>
  );
};

export default ThemeToggle;
