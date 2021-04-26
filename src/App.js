import React from "react";
import { Route, Switch } from "react-router";
import ECommerce from "./components/pages/eCommerce";
import { ROUTES } from "./consts ";
import { useStores } from "./hooks";


const App = () => {
  const {eCommerceStore} = useStores();
  eCommerceStore.loadAllItems();
  return (
    <>
    <Switch>
      <Route path={ROUTES.home}>
        <ECommerce/>
      </Route>
    </Switch>
    </>
  );
}

export default App;
