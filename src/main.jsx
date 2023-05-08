import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
    createTheme,
    CssBaseline,
    ThemeProvider,
    useMediaQuery,
} from "@mui/material";

let theme = createTheme({
    palette: {
        mode: "dark",
    },
    shape: {
        borderRadius: 16,
    },
});
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
