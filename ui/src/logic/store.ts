import { createContext, useContext } from "react";
import { createBrowserHistory } from "history";
import { RouterStore } from "@superwf/mobx-react-router";

import ShipStore from "./stores/ship";

const browserHistory = createBrowserHistory();

export interface IStore {
  shipStore: ShipStore;
  router: RouterStore;
}

export const store: IStore = {
  shipStore: new ShipStore(),
  router: new RouterStore(browserHistory),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
