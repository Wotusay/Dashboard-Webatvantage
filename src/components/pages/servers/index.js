import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../../hooks';
import Card from '../../UI/card';
import RadialChart from '../../UI/D3/ServerChart/radialBarchart';
import RadialTotalBarchart from '../../UI/D3/ServerChart/radialTotalBarchart';
import LoadWatcherCard from '../../UI/LoadWatcherCard ';
import SectorCard from '../../UI/SectorCard';
import styles from './servers.module.css';

const Servers = () => {
  const { serverStore } = useStores();
  let rotate = 0;

  return useObserver(() => (
    <>
      <div className={styles.wrapper}>
        <div className={styles.sphere}>
          <div className={styles.cirkleStripes}>
            <svg className={styles.animation}
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
      </div>
      <div className={styles.layout}>
        <div className={styles.cardsWrapper}>
          <h2 className=" font-sans font-medium text-nightBlue text-6xl ">
            Servers view
          </h2>
          <Card title={'Total Storage'} number={'2TB'} rate={''} tagline={''} />
          <SectorCard />
          <LoadWatcherCard />
        </div>
        <div className={styles.chartsWrapper}>
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
                />

                <p className="hidden"> {(rotate = rotate + 30)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ));
};

export default Servers;
