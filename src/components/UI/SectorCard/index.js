import React from 'react';
import styles from './sectorcard.module.css';
import { motion } from 'framer-motion';
import { cardAnimaton } from '../../../animation';
import { useObserver } from 'mobx-react-lite';
import { useStores } from '../../../hooks';

const SectorCard = () => {
  const {serverStore} = useStores();

  console.log(serverStore.sectorData);

  return useObserver( () => (
    <>
      <motion.div
        initial={'exit'}
        variants={cardAnimaton}
        exit={'exit'}
        animate={'start'}
        className={styles.sectorWrapper}>
        <span className="font-sans font-semibold text-nightBlue text-4xl">
          Total Sector Storage
        </span>
        <div id='outer' className={styles.sectorCard}>
          <div className={styles.sectorLayout}>
            {serverStore.sectorData.map(item => (
            <>
            <div className={styles.label}>
            <div
              style={{
                background: item.color,
              }}
              className={styles.circle}></div>
            <p className="font-sans  text-nightBlue">{item.name}</p>
          </div>
          <p className="font-sans text-gray-400 font-normal">{item.used}</p>
          <p className="font-sans text-nightBlue">{item.amount}</p>
          </>
            )) }
          </div>
        </div>
      </motion.div>
    </>
  ));
};

export default SectorCard;
