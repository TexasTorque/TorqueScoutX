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
import AnalysisIndex from "./pages/analysispages/AnalysisIndex";
import TeamAnalysis from "./pages/analysispages/TeamAnalysis";
import Averages from "./pages/analysispages/Averages";
import CustomAnalysis from "./pages/analysispages/CustomAnalysis";
import ManageUsers from "./pages/adminpages/ManageUsers";
import Settings from "./pages/Settings";
import AISummarization from "./pages/adminpages/AISummarization";

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
      <Route path="/analysis/analysis-index" element={<AnalysisIndex />} />
      <Route path="/analysis/team/:team" element={<TeamAnalysis />} />
      <Route path="/analysis/averages" element={<Averages />} />
      <Route path="/analysis/custom" element={<CustomAnalysis />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/admin/manageusers" element={<ManageUsers />} />
      <Route path="/admin/aisummarize" element={<AISummarization />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);