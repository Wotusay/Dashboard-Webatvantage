import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import ConversionChart from '../../UI/D3/conversionChart';
import { useStores } from '../../../hooks';
import Card from '../../UI/card';
import EarningChart from '../../UI/D3/earningChart';
import styles from './eCommerce.module.css';
import TimeRange from '../../UI/timeRange';
import { motion } from 'framer-motion';
import {
  titleAnimaton,
  graphAnimaton,
  earningAnimaton,
} from '../../../animation';
import OverlayScrollbars from 'overlayscrollbars';

const ECommerce = () => {
  const { clientStore } = useStores();
  const item = clientStore.eCommerceItems;
  const [mouseMove, setMouseMove] = useState(false);
  // Calculates the % for these items
  let decreaseValueEarnings =
    clientStore.totalEarining - clientStore.totalEariningMonth;
  let decreaseAvgSold = clientStore.avgSold - clientStore.avgSoldMonth;
  const calulationRateAvg = (
    (decreaseValueEarnings / clientStore.totalEariningMonth) *
    100
  ).toFixed(0);
  const calulationRateEarnings = (
    (decreaseAvgSold / clientStore.avgSold) *
    100
  ).toFixed(0);

  const oldItems = clientStore.latestData;


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
      className : "os-theme-dark",
      scrollbars:{
        autoHide: 'l',
        autoHideDelay: 800,
      },
      nativeScrollbarsOverlaid :{
        initialize:false
      }
    });
  },[]);

  return useObserver(() => (
    <>
      <TimeRange mouseMove={mouseMove} />
      <motion.h2
        initial={'exit'}
        variants={titleAnimaton}
        exit={'exit'}
        animate={'start'}
        className=" ml-36 mt-16 mb-16 font-sans font-medium text-nightBlue text-6xl ">
        E-Commerce Data
      </motion.h2>
      <div className={styles.chartsWrapper}>

        <div>
        <div className={styles.cardsWrapper}>
        <Card
          title={`Total earning`}
          number={new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
          }).format(clientStore.totalEarining)}
          rate={calulationRateAvg}
          tagline={`Compared to ${new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
          }).format(clientStore.totalEariningMonth)} last month`}
          isANumber={true}
          isCurrency={true}
          from={clientStore.latestNumbers.totalLatestEarnings}
          raw={clientStore.totalEarining}
        />
        <Card
          title={`Total sold`}
          number={clientStore.avgSold}
          rate={calulationRateEarnings}
          tagline={`Compared to ${clientStore.avgSoldMonth} last month`}
          isANumber={true}
          isCurrency={false}
          from={clientStore.latestNumbers.totalLatestConversions}
          raw={clientStore.avgSold}
        />
        <Card
          title={`Best category`}
          number={clientStore.categoryTotal.category}
          rate={''}
          tagline={`Earned ${new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
          }).format(clientStore.categoryTotal.total)} in total`}
          isANumber={false}
          raw={''}
          isCurrency={false}
        />
      </div>
        <motion.div
          initial={'exit'}
          variants={graphAnimaton}
          exit={'exit'}
          animate={'start'}
          className="bg-white rounded-2xl pt-8 shadow-xl p-8 pr-0 w-max">
          <ConversionChart oldItems={oldItems} items={item} />
        </motion.div>

        </div>
        <motion.div
          initial={'exit'}
          variants={earningAnimaton}
          exit="exit"
          animate="start"
          className={styles.earningChart}>
          <EarningChart oldItems={oldItems} items={item} />
        </motion.div>
      </div>
    </>
  ));
};

export default ECommerce;
