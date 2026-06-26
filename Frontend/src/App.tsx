import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, ThemeProvider } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import Navbar from "./customer/components/Navbar/Navbar";
import customTheme from "./Theme/customTheme";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
      </div>
    </ThemeProvider>
  );
}

export default App;
