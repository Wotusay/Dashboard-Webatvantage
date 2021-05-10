import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../../hooks';
import GreenStatic from '../../svgs/staticCharts/GreenStatic';
import RedStatic from '../../svgs/staticCharts/OrangeStatic';
import OrangeStatic from '../../svgs/staticCharts/RedStatic';
import styles from './loadwatchercard.module.css';
import { RADIALCOLORS } from '../../../consts/index';

const LoadWatcherCard = () => {
  const { serverStore } = useStores();
  return useObserver(() => (
    <>
      <div className={styles.sectorWrapper}>
        <span className=' font-sans font-semibold text-nightBlue text-4xl'>Load watcher</span>
        <div className={styles.sectorCard}>
          <div className={styles.sectorLayout}>
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
                  className=' font-sans uppercase font-medium '>
                  {s.name}
                </p>
                <p className='font-sans text-gray-400 '>{s.load.current}</p>
                <div className={styles.total}>
                  {s.status === 'green' ? (
                    <GreenStatic />
                  ) : s.status === 'orange' ? (
                    <OrangeStatic />
                  ) : s.status === 'red' ? (
                    <RedStatic />
                  ) : (
                    ''
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  ));
};

export default LoadWatcherCard;
