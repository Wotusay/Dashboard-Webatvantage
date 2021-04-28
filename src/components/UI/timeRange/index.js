import React from 'react';
import styles from './timeRange.module.css';

const TimeRange = () => {

    return (
        <>
        <div className={styles.timeWrapper} >
        <p className={styles.timeIndiccator} >Time Range</p>
        <div className={styles.buttonsWrapper} >
            <input className={styles.input} type="radio" name="time" id="day" value="1" ></input>
            <label htmlFor='day' className={styles.label} >1D
            </label>
           
            <input defaultChecked className={styles.input} type="radio" name="time" id="week" value="7" ></input>
            <label htmlFor='week' className={styles.label} >1W
            </label>                   
           
            <input className={styles.input} type="radio" name="time" id="month" value="30" ></input>
            <label htmlFor='month' className={styles.label} >1M
            </label>

        </div>
    </div>
    </>
    )
}

export default TimeRange;