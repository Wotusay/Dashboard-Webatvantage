import { useObserver } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import TimeRange from '../../UI/timeRange';
import Card from '../../UI/card';
import { useStores } from '../../../hooks';
import AquistionChart from '../../UI/D3/aquistionChart';

import styles from './analytics.module.css';
import AnalyticsChart from '../../UI/D3/analyticsChart';

import { motion } from 'framer-motion';
import {
  titleAnimaton,
  graphAnimaton,
  earningAnimaton,
} from '../../../animation';
import OverlayScrollbars from 'overlayscrollbars';

const Analytics = () => {
  const { clientStore } = useStores();
  const [mouseMove, setMouseMove] = useState(false);

  const oldItems = clientStore.latestData;
  const item = clientStore.eCommerceItems;

  let decreaseValueViews =
    clientStore.totalViews - clientStore.totalLastMonthViews;
  let decreaseValueSessions =
    clientStore.totalSessions - clientStore.totalLastMonthSessions;
  let decreaseValueUsers =
    clientStore.totalUsers - clientStore.totalLastMonthUsers;

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

    OverlayScrollbars(document.querySelectorAll('#outer'), {
      className: 'os-theme-dark',
      scrollbars: {
        autoHide: 'l',
        autoHideDelay: 800,
      },
      nativeScrollbarsOverlaid: {
        initialize: false,
      },
    });
  });

  return useObserver(() => (
    <>
      <TimeRange mouseMove={mouseMove} />
      <div className={styles.box}>
        <motion.h2
          initial={'exit'}
          variants={titleAnimaton}
          exit={'exit'}
          animate={'start'}
          className=" ml-40 mt-16 mb-7  font-sans font-medium text-nightBlue text-6xl ">
          Analytics Data
        </motion.h2>

        <div className={styles.chartsWrapper}>
          <div className={styles.analyticsChart}>
            <div className={styles.cardsWrapper}>
              <Card
                title={`Total pageviews`}
                number={new Intl.NumberFormat('de-DE').format(
                  clientStore.totalViews
                )}
                rate={(
                  (decreaseValueViews / clientStore.totalLastMonthViews) *
                  100
                ).toFixed(0)}
                tagline={`Compared to ${new Intl.NumberFormat('de-DE').format(
                  clientStore.totalLastMonthViews
                )} last month`}
                raw={clientStore.totalViews}
                isANumber={true}
                from={clientStore.latestNumbers.totalLatestViews}
                isCurrency={false}
              />
              <Card
                title={`Total sessions`}
                number={new Intl.NumberFormat('de-DE').format(
                  clientStore.totalSessions
                )}
                rate={(
                  (decreaseValueSessions / clientStore.totalLastMonthSessions) *
                  100
                ).toFixed(0)}
                tagline={`Compared to ${new Intl.NumberFormat('de-DE').format(
                  clientStore.totalLastMonthSessions
                )} last month`}
                from={clientStore.latestNumbers.totalLatestSessions}
                raw={clientStore.totalSessions}
                isANumber={true}
                isCurrency={false}
              />
              <Card
                title={`Total users`}
                number={new Intl.NumberFormat('de-DE').format(
                  clientStore.totalUsers
                )}
                rate={(
                  (decreaseValueUsers / clientStore.totalLastMonthUsers) *
                  100
                ).toFixed(0)}
                tagline={`Compared to ${new Intl.NumberFormat('de-DE').format(
                  clientStore.totalLastMonthUsers
                )} last month`}
                from={clientStore.latestNumbers.totalLatestUsers}
                raw={clientStore.totalUsers}
                isANumber={true}
                isCurrency={false}
              />
            </div>
            <motion.div
              initial={'exit'}
              variants={graphAnimaton}
              exit={'exit'}
              animate={'start'}
              className={styles.chartAnalyics}>
              <AnalyticsChart oldItems={oldItems} items={item} />
            </motion.div>
          </div>
          <div className={styles.aquistionChart}>
            <motion.div
              initial={'exit'}
              variants={earningAnimaton}
              exit="exit"
              animate="start"
              className={styles.bg}>
              <AquistionChart items={item} />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  ));
};

export default Analytics;
