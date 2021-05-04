import { storeContext } from "../contexts";
import { useContext } from "react";

export const useStores = () => useContext(storeContext);
