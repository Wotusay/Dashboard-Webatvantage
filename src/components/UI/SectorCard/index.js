import React from 'react';
import { CATEGORIES } from '../../../consts';
import styles from './sectorcard.module.css';

const SectorCard = () => {
  return (
    <>
      <div className={styles.sectorWrapper}>
        <span className="font-sans font-semibold text-nightBlue text-4xl">
          Total Sector Storage
        </span>
        <div className={styles.sectorCard}>
          <div className={styles.sectorLayout}>
            <div className={styles.label}>
              <div
                style={{
                  background: CATEGORIES.colors.medic,
                }}
                className={styles.circle}></div>
              <p className="font-sans  text-nightBlue">{CATEGORIES.medic}</p>
            </div>
            <p className="font-sans text-gray-400 font-normal">500GB</p>
            <p className="font-sans text-nightBlue">1000GB</p>

            <div className={styles.label}>
              <div
                style={{ background: CATEGORIES.colors.fashion}}
                className={styles.circle}></div>
              <p className="font-sans text-nightBlue">{CATEGORIES.fashion}</p>
            </div>
            <p className="font-sans text-gray-400 font-normal">500GB</p>
            <p className="font-sans text-nightBlue">1000GB</p>

            <div className={styles.label}>
              <div
                style={{ background: CATEGORIES.colors.shoes }}
                className={styles.circle}></div>
              <p className="font-sans text-nightBlue">{CATEGORIES.shoes}</p>
            </div>
            <p className="font-sans text-gray-400 font-normal">500GB</p>
            <p className="font-sans text-nightBlue">1000GB</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectorCard;
