// Importing necessary modules and components
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Importing the global stylesheet
import App from "./App"; // Importing the main App component
import { BrowserRouter } from "react-router-dom"; // Importing BrowserRouter for client-side routing

// Creating a root ReactDOM instance attached to the HTML element with the id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the App component within a BrowserRouter for client-side routing
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
