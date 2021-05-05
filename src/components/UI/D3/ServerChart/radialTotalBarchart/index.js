import { useObserver } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { RADIALCOLORS } from '../../../../../consts ';
import { useStores } from '../../../../../hooks';
import styles from './radialTotalBarchart.module.css';

const RadialTotalBarchart = () => {
  const { serverStore } = useStores();
  const [color, setColor] = useState(0);

  const chartSetttings = RADIALCOLORS;

  const statusChekker = () => {
    serverStore.totalAvg5Load <= 2
      ? setColor(chartSetttings.green)
      : serverStore.totalAvg5Load <= 4
      ? setColor(chartSetttings.orange)
      : serverStore.totalAvg5Load <= 6
      ? setColor(chartSetttings.red)
      : setColor(chartSetttings.green);
  };

  useEffect(() => statusChekker());

  return useObserver(() => (
    <>
      <div style={{ width: 300, height: 300 }}>
        <CircularProgressbarWithChildren
          value={
            serverStore.totalStorage <= 0
              ? 0
              : (serverStore.totalStorageUsed / serverStore.totalStorage) * 100
          }
          strokeWidth={7}
          styles={buildStyles({
            backgroundColor: '#FFFFFF',

            pathColor: chartSetttings.blue,
            trailColor: chartSetttings.black,
          })}>
          {/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
          <div style={{ width: '80%' }}>
            <CircularProgressbarWithChildren
              value={100}
              styles={buildStyles({
                pathColor: color,
                trailColor: 'transparent',
                backgroundColor: '#FFFFFF',
              })}>
              <div className={styles.textWrapper}>
                <p className={styles.title}>Total</p>
                <div className={styles.storageWrapper}>
                  <p className={styles.storageText}>Storage</p>
                  <p
                    className={
                      styles.storageNumbers
                    }>{`${serverStore.totalStorageUsed} - ${serverStore.totalStorage}GB`}</p>
                </div>
                <div className={styles.loadWrapper}>
                  <p className={styles.loadText} style={{ color: color }}>
                    Load
                  </p>
                  <p className={styles.loadNumber}>
                    {serverStore.totalAvg5Load}
                  </p>
                </div>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </>
  ));
};

export default RadialTotalBarchart;
