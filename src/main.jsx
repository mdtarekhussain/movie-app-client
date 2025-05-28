import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";
import Home from "./Home/Home";
import Login from "./Page/login";
import Favorites from "./Page/Favorites";
import AuthProvider from "./Provider/AuthProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieDetail from "./Page/MovieDetail";
import { SearchProvider } from "./Page/SearchProvider";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/movie/:id", element: <MovieDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <SearchProvider>
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  </SearchProvider>
);
