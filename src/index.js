import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ManageUsers from "./pages/adminpages/ManageUsers";
import NotFound from "./pages/NotFound";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/index" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/manageusers" element={<ManageUsers />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);