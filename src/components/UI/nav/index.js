import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import styles from './nav.module.css';
import { motion } from 'framer-motion';

const Nav = ({ mouseMove }) => {
  const [activePath, setActivePath] = useState();
  const history = useHistory();
  const navAnimation = {
    start: {
      opacity: 1,
      translateX: 0,
      translateY: 0,
      zIndex: 100,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    disapear: {
      opacity: 0,
      translateX: 0,
      translateY: 100,
      zIndex: 100,
      overflow: 'none',
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const nextView = () => {
    switch (true) {
      case activePath === ROUTES.home:
        history.push(ROUTES.analytics);
        break;
      case activePath === ROUTES.analytics:
        history.push(ROUTES.servers);
        break;
      case activePath === ROUTES.servers:
        history.push(ROUTES.home);
        break;
      default:
        return;
    }
  };

  const prevView = () => {
    switch (true) {
      case activePath === ROUTES.home:
        history.push(ROUTES.servers);
        break;
      case activePath === ROUTES.analytics:
        history.push(ROUTES.home);
        break;
      case activePath === ROUTES.servers:
        history.push(ROUTES.analytics);
        break;
      default:
        return;
    }
  };
  return (
    <>
      <div className="absolute bottom-0 z-50">
        <div className="overflow-hidden relative">
          <motion.div
            variants={navAnimation}
            initial={'disapear'}
            animate={mouseMove ? 'start' : 'disapear'}
            className="overflow-hidden">
            <div className="relative w-screen p-10 z-10">
              <div className="flex flex-row justify-evenly">
                <button
                  className="bg-white p-4 pl-2 pr-3 shadow-md items-center rounded-full"
                  onClick={(e) => prevView(e)}>
                  <svg
                    width="40"
                    height="20"
                    viewBox="0 0 10 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.4598 3.25543C10.0572 2.58332 9.99669 1.55416 9.32458 0.95673C8.65248 0.359301 7.62331 0.419839 7.02588 1.09195L0.512944 8.41899C-0.0354258 9.0359 -0.0354265 9.96555 0.512942 10.5825L7.02588 17.9095C7.62331 18.5816 8.65247 18.6422 9.32458 18.0448C9.99669 17.4473 10.0572 16.4182 9.4598 15.7461L3.90841 9.50073L9.4598 3.25543Z"
                      fill="#023AFF"
                    />
                  </svg>
                </button>

                <div className="flex bg-white pl-4 pr-4 shadow-md items-center rounded-full flex-row gap-x-7">
                  <NavLink
                    isActive={(match, location) => {
                      if (!match) {
                        return false;
                      }
                      setActivePath(location.pathname);
                    }}
                    to={ROUTES.home}>
                    <div
                      className={
                        activePath === ROUTES.home
                          ? styles.bulletPointActive
                          : styles.bulletPoint
                      }></div>
                  </NavLink>

                  <NavLink
                    isActive={(match, location) => {
                      if (!match) {
                        return false;
                      }
                      setActivePath(location.pathname);
                    }}
                    to={ROUTES.analytics}>
                    <div
                      className={
                        activePath === ROUTES.analytics
                          ? styles.bulletPointActive
                          : styles.bulletPoint
                      }></div>
                  </NavLink>

                  <NavLink
                    isActive={(match, location) => {
                      if (!match) {
                        return false;
                      }
                      setActivePath(location.pathname);
                    }}
                    to={ROUTES.servers}>
                    <div
                      className={
                        activePath === ROUTES.servers
                          ? styles.bulletPointActive
                          : styles.bulletPoint
                      }></div>
                  </NavLink>
                </div>
                <button
                  className="bg-white p-4 pl-3 pr-2 shadow-md items-center rounded-full"
                  onClick={(e) => nextView(e)}>
                  <svg
                    width="40"
                    height="20"
                    viewBox="0 0 11 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.848796 15.746C0.251366 16.4181 0.311904 17.4473 0.984011 18.0447C1.65612 18.6422 2.68528 18.5816 3.28271 17.9095L9.79565 10.5825C10.344 9.96556 10.344 9.03591 9.79565 8.419L3.28271 1.09192C2.68528 0.419815 1.65612 0.359275 0.984013 0.956703C0.311905 1.55413 0.251365 2.58329 0.848793 3.2554L6.40019 9.50073L0.848796 15.746Z"
                      fill="#023AFF"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Nav;
