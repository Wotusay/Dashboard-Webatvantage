import { useObserver } from 'mobx-react-lite';
import React from 'react';
import TimeRange from '../../UI/timeRange';
import Card from '../../UI/card';
import { useStores } from '../../../hooks';
import AquistionChart from '../../UI/D3/aquistionChart';
import AnalyticsChart from '../../UI/D3/analyticsChart/sessionsChart';
import PageviewsChart from '../../UI/D3/analyticsChart/pageviewsChart';


const Analytics = () => {

    const {clientStore} =useStores();
    const item = clientStore.eCommerceItems;
    let decreaseValueEarnings =  clientStore.totalEarining - clientStore.totalEariningMonth;

    return useObserver(() => (
        <>
            <TimeRange />

            <div>
                <PageviewsChart items={item} />
                <AnalyticsChart items={item} /> 
            </div>

            <div>
                <Card title={`Total earning`} number={`€${clientStore.totalEarining}`} rate={((decreaseValueEarnings / clientStore.totalEariningMonth) * 100).toFixed(0)} tagline={`Compared to €${clientStore.totalEariningMonth} last month`} />
                <Card title={`Total earning`} number={`€${clientStore.totalEarining}`} rate={((decreaseValueEarnings / clientStore.totalEariningMonth) * 100).toFixed(0)} tagline={`Compared to €${clientStore.totalEariningMonth} last month`} />
                <Card title={`Total earning`} number={`€${clientStore.totalEarining}`} rate={((decreaseValueEarnings / clientStore.totalEariningMonth) * 100).toFixed(0)} tagline={`Compared to €${clientStore.totalEariningMonth} last month`} />
            </div>

            <div>
                <AquistionChart items={item} />
            </div>
        </>
    ))
}

export default Analytics;