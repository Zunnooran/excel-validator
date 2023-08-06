import React, { useState } from "react";
import Dashboard from "./components/dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const API_KEY = "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";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [currentTheme, setCurrentTheme] = useState("light"); // State to track current theme

  const handleThemeToggle = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light"); // Toggle the theme
  };
  return (
    <>
      <ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
        <Dashboard currentTheme={currentTheme} handleThemeToggle={handleThemeToggle} />
      </ThemeProvider>
    </>
  );
}

export default App;
