import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";

import store from "./store/index.ts";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.tsx";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
