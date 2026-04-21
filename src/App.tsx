"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // <-- 1. Import useLocation
import "./App.css";
import Index from "./components/routes/Index";
import Navbar from "./components/ui/page-components/Navbar";
import LoadingScreen from "./components/ui/page-components/LoadingScreen";
import Footer from "./components/ui/page-components/Footer";
import BackToTopButton from "./components/ui/page-components/BackToTopButton";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const location = useLocation();

  // 3. Create a boolean checking if we are on any admin page
  const isAdminRoute = location.pathname.startsWith("/synod-2026-admin");

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10 + 2;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen
        progress={loadingProgress}
        onLoadingComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <div className="App">
      {!isAdminRoute && <Navbar />}

      <Index />

      {!isAdminRoute && <BackToTopButton />}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
