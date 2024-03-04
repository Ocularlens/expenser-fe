import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./ErrorBoundary.tsx";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <div className="bg-[#CADCFC] min-h-screen">
        <App />
      </div>
    </ErrorBoundary>
  </React.StrictMode>
);
