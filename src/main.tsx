import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastProvider } from "./contexts/ToastContext";
import { ToastContainer } from "./components/ToastContainer";
import { ConsentProvider } from "./components/ConsentManager";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConsentProvider>
      <ToastProvider>
        <App />
        <ToastContainer />
      </ToastProvider>
    </ConsentProvider>
  </StrictMode>,
);
