import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../ui/pages/Home";
import About from "../ui/pages/About";
import ScrollToTop from "../ui/page-components/ScrollToTop ";

function Index() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default Index;
