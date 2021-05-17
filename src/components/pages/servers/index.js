import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../../hooks';
import Card from '../../UI/card';
import RadialChart from '../../UI/D3/ServerChart/radialBarchart';
import RadialTotalBarchart from '../../UI/D3/ServerChart/radialTotalBarchart';
import LoadWatcherCard from '../../UI/LoadWatcherCard ';
import SectorCard from '../../UI/SectorCard';
import styles from './servers.module.css';
import { motion } from 'framer-motion';
import { titleAnimaton, cardAnimaton } from '../../../animation';
import { RADIALCOLORS } from '../../../consts';

const Servers = () => {
  const { serverStore } = useStores();
  let rotate = 0;
  let number = 0;

  return useObserver(() => (
    <>

      <motion.div
        initial={'exit'}
        variants={cardAnimaton}
        exit={'exit'}
        animate={'start'}
        className={styles.wrapper}>
        <div className={styles.sphere}>
          <div className={styles.cirkleStripes}>
            <svg
              className={styles.animation}
              id="demo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 1000"
              width="680"
              height="680">
              <circle
                id="outline"
                r="360"
                fill="none"
                cx="500"
                cy="500"
                stroke="#9898bb"
                stroke-width="7"
                stroke-dasharray="0,25"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div className={styles.cirkleOne}></div>
          <div className={styles.cirkleTwo}></div>
          <div className={styles.cirkleThree}></div>
        </div>
      </motion.div>
      <div className={styles.layout}>
        <div className={styles.cardsWrapper}>
          <motion.h2
            initial={'exit'}
            variants={titleAnimaton}
            exit={'exit'}
            animate={'start'}
            className=" font-sans font-medium text-nightBlue text-6xl ">
            Servers view
          </motion.h2>
          <Card title={'Total Storage'} number={'2TB'} rate={''} tagline={''} />
          <SectorCard />
          <LoadWatcherCard />
        </div>
        <motion.div
          initial={'exit'}
          variants={cardAnimaton}
          exit={'exit'}
          animate={'start'}
          className={styles.chartsWrapper}>
          <div className={styles.chartTotalWrapper}>
            <RadialTotalBarchart />
          </div>
          <div className={styles.container}>
            {serverStore.servers.map((server) => (
              <div className={styles.item}>
                <RadialChart
                  name={serverStore.truncateString(server.name)}
                  diskSpace={server.diskSpace}
                  status={server.status}
                  load={server.load}
                  rotate={rotate}
                  number={number}
                />
                <p className="hidden"> {(rotate = rotate + 30)}</p>
                <p className="hidden"> {(number = number + 1)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <svg width="0" height="0">
        <linearGradient id="storage">
          <stop offset="0%" stopColor={RADIALCOLORS.blue} />
          <stop offset="100%" stopColor="#02A4FF" />
        </linearGradient>
        <linearGradient id="status-green">
          <stop offset="0%" stopColor={RADIALCOLORS.green} />
          <stop offset="100%" stopColor="#8AFF6C" />
        </linearGradient>
        <linearGradient id="status-orange">
          <stop offset="0%" stopColor={RADIALCOLORS.orange} />
          <stop offset="100%" stopColor="#FFA715" />
        </linearGradient>
        <linearGradient id="status-red">
          <stop offset="0%" stopColor={RADIALCOLORS.red} />
          <stop offset="100%" stopColor="#FF7B7B" />
        </linearGradient>
      </svg>
    </>
  ));
};

export default Servers;
