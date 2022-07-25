import React from "react";
import { BrowserRouter } from "react-router-dom";
import { store, StoreContext } from "./logic/store";
import { App } from "./app";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>
);
