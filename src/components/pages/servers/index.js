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
      <div className={styles.layout}>
        <div className={styles.cardsWrapper} >
          <h2 className={styles.title}> Servers view </h2>
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
