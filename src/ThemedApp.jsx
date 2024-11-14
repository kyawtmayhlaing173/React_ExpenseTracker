import { createContext } from "react";
import { useState } from "react";

import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddNote from "./pages/AddNote";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/addNote",
    element: <AddNote />,
  },
]);

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
      <RouterProvider router={router}></RouterProvider>
    </AppContext.Provider>
  );
}
