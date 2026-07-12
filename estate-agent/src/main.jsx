import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./App.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/Responsive_web_application">
      <DndProvider backend={HTML5Backend}>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>,
);