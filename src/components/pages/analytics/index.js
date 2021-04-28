import { useObserver } from 'mobx-react-lite';
import React from 'react';
import TimeRange from '../../UI/timeRange';
import Card from '../../UI/card';
import { useStores } from '../../../hooks';
import AquistionChart from '../../UI/D3/aquistionChart';


const Analytics = () => {

    const {eCommerceStore} =useStores();
    const item = eCommerceStore.eCommerceItems;
    let decreaseValueEarnings =  eCommerceStore.totalEarining - eCommerceStore.totalEariningMonth;

    return useObserver(() => (
        <>
            <TimeRange />

            <div>
                <Card title={`Total earning`} number={`€${eCommerceStore.totalEarining}`} rate={((decreaseValueEarnings / eCommerceStore.totalEariningMonth) * 100).toFixed(0)} tagline={`Compared to €${eCommerceStore.totalEariningMonth} last month`} />
                <Card title={`Total earning`} number={`€${eCommerceStore.totalEarining}`} rate={((decreaseValueEarnings / eCommerceStore.totalEariningMonth) * 100).toFixed(0)} tagline={`Compared to €${eCommerceStore.totalEariningMonth} last month`} />
                <Card title={`Total earning`} number={`€${eCommerceStore.totalEarining}`} rate={((decreaseValueEarnings / eCommerceStore.totalEariningMonth) * 100).toFixed(0)} tagline={`Compared to €${eCommerceStore.totalEariningMonth} last month`} />
            </div>

            <div>
                <AquistionChart items={item} />
            </div>
        </>
    ))
}

export default Analytics;