import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/index" element={<Home />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/login/:redirect" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);