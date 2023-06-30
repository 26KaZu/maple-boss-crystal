import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Notifications />
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
