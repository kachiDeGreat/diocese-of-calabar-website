import React from "react";
import "./App.css";
import Index from "./components/routes/Index";
import Navbar from "./components/ui/page-components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Index />
    </div>
  );
}

export default App;
