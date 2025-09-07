import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserContext from "./context/UserContext";
import "./index.css";
import CaptainContext from "./context/CaptainContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CaptainContext>
      <UserContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
    </CaptainContext>
  </React.StrictMode>
);
