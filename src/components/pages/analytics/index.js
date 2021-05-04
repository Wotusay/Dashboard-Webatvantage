import { useObserver } from 'mobx-react-lite';
import React from 'react';
import TimeRange from '../../UI/timeRange';
import Card from '../../UI/card';
import { useStores } from '../../../hooks';
import AquistionChart from '../../UI/D3/aquistionChart';

import styles from './analytics.module.css';
import AnalyticsChart from '../../UI/D3/analyticsChart';

const Analytics = () => {
  const { clientStore } = useStores();
  const item = clientStore.eCommerceItems;
  let decreaseValueEarnings =
    clientStore.totalEarining - clientStore.totalEariningMonth;

  return useObserver(() => (
    <>
      <TimeRange />
      <div className={styles.cardsWrapper}>
        <Card
          title={`Total earning`}
          number={`€${clientStore.totalEarining}`}
          rate={(
            (decreaseValueEarnings / clientStore.totalEariningMonth) *
            100
          ).toFixed(0)}
          tagline={`Compared to €${clientStore.totalEariningMonth} last month`}
        />
        <Card
          title={`Total earning`}
          number={`€${clientStore.totalEarining}`}
          rate={(
            (decreaseValueEarnings / clientStore.totalEariningMonth) *
            100
          ).toFixed(0)}
          tagline={`Compared to €${clientStore.totalEariningMonth} last month`}
        />
        <Card
          title={`Total earning`}
          number={`€${clientStore.totalEarining}`}
          rate={(
            (decreaseValueEarnings / clientStore.totalEariningMonth) *
            100
          ).toFixed(0)}
          tagline={`Compared to €${clientStore.totalEariningMonth} last month`}
        />
      </div>

      <div className={styles.chartsWrapper}>
        <div className={styles.doubleStackedChart}>
          <AnalyticsChart  items={item} />
        </div>
        <div className={styles.radialChart}>
          <AquistionChart items={item} />
        </div>
      </div>
    </>
  ));
};

export default Analytics;
