import { createContext, useContext } from "react";
import { useState } from "react";

import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddNote from "./pages/AddNote";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { QueryClientProvider, QueryClient } from "react-query";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  return useContext(AppContext);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addNote",
    element: <AddNote />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

export default function ThemedApp() {
  const [data, setData] = useState([
    { id: 1, description: "Learn Express", status: "INPROGRESS" },
    { id: 2, description: "Learn React", status: "TODO" },
    { id: 3, description: "AWS Solution Architect", status: "TODO" },
  ]);

  const addItem = (newItem) => {
    console.log(`Adding Item ${newItem}`);
    setData([
      ...data,
      { id: data.length + 1, description: newItem, status: "TODO" },
    ]);
  };

  return (
    <AppContext.Provider value={{ data, addItem }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
