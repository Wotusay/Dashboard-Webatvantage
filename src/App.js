import React from "react";
import { Route, Switch } from "react-router";
import Analytics from "./components/pages/analytics";
import ECommerce from "./components/pages/eCommerce";
import Nav from "./components/UI/nav";
import { ROUTES } from "./consts ";

const App = () => {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact strict path={ROUTES.analytics}>
          <Analytics />
        </Route>

        <Route path={ROUTES.home}>
          <ECommerce />
        </Route>
      </Switch>
    </>
  );
};

export default App;
