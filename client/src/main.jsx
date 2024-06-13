import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./routes/login";
import Signup from "./routes/signup";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Menus from "./routes/menus";
import AddMenu from "./routes/add-menu";
import Orders from "./routes/orders";

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<Menus />} />
          <Route path="/add-menu" element={<AddMenu />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
