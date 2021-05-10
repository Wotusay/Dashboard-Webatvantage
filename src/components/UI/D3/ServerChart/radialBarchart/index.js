import { useObserver } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { RADIALCOLORS } from '../../../../../consts';

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



  useEffect(() => statusChekker());
  return useObserver(() => (
    <>
      <div
        style={{ transform: `rotate(-${rotate}deg)`, width: 180, height: 180 }}>
        <CircularProgressbarWithChildren
          value={diskSpace.freePercentage}
          strokeWidth={7}
          background
          styles={{
            // Customize the path, i.e. the "completed progress",
            path: { stroke: `url(#storage)` },
            root: {
              filter: 'drop-shadow(0px 10px 15px rgba(134, 118, 255, 0.31))',
            },
            // Customize the circle behind the path, i.e. the "total progress"
            trail: { stroke: chartSetttings.black, fill: 'white' },
            // Customize background - only used when the `background` prop is true
            background: { fill: 'white' },
          }}>
          {/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
          <div style={{ width: '80%' }}>
            <CircularProgressbarWithChildren
              value={100}
              background
              styles={buildStyles({
                boxShadow: '0 10px 15px -3px rgb(134 118 255 / 21%)',
                backgroundColor: '#FFFFFF',
                pathColor: `url(#${
                  status === 'green'
                    ? 'status-green'
                    : status === 'orange'
                    ? 'status-orange'
                    : status === 'red'
                    ? 'status-red'
                    : 'status-green'
                })`,
                trailColor: 'transparent',
              })}>
              <div className='flex flex-col items-center'>
                <p className="font-sans text-nightBlue font-medium uppercase text-3xl">{name}</p>
                <p className=" font-sans text-briches text-2xl pt-8 pb-7">{`${diskSpace.used} - ${diskSpace.available} GB`}</p>
                <p style={{ color: color }} className=" font-sans text-2xl">
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
