import React from 'react';
import { useObserver } from 'mobx-react-lite';
import ConversionChart from '../../UI/D3/conversionChart';
import { useStores } from '../../../hooks';
import Card from '../../UI/card';
import EarningChart from '../../UI/D3/earningChart';

const ECommerce = () => {
    const {eCommerceStore} =useStores();
    const item = eCommerceStore.eCommerceItems;
    return useObserver (() => (
        <>
            <div>
                <p>Time Range</p>
                <div>
                    <button>1D</button>
                    <button>1W</button>
                    <button>1M</button>
                </div>
            </div>

            <div>
            <ConversionChart items={item} />
            <div> 
                <div>
                    <Card title={`Total earning`} number={eCommerceStore.totalEarining} rate={10} tagline={`Compared to €300.00 last month`} />
                    <Card title={`Total sold`} number={eCommerceStore.avgSold} rate={10} tagline={`Compared to €300.00 last month`} />
                </div>
                <EarningChart items={item} />
            </div>
            </div>
        </>
    ))
}

export default ECommerce;