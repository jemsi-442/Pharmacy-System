import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// If useAuth has AuthProvider export it
// Uncomment if needed:
// import { AuthProvider } from "./hooks/useAuth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* If you created AuthProvider, wrap App here */}
    {/* <AuthProvider> */}
      <App />
    {/* </AuthProvider> */}
  </React.StrictMode>
);
