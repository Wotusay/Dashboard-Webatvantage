import React from 'react';
import styles from './card.module.css';

const Card = ({ title, number, rate, tagline }) => {
  return (
    <>
      <div className=" bg-white rounded-2xl p-8 shadow-xl">
        <p className="font-sans text-nightBlue">{title}</p>
        <div className='flex flex-row pt-3 pb-3 items-center'>
          <p className="font-sans font-semibold text-6xl text-nightBlue">{number}</p>
          {rate === '' ? (
            ''
          ) : (
            <p
              className={rate >= 0 ? styles.green : styles.red}>{`${rate}%`}</p>
          )}
        </div>
        <p className="font-sans text-lg text-gray-500 ">{tagline} </p>
      </div>
    </>
  );
};

export default Card;
