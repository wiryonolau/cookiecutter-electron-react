import React from "react";
import { createRoot } from "react-dom/client"

const App = function(props) {
    return (
        <div>Hello World success</div>
    );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
