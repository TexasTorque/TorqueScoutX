import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/index" element={<Home />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  </Router>,

  document.getElementById("root")
);