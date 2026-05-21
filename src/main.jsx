import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/globals.css";
import { Toaster } from "react-hot-toast";

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./app/store";
import { initializeAuth } from "./features/auth/authSlice";
import { ThemeProvider } from "./hooks/useTheme";

// Initialize auth from localStorage on app load
store.dispatch(initializeAuth());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
          <Toaster position="top-right" />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);