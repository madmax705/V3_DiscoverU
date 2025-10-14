import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { supabase } from './supabase-client';

const basename = import.meta.env.BASE_URL;

// @ts-ignore
window.supabase = supabase;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/DiscoverU">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
