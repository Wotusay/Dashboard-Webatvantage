import { useObserver } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { RADIALCOLORS } from '../../../../../consts ';
import styles from './radialBarchart.module.css';

const RadialChart = ({ name, diskSpace, load, status, rotate }) => {
  const chartSetttings = RADIALCOLORS;
  const [color, setColor] = useState(chartSetttings.green);
  const statusChekker = () => {
    status === 'green'
      ? setColor(chartSetttings.green)
      : status === 'orange'
      ? setColor(chartSetttings.orange)
      : status === 'red'
      ? setColor(chartSetttings.red)
      : setColor(chartSetttings.green);
  };

  console.log(rotate);

  useEffect(() => statusChekker());
  return useObserver(() => (
    <>
      <div
        style={{ transform: `rotate(-${rotate}deg)`, width: 180, height: 180 }}>
        <CircularProgressbarWithChildren
          value={diskSpace.freePercentage}
          strokeWidth={7}
          background
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
              background
              styles={buildStyles({
                backgroundColor: '#FFFFFF',

                pathColor: color,
                trailColor: 'transparent',
              })}>
              <div className={styles.textWrapper}>
                <p className={styles.title}>{name}</p>
                <p
                  className={
                    styles.storage
                  }>{`${diskSpace.used} - ${diskSpace.available} GB`}</p>
                <p style={{ color: color }} className={styles.load}>
                  {load.avg5}
                </p>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </>
  ));
};

export default RadialChart;
