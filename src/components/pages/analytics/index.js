import { useObserver } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import TimeRange from '../../UI/timeRange';
import Card from '../../UI/card';
import { useStores } from '../../../hooks';
import AquistionChart from '../../UI/D3/aquistionChart';

import styles from './analytics.module.css';
import AnalyticsChart from '../../UI/D3/analyticsChart';

const Analytics = () => {
  const { clientStore } = useStores();
  const [mouseMove, setMouseMove] = useState(false);

  const item = clientStore.eCommerceItems;
  let decreaseValueViews =
    clientStore.totalEarining - clientStore.totalEariningMonth;
  let decreaseValueSessions =
    clientStore.totalEarining - clientStore.totalEariningMonth;
  let decreaseValueUsers =
    clientStore.totalEarining - clientStore.totalEariningMonth;

  useEffect(() => {
    let timeout = null;
    const updateMousePosition = (e) => {
      setMouseMove(true);
      if (e.type === 'click') {
        clearTimeout(timeout);
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setMouseMove(false);
      }, 10000);

      window.removeEventListener('mousemove', updateMousePosition);
    };
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('click', updateMousePosition);
  });

  return useObserver(() => (
    <>
      <TimeRange mouseMove={mouseMove} />
      <div className={styles.box}>
        <h2 className=" ml-52 mt-10 mb-3 font-sans font-medium text-nightBlue text-6xl ">
          Analytics Data
        </h2>
        <div className={styles.cardsWrapper}>
          <Card
            title={`Total pageviews`}
            number={new Intl.NumberFormat('de-DE').format(clientStore.totalViews)}
            rate={(
              (decreaseValueViews / clientStore.totalLastMonthViews) *
              100
            ).toFixed(0)}
            tagline={`Compared to ${new Intl.NumberFormat('de-DE').format(clientStore.totalLastMonthViews)} last month`}
          />
          <Card
            title={`Total sessions`}
            number={new Intl.NumberFormat('de-DE').format(clientStore.totalSessions)}
            rate={(
              (decreaseValueSessions / clientStore.totalLastMonthSessions) *
              100
            ).toFixed(0)}
            tagline={`Compared to ${new Intl.NumberFormat('de-DE').format(clientStore.totalLastMonthSessions)} last month`}
          />
          <Card
            title={`Total users`}
            number={new Intl.NumberFormat('de-DE').format(clientStore.totalUsers)}
            rate={(
              (decreaseValueUsers / clientStore.totalLastMonthUsers) *
              100
            ).toFixed(0)}
            tagline={`Compared to ${new Intl.NumberFormat('de-DE').format(clientStore.totalLastMonthUsers)} last month`}
          />
        </div>

        <div className={styles.chartsWrapper}>
          <div className={styles.chartAnalyics}>
            <AnalyticsChart items={item} />
          </div>
          <div className={styles.aquistionChart}>
            <div className={styles.bg}>
              <AquistionChart items={item} />
            </div>
          </div>
        </div>
      </div>
    </>
  ));
};

export default Analytics;
