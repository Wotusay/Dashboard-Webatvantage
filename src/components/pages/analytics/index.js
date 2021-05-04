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
  let decreaseValueViews =
    clientStore.totalEarining - clientStore.totalEariningMonth;
  let decreaseValueSessions =
    clientStore.totalEarining - clientStore.totalEariningMonth;
  let decreaseValueUsers =
    clientStore.totalEarining - clientStore.totalEariningMonth;

  return useObserver(() => (
    <>
      <TimeRange />
      <div className={styles.cardsWrapper}>
        <Card
          title={`Total pageviews`}
          number={clientStore.totalViews}
          rate={(
            (decreaseValueViews / clientStore.totalLastMonthViews) *
            100
          ).toFixed(0)}
          tagline={`Compared to ${clientStore.totalLastMonthViews} last month`}
        />
        <Card
          title={`Total sessions`}
          number={clientStore.totalSessions}
          rate={(
            (decreaseValueSessions / clientStore.totalLastMonthSessions) *
            100
          ).toFixed(0)}
          tagline={`Compared to ${clientStore.totalLastMonthSessions} last month`}
        />
        <Card
          title={`Total users`}
          number={clientStore.totalUsers}
          rate={(
            (decreaseValueUsers / clientStore.totalLastMonthUsers) *
            100
          ).toFixed(0)}
          tagline={`Compared to ${clientStore.totalLastMonthUsers} last month`}
        />
      </div>

      <div className={styles.chartsWrapper}>
        <div className={styles.doubleStackedChart}>
          <AnalyticsChart items={item} />
        </div>
        <div className={styles.radialChart}>
          <AquistionChart items={item} />
        </div>
      </div>
    </>
  ));
};

export default Analytics;
