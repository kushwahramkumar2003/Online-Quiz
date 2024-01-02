import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import store from "./store";
import "./index.css";
import App from "./App";
import baseURL from "./services/baseUrl.js";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App className="transition-all scroll-smooth " />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
