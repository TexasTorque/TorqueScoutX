import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import Home from './pages/Home';

ReactDOM.render(
  <React.StrictMode>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));