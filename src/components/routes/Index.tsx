import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../ui/pages/Home";
import About from "../ui/pages/About";

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default Index;
