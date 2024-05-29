import React from "react";
import ReactDOM from "react-dom/client";
window.React= React
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/Auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AuthProvider>   
);
