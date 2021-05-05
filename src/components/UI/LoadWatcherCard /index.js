import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../../hooks';
import styles from './loadwatchercard.module.css';

const LoadWatcherCard = () => {
  const { serverStore } = useStores();
  return useObserver(() => (
    <>
      <div className={styles.sectorWrapper}>
        <span className={styles.title}>Load watcher</span>
        <div className={styles.sectorCard}>
          <div className={styles.sectorLayout}>
            {serverStore.servers.map((s) => (
              <>
                <p className={styles.name}>{s.name}</p>
                <p className={styles.used}>{s.load.current}</p>
                <p className={styles.total}>
                  <svg
                    width="69"
                    height="21"
                    viewBox="0 0 69 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect
                      opacity="0.7"
                      x="0.685547"
                      width="68"
                      height="21"
                      rx="1"
                      fill="#EAEAEA"
                    />
                    <path
                      d="M0.685547 7C9.31241 7 8.29749 16 18.4467 16C28.596 16 26.0587 9 34.6855 9C43.3124 9 45.2013 5 51.9393 5C58.4791 5 60.0587 14.5 68.6855 14.5"
                      stroke="url(#paint0_linear)"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="68.6855"
                        y1="7.74997"
                        x2="2.38256"
                        y2="8.10029"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E323FF" />
                        <stop offset="1" stop-color="#7517F8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </p>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  ));
};

export default LoadWatcherCard;
