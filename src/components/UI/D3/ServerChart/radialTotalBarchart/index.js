import { useObserver } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { RADIALCOLORS } from '../../../../../consts';
import { useStores } from '../../../../../hooks';
import styles from './radialTotalBarchart.module.css';
import VisibilitySensor from 'react-visibility-sensor';

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

  // eslint-disable-next-line
  useEffect(() => statusChekker(), [serverStore.totalAvg5Load]);

  return useObserver(() => (
    <>
      <div style={{ width: 300, height: 300 }}>
        <VisibilitySensor>
          {({ isVisible }) => {
            const value = isVisible
              ? (serverStore.totalStorageUsed / serverStore.totalStorage) * 100
              : 0;
            return (
              <CircularProgressbarWithChildren
                value={value}
                strokeWidth={7}
                styles={{
                  backgroundColor: '#FFFFFF',
                  path: {
                    stroke: `url(#storage)`,
                    strokeWidth: 6.5,
                    transition: 'stroke-dashoffset 1.5s ease 0.5s',
                  },
                  trail: { stroke: chartSetttings.black, strokeWidth: 6.5 },
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
                      trail: { stroke: 'transparent' },
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
                        strokeWidth: 6.5,
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
                        <p
                          className="font-sans font-medium"
                          style={{ color: color }}>
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
            );
          }}
        </VisibilitySensor>
      </div>
    </>
  ));
};

export default RadialTotalBarchart;
