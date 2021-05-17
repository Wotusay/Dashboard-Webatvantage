import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import Analytics from './components/pages/analytics';
import ECommerce from './components/pages/eCommerce';
import Servers from './components/pages/servers';
import Nav from './components/UI/nav';
import { AnimatePresence } from 'framer-motion';
import { ROUTES } from './consts';

const App = () => {
  const [mouseMove, setMouseMove] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let timeout = null;
    let timeoutCycle = null;
    const updateMousePosition = (e) => {
      setMouseMove(true);
      if (e.type === 'click') {
        clearTimeout(timeout);
        clearInterval(timeoutCycle);
      }
      clearInterval(timeoutCycle);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setMouseMove(false);
      }, 10000);

      window.removeEventListener('mousemove', updateMousePosition);
    };

    const cycleViews = () => {

      const location = history.location.pathname;

      switch (location) {
        case ROUTES.home:
          history.push(ROUTES.analytics)
          break;
        case ROUTES.analytics:
          history.push(ROUTES.servers)
          break;
        case ROUTES.servers:
          history.push(ROUTES.home)
          break;

        default:
          return;  
      }
    };

    clearInterval(timeoutCycle);
    timeoutCycle = setInterval(() => {
      cycleViews();
    }, 50000);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('click', updateMousePosition);
  });
  return (
    <>
      <Nav mouseMove={mouseMove} />

      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
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
          </AnimatePresence>
        )}></Route>
    </>
  );
};

export default App;
