import { createContext } from "react";

import App from "./App";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export default function ThemedApp() {
    return (
        <AppContext.Provider value={{mode: "dark"}}>
            <App/>
        </AppContext.Provider>
    )
}