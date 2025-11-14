import React, { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export default useTheme;
