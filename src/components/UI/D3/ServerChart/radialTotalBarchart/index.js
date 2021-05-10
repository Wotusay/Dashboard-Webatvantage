import { useObserver } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { RADIALCOLORS } from '../../../../../consts';
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
          styles={{
            backgroundColor: '#FFFFFF',
            path: { stroke: `url(#storage)` },
            trail: { stroke: chartSetttings.black },
          }}>
          {/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
          <div style={{ width: '80%' }}>
            <CircularProgressbarWithChildren
              value={100}
              styles={{
                pathColor: color,
                trailColor: 'transparent',
                backgroundColor: '#FFFFFF',
                path: {
                  stroke: `url(#${
                    serverStore.totalAvg5Load <= 2
                      ? 'status-green'
                      : serverStore.totalAvg5Load <= 4
                      ? 'status-orange'
                      : serverStore.totalAvg5Load <= 6
                      ? 'status-red'
                      : 'status-green'
                  })`,
                },
              }}>
              <div className={styles.textWrapper}>
                <p className=" font-sans font-semibold text-6xl text-nightBlue pb-8 ">
                  Total
                </p>
                <div className={styles.storageWrapper}>
                  <p className="font-sans font-medium text-briches text-xl">
                    Storage
                  </p>
                  <p className="font-sans text-normal text-nightBlue">{`${serverStore.totalStorageUsed} - ${serverStore.totalStorage}GB`}</p>
                </div>
                <div className={styles.loadWrapper}>
                  <p className="font-sans font-medium" style={{ color: color }}>
                    Load
                  </p>
                  <p className="font-sans text-normal text-nightBlue">
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
