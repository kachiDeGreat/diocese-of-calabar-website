import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../ui/pages/Home";
import About from "../ui/pages/About";
import ScrollToTop from "../ui/page-components/ScrollToTop ";
import LineLoader from "../ui/page-components/LineLoader";
import Bishops from "../ui/pages/Bishops";
// import DiocesanOfficials from "../ui/pages/DiocesanOfficials";
// import Cathedral from "../ui/pages/Cathedral";
import Archdeaconry from "../ui/pages/Archdeaconry";

function Index() {
  return (
    <>
      <ScrollToTop />
      <LineLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us/" element={<About />} />
        <Route path="/bishop-of-calabar/" element={<Bishops />} />
        {/* <Route path="/cathedral/" element={<Cathedral />} /> */}
        <Route path="/archdeaconries/" element={<Archdeaconry />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default Index;
