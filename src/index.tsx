import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root") as HTMLElement;

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If react-snap has already built the HTML, hydrate it!
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  // Otherwise, render normally (like when you are testing on localhost)
  const root = createRoot(rootElement);
  root.render(app);
}
reportWebVitals();
