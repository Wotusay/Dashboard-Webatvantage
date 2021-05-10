import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import Analytics from './components/pages/analytics';
import ECommerce from './components/pages/eCommerce';
import Servers from './components/pages/servers';
import Nav from './components/UI/nav';
import { ROUTES } from './consts';

const App = () => {
  const [mouseMove, setMouseMove] = useState(false);

  useEffect(() => {
    let timeout = null;
    const updateMousePosition = (e) => {
      setMouseMove(true);
      if (e.type === 'click') {
        clearTimeout(timeout);
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setMouseMove(false);
      }, 10000);

      window.removeEventListener('mousemove', updateMousePosition);
    };
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('click', updateMousePosition);

  });
  return (
    <>
      <Nav mouseMove={mouseMove} />
      <Switch>
        <Route exact strict path={ROUTES.servers}>
          <Servers />
        </Route>

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
