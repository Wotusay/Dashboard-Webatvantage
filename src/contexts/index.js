import { createContext } from "react";
import RootStore from "../stores/index";

const store = new RootStore();
store.eCommerceStore.loadAllItems();
export const storeContext = createContext(store);