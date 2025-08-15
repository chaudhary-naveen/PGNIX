import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
//import HomePage from './HomePage/HomePage.jsx'

import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import appStore from "./utils/reduxStore";
import { Provider, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
let persistor = persistStore(appStore);

import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // "light" or "dark"
    primary: {
      main: "#415A77",
    },
    secondary: {
      main: "#E0E1DD",
    },
    background: {
      default: "#0D1B2A",
      paper: "#1B263B",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            {/* <CssBaseline /> Ensures background + text match the theme */}
            <App />
          </ThemeProvider>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
