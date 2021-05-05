import React from 'react';
import styles from './card.module.css';

const Card = ({ title, number, rate, tagline }) => {
  return (
    <>
      <div>
        <p className={styles.title}>{title}</p>
        <div className={styles.wrapper}>
          <p className={styles.number}>{number}</p>
          {rate === '' ? (
            ''
          ) : (
            <p className={rate >= 0 ? styles.green : styles.red}>{`${rate}%`}</p>
          )}
        </div>
        <p className={styles.tagline}>{tagline} </p>
      </div>
    </>
  );
};

export default Card;
