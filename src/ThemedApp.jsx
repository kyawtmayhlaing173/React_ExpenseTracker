import { createContext, useContext, useEffect, useMemo } from "react";
import { useState } from "react";

import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { QueryClientProvider, QueryClient } from "react-query";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { verifyToken } from "./libs/fetcher";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  return useContext(AppContext);
}

function RootRoute() {
  const { auth } = useContext(AppContext);
  return auth ? <Home /> : <Login />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
  },
  {
    path: "/addExpense",
    element: <AddExpense />,
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
  const [auth, setAuth] = useState(null);
  const [data, setData] = useState([]);

  const addItem = (item) => {
    console.log(
      `Adding Item ${item.description} ${item.amount} ${item.category} ${item.notes}`
    );
    setData([...data, item]);
  };

  useEffect(() => {
    verifyToken().then((user) => {
      setAuth(user);
    });
  }, []);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: "dark",
        background: {
          main: "#A02334",
        },
        primary: {
          main: "#96CEB4",
        },
        secondary: {
          main: "#FFAD60",
        },
        text: {
          fade: grey[500],
        },
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#A02334" },
        }}
      />
      <AppContext.Provider value={{ data, addItem, auth, setAuth }}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
}
