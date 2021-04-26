import { createContext } from "react";
import RootStore from "../stores/index";

const store = new RootStore();
export const storeContext = createContext(store);