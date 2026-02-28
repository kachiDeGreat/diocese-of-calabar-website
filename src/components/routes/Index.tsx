import React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "../ui/pages/Home";
import About from "../ui/pages/About";
import LineLoader from "../ui/page-components/LineLoader";
import Bishops from "../ui/pages/Bishops";
import Archdeaconry from "../ui/pages/Archdeaconry";
import ArchdeaconryDetails from "../ui/pages/ArchdeaconryDetails"; 
import ScrollToTop from "../ui/page-components/ScrollToTop ";

function Index() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <LineLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us/" element={<About />} />
        <Route path="/bishop-of-calabar/" element={<Bishops />} />
        <Route path="/archdeaconries/" element={<Archdeaconry />} />
        <Route path="/archdeaconries/:slug" element={<ArchdeaconryDetails />} />
      </Routes>
    </HelmetProvider>
  );
}

export default Index;