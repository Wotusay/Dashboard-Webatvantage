import React from 'react';
import { useObserver } from 'mobx-react-lite';
import ConversionChart from '../../UI/D3/conversionChart';
import { useStores } from '../../../hooks';
import Card from '../../UI/card';
import EarningChart from '../../UI/D3/earningChart';
import styles from './eCommerce.module.css';
import TimeRange from '../../UI/timeRange';

const ECommerce = () => {
    const {clientStore} =useStores();
    const item = clientStore.eCommerceItems;

    // Calculates the % for these items
    let decreaseValueEarnings =  clientStore.totalEarining - clientStore.totalEariningMonth;
    let decreaseAvgSold =  clientStore.avgSold - clientStore.avgSoldMonth;
    const calulationRateAvg = ((decreaseValueEarnings / clientStore.totalEariningMonth) * 100).toFixed(0); 
    const calulationRateEarnings = ((decreaseAvgSold / clientStore.avgSold) * 100).toFixed(0);

    return useObserver (() => (
        <>
        <TimeRange />
            <div className={styles.cardsWrapper} >
                    <Card title={`Total earning`} number={`€${clientStore.totalEarining}`} rate={calulationRateAvg} tagline={`Compared to €${clientStore.totalEariningMonth} last month`} />
                    <Card title={`Total sold`} number={clientStore.avgSold} rate={calulationRateEarnings} tagline={`Compared to ${clientStore.avgSoldMonth} last month`} />
            </div>
            <div className={styles.chartsWrapper} >
            <div className={styles.ConversionChart}>
            <ConversionChart items={item} />
            </div>
            <div className={styles.earningsWrapper} > 
                <EarningChart items={item} />
            </div>
            </div>
        </>
    ))
}

export default ECommerce;