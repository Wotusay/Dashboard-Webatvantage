import React from 'react';
import styles from './card.module.css'

const Card = ({title, number, rate, tagline}) => {
    return (
        <>
            <p className={styles.title}>{title}</p>
            <div className={styles.wrapper}>
            <p className={styles.number} >{number}</p> 
            <p className={styles.green} >{`${rate}%`}</p> 
            </div>
            <p className={styles.tagline}>{tagline} </p>
        </>

    )
}

export default Card;