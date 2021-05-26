import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../../hooks';
import styles from './loadwatchercard.module.css';
import { RADIALCOLORS } from '../../../consts/index';
import { motion } from 'framer-motion';
import { cardAnimaton } from '../../../animation';
import LineChart from '../D3/linechart';

const LoadWatcherCard = () => {
  const { serverStore } = useStores();
  return useObserver(() => (
    <>
      <motion.div
        initial={'exit'}
        variants={cardAnimaton}
        exit={'exit'}
        animate={'start'}
        className={styles.sectorWrapper}>
        <span className=" font-sans font-semibold text-nightBlue text-4xl">
          Realtime load watcher
        </span>
        <div id='outer' className={styles.sectorCard}>
          <div  className={styles.sectorLayout}>
            {serverStore.servers.map((s) => (
              <>
                <p
      
                  style={{
                    color:
                      s.status === 'green'
                        ? RADIALCOLORS.green
                        : s.status === 'orange'
                        ? RADIALCOLORS.orange
                        : s.status === 'red'
                        ? RADIALCOLORS.red
                        : '',
                  }}
                  className=" font-sans uppercase font-medium ">
                  {s.name}
                </p>
                <p  className="font-sans text-gray-400 ">
                  {s.load.current}
                </p>
                <div className={styles.total}>
                  <LineChart item={s} />
                </div>
              </>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  ));
};

export default LoadWatcherCard;
