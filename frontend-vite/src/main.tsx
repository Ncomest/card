import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
// import { GlobalStyles } from "./style/global.style.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <GlobalStyles /> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>
);
