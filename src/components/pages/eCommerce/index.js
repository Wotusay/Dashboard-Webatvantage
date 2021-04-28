import React from 'react';
import { useObserver } from 'mobx-react-lite';
import ConversionChart from '../../UI/D3/conversionChart';
import { useStores } from '../../../hooks';
import Card from '../../UI/card';
import EarningChart from '../../UI/D3/earningChart';
import styles from './eCommerce.module.css';
import TimeRange from '../../UI/timeRange';

const ECommerce = () => {
    const {eCommerceStore} =useStores();
    const item = eCommerceStore.eCommerceItems;
    let decreaseValueEarnings =  eCommerceStore.totalEarining - eCommerceStore.totalEariningMonth;
    let decreaseAvgSold =  eCommerceStore.avgSold - eCommerceStore.avgSoldMonth;

    return useObserver (() => (
        <>
        <TimeRange />
            <div className={styles.cardsWrapper} >
                    <Card title={`Total earning`} number={`€${eCommerceStore.totalEarining}`} rate={((decreaseValueEarnings / eCommerceStore.totalEariningMonth) * 100).toFixed(0)} tagline={`Compared to €${eCommerceStore.totalEariningMonth} last month`} />
                    <Card title={`Total sold`} number={eCommerceStore.avgSold} rate={((decreaseAvgSold / eCommerceStore.avgSold) * 100).toFixed(0)} tagline={`Compared to ${eCommerceStore.avgSoldMonth} last month`} />
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