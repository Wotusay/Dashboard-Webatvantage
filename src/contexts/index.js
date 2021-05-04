import { createContext } from "react";
import RootStore from "../stores/index";

const store = new RootStore();
store.clientStore.loadAllItems(); // Calls all the items before its loaded

export const storeContext = createContext(store);
