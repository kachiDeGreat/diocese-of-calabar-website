"use client";

import { useState, useEffect } from "react";
import "./App.css";
import Index from "./components/routes/Index";
import Navbar from "./components/ui/page-components/Navbar";
import LoadingScreen from "./components/ui/page-components/LoadingScreen";
import Footer from "./components/ui/page-components/Footer";
import BackToTopButton from "./components/ui/page-components/BackToTopButton";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Simulate loading progress for visual feedback
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10 + 2; // Random increment between 2-12
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
      <Navbar />
      <Index />
      <BackToTopButton />
      <Footer />
    </div>
  );
}

export default App;
