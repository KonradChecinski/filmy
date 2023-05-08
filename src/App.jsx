import "./App.css";
import Login from "./site/Login";
import Movies from "./site/Movies";
import { auth } from "./config/firebase";
import { useState, useCallback } from "react";

function App() {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    if (auth.currentUser == null) {
        let checkAuthInterval = setInterval(() => {
            if (auth.currentUser != null) {
                forceUpdate();
                clearInterval(checkAuthInterval);
            }
        }, 100);
    }

    return auth.currentUser ? (
        <Movies forceUpdate={forceUpdate} />
    ) : (
        <Login forceUpdate={forceUpdate} />
    );
}

export default App;
