import React from 'react';
import { CATEGORIES } from '../../../consts';
import styles from './sectorcard.module.css';

const SectorCard = () => {
  return (
    <>
      <div className={styles.sectorWrapper}>
        <span className={styles.title}>Total Sector Storage</span>
        <div className={styles.sectorCard}>
          <div className={styles.sectorLayout}>
            <div className={styles.label}>
              <div className={styles.circle}></div>
              <p className={styles.name}>{CATEGORIES.medic}</p>
            </div>
            <p className={styles.used}>500GB</p>
            <p className={styles.total}>1000GB</p>

            <div className={styles.label}>
              <div
                style={{ background: '#C6B2C4' }}
                className={styles.circle}></div>
              <p className={styles.name}>{CATEGORIES.fashion}</p>
            </div>
            <p className={styles.used}>500GB</p>
            <p className={styles.total}>1000GB</p>

            <div className={styles.label}>
              <div
                style={{ background: '#B0C1A2' }}
                className={styles.circle}></div>
              <p className={styles.name}>{CATEGORIES.shoes}</p>
            </div>
            <p className={styles.used}>500GB</p>
            <p className={styles.total}>1000GB</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectorCard;
