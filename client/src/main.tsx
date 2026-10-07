import { recoverDeployment } from "./lib/deploymentRecovery";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

window.addEventListener("vite:preloadError", (event) => {
  try {
    if (recoverDeployment(window.sessionStorage, () => window.location.reload())) event.preventDefault();
  } catch { /* Storage may be unavailable; retain the normal recovery UI. */ }
});

createRoot(document.getElementById("root")!).render(<App />);
