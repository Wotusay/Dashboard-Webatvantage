import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ROUTES } from '../../../consts ';
import styles from './nav.module.css';

const Nav = () => {
    const [activePath, setActivePath] = useState();
    const history = useHistory();

    const nextView = () => {
        switch (true) {
            case activePath === ROUTES.home:
                history.push(ROUTES.analytics);
                break;
            case activePath === ROUTES.analytics:
                history.push(ROUTES.servers);
                break;
            case activePath === ROUTES.servers:
                history.push(ROUTES.company);
                break;            
            case activePath === ROUTES.company:
                history.push(ROUTES.home);
                break;            
            default: 
            return;
        }
    };

    const prevView = () => {
        switch (true) {
            case activePath === ROUTES.home:
                history.push(ROUTES.company);
                break;
            case activePath === ROUTES.analytics:
                history.push(ROUTES.home);
                break;
            case activePath === ROUTES.servers:
                history.push(ROUTES.analytics);
                break;            
            case activePath === ROUTES.company:
                history.push(ROUTES.servers);
                break;            
            default: 
            return;
        }
    };
    return (
        <>
        <div className={styles.pos}>
            <div className={styles.navWrapper}>
                <button onClick={(e) => prevView(e)}> Prev </button>

                  <div className={styles.bulletPointWrapper}>
                    <NavLink isActive={(match, location) => {
                        if (!match) {
                            return false;
                        }
                        setActivePath(location.pathname);
                    }} to={ROUTES.home}>
                        <div className={activePath === ROUTES.home ? styles.bulletPointActive :  styles.bulletPoint}></div>
                    </NavLink>

                    <NavLink isActive={(match, location) => {
                        if (!match) {
                            return false;
                        }
                        setActivePath(location.pathname);                    
                        }} to={ROUTES.analytics}>
                        <div className={activePath === ROUTES.analytics ? styles.bulletPointActive :  styles.bulletPoint}></div>
                    </NavLink>

                    <NavLink isActive={(match, location) => {
                        if (!match) {
                            return false;
                        }
                        setActivePath(location.pathname);                    
                        }} to={ROUTES.servers}>
                        <div className={activePath === ROUTES.servers ? styles.bulletPointActive :  styles.bulletPoint}></div>
                    </NavLink>                    
                    
                    <NavLink isActive={(match, location) => {
                        if (!match) {
                            return false;
                        }
                        setActivePath(location.pathname);
                    }} to={ROUTES.company}>
                        <div className={activePath === ROUTES.company ? styles.bulletPointActive :  styles.bulletPoint}></div>
                    </NavLink>
                    </div>  
                <button  onClick={(e) => nextView(e)}> Next </button>
            </div>
        </div>
        </>
    )
}

export default Nav;