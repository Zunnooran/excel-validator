import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/DashBoard";
import NoRoute from "./pages/NoRoute";
import AiChatBot from "./components/AiChatBot";

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
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  currentTheme={currentTheme}
                  handleThemeToggle={handleThemeToggle}
                />
              }
            />
          {/* <Route path="/chat-bot" element={<ChatBot />} /> */}
          <Route path="*" element={<NoRoute />} />

          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
