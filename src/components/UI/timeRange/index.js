import React from 'react';
import styles from './timeRange.module.css';
import { motion } from 'framer-motion';
import { useStores } from '../../../hooks';

const TimeRange = ({ mouseMove }) => {
  const {uiStore} = useStores();
  const navAnimation = {
    start: {
      opacity: 1,
      translateX: 0,
      translateY: 0,
      zIndex: 100,
      overflow: 'none',
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    disapear: {
      opacity: 0,
      translateX: 0,
      translateY: -100,
      zIndex: 100,
      overflow: 'none',
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };
  return (
    <>
      <div style={{ left: '45%' }} className="absolute top-4 z-50">
        <div className="overflow-hidden relative">
          <motion.div
            variants={navAnimation}
            className="overflow-hidden h-44"
            initial={'disapear'}
            exit={'disapear'}
            animate={mouseMove ? 'start' : 'disapear'}>
            <p className=" font-sans font-semibold text-3xl uppercase tracking-widest justify-center flex text-nightBlue mb-5">
              Time Range
            </p>
            <div className="grid grid-flow-col auto-cols-max shadow-xl bg-white p-2 rounded-full">
              <input
              defaultChecked={uiStore.timeRangeState === 'day' ? true : false}
                className={styles.input}
                type="radio"
                name="time"
                id="day"
                onInput={(e) => {
                uiStore.setTimeRange(e.currentTarget.id);
                }}
                value="1"></input>
              <label htmlFor="day" className={styles.label}>
                1D
              </label>

              <input
                defaultChecked={uiStore.timeRangeState === 'week' ? true : false}
                className={styles.input}
                type="radio"
                name="time"
                id="week"
                onInput={(e) => {
                uiStore.setTimeRange(e.currentTarget.id);
                }}
                value="7"></input>
              <label htmlFor="week" className={styles.label}>
                1W
              </label>

              <input
              defaultChecked={uiStore.timeRangeState === 'month' ? true : false}
                className={styles.input}
                type="radio"
                name="time"
                id="month"
                onInput={(e) => {
                uiStore.setTimeRange(e.currentTarget.id);
                }}
                value="30"></input>
              <label htmlFor="month" className={styles.label}>
                1M
              </label>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TimeRange;
