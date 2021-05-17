import React from 'react';
import styles from './card.module.css';
import { motion } from 'framer-motion';
import { cardAnimaton } from '../../../animation';

const Card = ({ title, number, rate, tagline }) => {
  return (
    <>
      <motion.div
        exit="exit"
        animate="start"
        initial="exit"
        variants={cardAnimaton}
        className=" bg-white rounded-2xl p-8 shadow-xl">
        <p className="font-sans text-nightBlue">{title}</p>
        <div className="flex flex-row pt-3 pb-3 items-center">
          <p className="font-sans font-semibold text-6xl text-nightBlue">
            {number}
          </p>
          {rate === '' ? (
            ''
          ) : (
            <p
              className={rate >= 0 ? styles.green : styles.red}>{`${rate}%`}</p>
          )}
        </div>
        <p className="font-sans text-lg text-gray-500 ">{tagline} </p>
      </motion.div>
    </>
  );
};

export default Card;
