import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/reset.less";

// 开发环境启用 Mock
if (import.meta.env.DEV) {
  import("@/mock");
}

import App from "./App.tsx";

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
