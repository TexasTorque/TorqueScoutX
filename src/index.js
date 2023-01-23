import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Scout from "./pages/Scout";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ConfigureSchema from "./pages/adminpages/ConfigureSchema";
import AnalysisSchema from "./pages/adminpages/ConfigureAnalysis";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/index" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/scout" element={<Scout />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/schema" element={<ConfigureSchema />} />
      <Route path="/admin/configure-analysis" element={<AnalysisSchema />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);