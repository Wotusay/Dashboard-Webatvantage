import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { useObserver } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { earningAnimaton } from '../../../../animation';
import { CATEGORIES, CHARTS, RADIALCOLORS } from '../../../../consts';
import { useStores } from '../../../../hooks';
import styles from './earningChart.module.css';

const EarningChart = ({ items, oldItems }) => {
  // Ref is needed to draw in the graph
  const ref = useRef();
  const chartElements = CHARTS.earningChart;
  const { clientStore, serverStore } = useStores();
  clientStore.loaded = false; 
  const _items = items.map((a) => ({ ...a })); // We have to make a copy of the array to prevent it being rewriten
  const _oldItems = oldItems.map((a) => ({ ...a })); // We have to make a copy of the array to prevent it being rewriten
  const [loaded, setLoaded] = useState(false); // Here we check if the the item has been loaded in already
  const heightCalc = 41.5 * clientStore.lengthOfArray; // Calculates the height for the graphh
  const graph = () => {
    const svgCanvas = d3.select(ref.current);
    const top_n = clientStore.lengthOfArray; // How many items there needs to be in it
    // Removes all prev items
    svgCanvas.selectAll('text').remove();
    svgCanvas.selectAll('g').remove();
    svgCanvas.selectAll('rect').remove();
    svgCanvas.selectAll('defs').remove();

    const colorRangePink = [CATEGORIES.colors.medic, RADIALCOLORS.pink];
    const colorRangePurple = [CATEGORIES.colors.fashion, '#967BE1'];
    const colorPink = d3.scaleLinear().range(colorRangePink).domain([1, 2]);
    const colorPurple = d3.scaleLinear().range(colorRangePurple).domain([1, 2]);

    const colorRangeMedic = [CATEGORIES.colors.shoes, '#B500D2'];
    const colorRangeCategory1 = [CATEGORIES.colors.category1, '#FFCA66'];
    const colorRangeCategory2 = [CATEGORIES.colors.category2, '#D90001'];
    const colorRangeCategory3 = [CATEGORIES.colors.category3, '#FFB5EA'];
    const colorRangeCategory4 = [CATEGORIES.colors.category4, '#4E75FF'];
    const colorRangeCategory5 = [CATEGORIES.colors.category5, '#12EA41'];
    const colorRangeCategory6 = [CATEGORIES.colors.category6, '#07BCB2'];

    const colorMedic = d3.scaleLinear().range(colorRangeMedic).domain([1, 2]);

    const colorCategory1 = d3
      .scaleLinear()
      .range(colorRangeCategory1)
      .domain([1, 2]);
    const colorCategory2 = d3
      .scaleLinear()
      .range(colorRangeCategory2)
      .domain([1, 2]);
    const colorCategory3 = d3
      .scaleLinear()
      .range(colorRangeCategory3)
      .domain([1, 2]);
    const colorCategory4 = d3
      .scaleLinear()
      .range(colorRangeCategory4)
      .domain([1, 2]);
    const colorCategory5 = d3
      .scaleLinear()
      .range(colorRangeCategory5)
      .domain([1, 2]);
    const colorCategory6 = d3
      .scaleLinear()
      .range(colorRangeCategory6)
      .domain([1, 2]);

    const linearGradientRed = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'medic')
      .attr('gradientTransform', 'rotate(0)');

    linearGradientRed
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorPink(1));

    linearGradientRed
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorPink(2));

    const linearGradientPurple = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'shoes')
      .attr('gradientTransform', 'rotate(0)');

    linearGradientPurple
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorPurple(2));

    linearGradientPurple
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorPurple(1));

    const linearGradientMedic = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'fashion')
      .attr('gradientTransform', 'rotate(0)');

    linearGradientMedic
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorMedic(2));

    linearGradientMedic
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorMedic(1));

    const linearGradientCategory1 = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'category1')
      .attr('gradientTransform', 'rotate(0)');

    linearGradientCategory1
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorCategory1(1));

    linearGradientCategory1
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorCategory1(2));

    const linearGradientCategory2 = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'category2')
      .attr('gradientTransform', 'rotate(0)');

    linearGradientCategory2
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorCategory2(2));

    linearGradientCategory2
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorCategory2(1));

    const linearGradientCategory3 = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'category3')
      .attr('gradientTransform', 'rotate(0)');

    linearGradientCategory3
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorCategory3(1));

    linearGradientCategory3
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorCategory3(2));

    const linearGradientCategory4 = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'category4')
      .attr('gradientTransform', 'rotate(0)');

    linearGradientCategory4
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorCategory4(1));

    linearGradientCategory4
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorCategory4(2));

    const linearGradientCategory5 = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'category5')
      .attr('gradientTransform', 'rotate(0)');

    linearGradientCategory5
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorCategory5(1));

    linearGradientCategory5
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorCategory5(2));

    const linearGradientCategory6 = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'category6')
      .attr('gradientTransform', 'rotate(0)');

    linearGradientCategory6
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorCategory6(2));

    linearGradientCategory6
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorCategory6(1));

    const margin = chartElements.margin,
      width = ref.current.width.baseVal.value - margin.right,
      height = heightCalc;

    let barPadding = (height - (margin.bottom + margin.top)) / (top_n * 5);
    // For the desired animation we have to start form a starting point when its loaded in
    // This is why we make 2 arrays, One for the old one and one for the new one
    // Sorts the items form big to small
    const itemsSorted = _items
      .slice()
      .sort(
        (a, b) => b.eCommerceData.totalRevenue - a.eCommerceData.totalRevenue
      )
      .slice(0, top_n);

    const itemsOldSorted = _oldItems
      .slice()
      .sort(
        (a, b) => b.eCommerceData.totalRevenue - a.eCommerceData.totalRevenue
      )
      .slice(0, top_n);

    // Making copies to prevent overides
    const _itemsSorted = [...itemsSorted];
    const _itemsOldSorted = [...itemsOldSorted];

    _itemsSorted.forEach((d, i) => {
      d.rank = i; // Adds a rank to the obj
      // Makes sets th colour for the right category
      d.color =
        d.category === CATEGORIES.medic
          ? 'url(#medic)'
          : d.category === CATEGORIES.fashion
          ? 'url(#fashion)'
          : d.category === CATEGORIES.shoes
          ? 'url(#shoes)'
          : d.category === CATEGORIES.category1
          ? 'url(#category1)'
          : d.category === CATEGORIES.category2
          ? 'url(#category2)'
          : d.category === CATEGORIES.category3
          ? 'url(#category3)'
          : d.category === CATEGORIES.category4
          ? 'url(#category4)'
          : d.category === CATEGORIES.category5
          ? 'url(#category5)'
          : d.category === CATEGORIES.category6
          ? 'url(#category6)'
          : '#ACC39F';
    });

    _itemsOldSorted.forEach((d, i) => {
      d.rank = i; // Adds a rank to the obj
      // Makes sets th colour for the right category
      d.color =
        d.category === CATEGORIES.medic
          ? 'url(#medic)'
          : d.category === CATEGORIES.fashion
          ? 'url(#fashion)'
          : d.category === CATEGORIES.shoes
          ? 'url(#shoes)'
          : d.category === CATEGORIES.category1
          ? 'url(#category1)'
          : d.category === CATEGORIES.category2
          ? 'url(#category2)'
          : d.category === CATEGORIES.category3
          ? 'url(#category3)'
          : d.category === CATEGORIES.category4
          ? 'url(#category4)'
          : d.category === CATEGORIES.category5
          ? 'url(#category5)'
          : d.category === CATEGORIES.category6
          ? 'url(#category6)'
          : '#ACC39F';
    });

    // X - Axis
    let x = d3
      .scaleLinear()
      .domain([0, d3.max(_itemsSorted, (d) => d.eCommerceData.totalRevenue)])
      .range([margin.left, width - margin.right - 65]);

    // For an moving x-asis we have to create one where the old data is in it
    let oldX = d3
      .scaleLinear()
      .domain([0, d3.max(_itemsOldSorted, (d) => d.eCommerceData.totalRevenue)])
      .range([margin.left, width - margin.right - 65]);

    // Y - Axis
    let y = d3
      .scaleLinear()
      .domain([top_n, 0])
      .range([height - margin.bottom, margin.top]);

    // Set the ticks for the xAxis
    let xAxis = d3
      .axisTop()
      .scale(x)
      .ticks(width > 500 ? 5 : 2)
      .tickSize(-(height - margin.top - margin.bottom))
      .tickFormat((d) => d3.format(',')(d));

    // For an moving x-asis we have to create one where the old data is in it
    let oldXAxis = d3
      .axisTop()
      .scale(oldX)
      .ticks(width > 500 ? 5 : 2)
      .tickSize(-(height - margin.top - margin.bottom))
      .tickFormat((d) => d3.format(',')(d));

    // Set the view for the xAxis
    svgCanvas
      .append('g')
      .attr('class', 'axis xAxis')
      .attr('transform', `translate(20, ${margin.top})`)
      // Start of the animation
      .call(oldXAxis)
      .transition()
      .duration(700)
      .call(xAxis);

    svgCanvas.selectAll('.tick line').classed('origin', (d) => d === 0);

    // Set the view for prev bar
    svgCanvas
      .selectAll('rect.barPrev')
      .data(_itemsOldSorted, (d) => d.name)
      .enter()
      .append('rect')
      .attr('class', 'barPrev')
      .attr('x', x(0) + 1)
      .attr('width', (d) =>
        loaded
          ? x(d.eCommerceData.lastMonthData.totalRevenue) - x(0) - 1
          : x(0) - x(0) - 1
      )
      .attr('y', (d) => y(d.rank) + 5)
      .attr('height', y(1) - y(0) - barPadding)
      .style('fill', '#DCDFF2')
      .style('opacity', '0.5')
      .attr('rx', '8px')
      .attr('ry', '8px');

    // Set the view for the bar
    svgCanvas
      .selectAll('rect.bar')
      .data(_itemsOldSorted, (d) => d.name) // We sort the old items
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', x(0) + 1)
      .attr(
        'width',
        (d) =>
          loaded ? x(d.eCommerceData.totalRevenue) - x(0) - 1 : x(0) - x(0) - 1 // We check  if the items are loaded in.
        // Else we pick a value of 0 to get the begining animation
      )
      .attr('y', (d) => y(d.rank) + 5)
      .attr('height', y(1) - y(0) - barPadding)
      .style('fill', (d) => d.color)
      .attr('rx', '8px')
      .attr('ry', '8px');

    // Here we give start initiaze the starting animation
    if (!loaded) {
      svgCanvas
        .selectAll('rect.bar')
        .transition()
        .duration(800)
        .attr('x', x(0) + 1)
        .attr('width', (d) => x(d.eCommerceData.totalRevenue) - x(0) - 0)
        .attr('y', (d) => y(d.rank) + 5)
        .attr('height', y(1) - y(0) - barPadding)
        .delay(function (d, i) {
          return i * 100;
        });

      svgCanvas
        .selectAll('rect.barPrev')
        .transition()
        .duration(800)
        .attr('x', x(0) + 1)
        .attr(
          'width',
          (d) => x(d.eCommerceData.lastMonthData.totalRevenue) - x(0) - 1
        )
        .attr('y', (d) => y(d.rank) + 5)
        .attr('height', y(1) - y(0) - barPadding)
        .delay(function (d, i) {
          return i * 100;
        });
    } else {
      // Here we give start initiaze the updating animation
      svgCanvas
        .selectAll('rect.bar')
        .data(_itemsSorted, (d) => d.name)
        .transition()
        .duration(700)
        .attr('x', x(0) + 1)
        .attr('width', (d) => x(d.eCommerceData.totalRevenue) - x(0) - 1)
        .attr('y', (d) => y(d.rank) + 5)
        .attr('height', y(1) - y(0) - barPadding);
      svgCanvas
        .selectAll('rect.barPrev')
        .data(_itemsSorted, (d) => d.name)
        .transition()
        .duration(700)
        .attr('x', x(0) + 1)
        .attr(
          'width',
          (d) => x(d.eCommerceData.lastMonthData.totalRevenue) - x(0) - 5
        )
        .attr('y', (d) => y(d.rank) + 5)
        .attr('height', y(1) - y(0) - barPadding);
    }

    // Labels for the bar
    svgCanvas
      .selectAll('text.label')
      .data(_itemsOldSorted, (d) => d.name)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => (d.rank < clientStore.lengthOfArray - 12 ? 12 : 120))
      .style('font-family', 'Poppins')
      .style('fill', (d) =>
        d.rank < clientStore.lengthOfArray - 12
          ? RADIALCOLORS.white
          : RADIALCOLORS.textColor
      )
      .style('font-weight', '600')
      .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
      .style('text-anchor', 'start')
      .style('opacity', loaded ? 1 : '0')
      .html((d) => clientStore.truncateString(d.name));

    // Animations for the labels
    if (!loaded) {
      svgCanvas
        .selectAll('text.label')
        .transition()
        .duration(800)
        .style('opacity', '1')
        .delay(function (d, i) {
          return i * 100;
        });
    } else {
      svgCanvas
        .selectAll('text.label')
        .data(_itemsSorted, (d) => d.name)
        .html((d) => clientStore.truncateString(d.name))
        .transition()
        .duration(700)
        .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
        .style('fill', (d) =>
          d.rank < clientStore.lengthOfArray - 12
            ? RADIALCOLORS.white
            : RADIALCOLORS.textColor
        )
        .attr('x', (d) => (d.rank < clientStore.lengthOfArray - 12 ? 12 : 120));
    }

    // Value for the bar
    svgCanvas
      .selectAll('text.valueLabel')
      .data(_itemsOldSorted, (d) => d.name)
      .enter()
      .append('text')
      .attr('class', 'valueLabel')
      .attr('x', (d) =>
        d.rank < clientStore.lengthOfArray - 12
          ? x(d.eCommerceData.totalRevenue) + 5
          : 250
      )
      .style('font-family', 'Poppins')
      .style('fill', RADIALCOLORS.textColor)
      .style('font-weight', '400')
      .style('opacity', loaded ? 1 : '0')
      .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 - 5)
      .text(
        (d) =>
          `${new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format(d.eCommerceData.totalRevenue)}`
      );

    // Animations for the value labels
    if (!loaded) {
      svgCanvas
        .selectAll('text.valueLabel')
        .transition()
        .duration(800)
        .style('opacity', '1')
        .delay(function (d, i) {
          return i * 100;
        });
    } else {
      svgCanvas
        .selectAll('text.valueLabel')
        .data(_itemsSorted, (d) => d.name)
        .text(
          (d) =>
            `${new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'EUR',
            }).format(d.eCommerceData.totalRevenue)}`
        )
        .transition()
        .duration(700)
        .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 - 5)
        .attr('x', (d) =>
          d.rank < clientStore.lengthOfArray - 12
            ? x(d.eCommerceData.totalRevenue) + 5
            : 250
        );
    }

    // avg for the bar
    svgCanvas
      .selectAll('text.avgLabel')
      .data(_itemsOldSorted, (d) => d.name)
      .enter()
      .append('text')
      .attr('class', 'avgLabel')
      .attr('x', (d) =>
        d.rank < clientStore.lengthOfArray - 12
          ? x(d.eCommerceData.totalRevenue) + 20
          : 260
      )
      .style('font-family', 'Poppins')
      .style('opacity', loaded ? 1 : '0')
      .style('fill', RADIALCOLORS.textColor)
      .style('font-weight', '400')
      .style('font-size', '1.1rem')
      .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 9)
      .text((d) => `${d3.format(',.0f')(d.eCommerceData.averageSell)} AVG`);

    // Animations for the avg labels
    if (!loaded) {
      svgCanvas
        .selectAll('text.avgLabel')
        .transition()
        .duration(800)
        .style('opacity', '1')
        .delay(function (d, i) {
          return i * 100;
        });
    } else {
      svgCanvas
        .selectAll('text.avgLabel')
        .data(_itemsSorted, (d) => d.name)
        .text((d) => `${d3.format(',.0f')(d.eCommerceData.averageSell)} AVG`)
        .transition()
        .duration(700)
        .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 9)
        .attr('x', (d) =>
          d.rank < clientStore.lengthOfArray - 12
            ? x(d.eCommerceData.totalRevenue) + 20
            : 260
        );
    }

    // Stylings
    svgCanvas
      .selectAll('.valueLabel')
      .style('font-size', chartElements.font.fontSize);

    svgCanvas
      .selectAll('.tick')
      .select('text')
      .style('font-family', 'Poppins')
      .style('font-weight', '500')
      .style('font-size', '1.4rem')
      .style('fill', RADIALCOLORS.textColor);

    svgCanvas
      .selectAll('.tick')
      .select('line')
      .style('stroke', chartElements.color.line)
      .style('shape-rendering', 'CrispEdges')
      .style('display', 'none');
    svgCanvas.select('.domain').style('display', 'none');

    svgCanvas
      .selectAll('.label')
      .style('font-weight', chartElements.font.fontWeight);
  };



  // eslint-disable-next-line
  useEffect(() => { graph();  setLoaded(true);},[clientStore.totalEarining]);
  // eslint-disable-next-line
  useEffect(() => {setTimeout(() => { clientStore.loaded = true}, 800); });

  return useObserver(() => (
    <>
      <motion.div
        initial={'exit'}
        variants={earningAnimaton}
        exit="exit"
        animate="start">
        <div id='outer' className={styles.outer}>
          <svg ref={ref} width="640" height={heightCalc}></svg>
        </div>

        <div className={styles.categories}>
          {serverStore.sectorData.map((item) => (
            <div className={styles.item}>
              <div
                className={styles.colour}
                style={{
                  backgroundColor: item.color,
                }}></div>
              <span className="font-sans  ml-2 text-nightBlue">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  ));
};

export default EarningChart;
