import * as d3 from 'd3';
import { useObserver } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { CATEGORIES, CHARTS, RADIALCOLORS } from '../../../../consts';
import { useStores } from '../../../../hooks';
import styles from './earningChart.module.css';

const EarningChart = ({ items }) => {
  // Ref is needed to draw in the graph
  const ref = useRef();
  const chartElements = CHARTS.earningChart;
  const { clientStore } = useStores();

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
    const colorMedic = d3.scaleLinear().range(colorRangeMedic).domain([1, 2]);
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

    const margin = chartElements.margin,
      width = ref.current.width.baseVal.value,
      height = heightCalc;

    let barPadding = (height - (margin.bottom + margin.top)) / (top_n * 5);
    // Sorts the items form big to small
    let itemsSorted = items
      .slice()
      .sort(
        (a, b) => b.eCommerceData.totalRevenue - a.eCommerceData.totalRevenue
      )
      .slice(0, top_n);

    itemsSorted.forEach((d, i) => {
      d.rank = i; // Adds a rank to the obj
      // Makes sets th colour for the right category
      d.colour =
        d.category === CATEGORIES.medic
          ? 'url(#medic)'
          : d.category === CATEGORIES.fashion
          ? 'url(#fashion)'
          : d.category === CATEGORIES.shoes
          ? 'url(#shoes)'
          : '#ACC39F';
    });

    // X - Axis
    let x = d3
      .scaleLinear()
      .domain([0, d3.max(itemsSorted, (d) => d.eCommerceData.totalRevenue)])
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

    // Set the view for the xAxis
    svgCanvas
      .append('g')
      .attr('class', 'axis xAxis')
      .attr('transform', `translate(20, ${margin.top})`)
      .call(xAxis)
      .selectAll('.tick line')
      .classed('origin', (d) => d === 0);

    // Set the view for prev bar
    svgCanvas
      .selectAll('rect.barPrev')
      .data(itemsSorted, (d) => d.name)
      .enter()
      .append('rect')
      .attr('class', 'barPrev')
      .attr('x', x(0) + 1)
      .attr(
        'width',
        (d) => x(d.eCommerceData.lastMonthData.totalRevenue) - x(0) - 1
      )
      .attr('y', (d) => y(d.rank) + 5)
      .attr('height', y(1) - y(0) - barPadding)
      .style('fill', '#DCDFF2')
      .style('opacity', '0.5')
      .attr('rx', '0.8rem')
      .attr('ry', '0.8rem');

    // Set the view for the bar
    svgCanvas
      .selectAll('rect.bar')
      .data(itemsSorted, (d) => d.name)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', x(0) + 1)
      .attr('width', (d) => x(d.eCommerceData.totalRevenue) - x(0) - 1)
      .attr('y', (d) => y(d.rank) + 5)
      .attr('height', y(1) - y(0) - barPadding)
      .style('fill', (d) => d.colour)
      .attr('rx', '0.8rem')
      .attr('ry', '0.8rem');

    // Labels for the bar
    svgCanvas
      .selectAll('text.label')
      .data(itemsSorted, (d) => d.name)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => (d.rank < clientStore.lengthOfArray - 9 ? 12 : 120))
      .style('font-family', 'Poppins')
      .style('fill', (d) =>
        d.rank < clientStore.lengthOfArray - 9
          ? RADIALCOLORS.white
          : RADIALCOLORS.textColor
      )
      .style('font-weight', '600')
      .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
      .style('text-anchor', 'start')
      .html((d) => clientStore.truncateString(d.name));

    // Value for the bar
    svgCanvas
      .selectAll('text.valueLabel')
      .data(itemsSorted, (d) => d.name)
      .enter()
      .append('text')
      .attr('class', 'valueLabel')
      .attr('x', (d) =>
        d.rank < clientStore.lengthOfArray - 9
          ? x(d.eCommerceData.totalRevenue) + 5
          : 250
      )
      .style('font-family', 'Poppins')
      .style('fill', RADIALCOLORS.textColor)
      .style('font-weight', '400')
      .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 - 5)
      .text((d) => `${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(d.eCommerceData.totalRevenue)}`);

    // avg for the bar
    svgCanvas
      .selectAll('text.avgLabel')
      .data(itemsSorted, (d) => d.name)
      .enter()
      .append('text')
      .attr('class', 'avgLabel')
      .attr('x', (d) =>
        d.rank < clientStore.lengthOfArray - 9
          ? x(d.eCommerceData.totalRevenue) + 20
          : 260
      )
      .style('font-family', 'Poppins')
      .style('fill', RADIALCOLORS.textColor)
      .style('font-weight', '400')
      .style('font-size', '1.1rem')
      .attr('y', (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 9)
      .text((d) => `${d3.format(',.0f')(d.eCommerceData.averageSell)} AVG`);

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

  useEffect(() => graph());
  return useObserver(() => (
    <>
      <div>
        <div className={styles.outer}>
          <svg ref={ref} width="640" height={heightCalc}></svg>
        </div>

        <div className="flex justify-evenly">
          <div className={styles.item}>
            <div
              className={styles.colour}
              style={{
                backgroundColor: CATEGORIES.colors.medic,
              }}></div>
            <span className="font-sans  ml-2 text-nightBlue">
              {CATEGORIES.medic}
            </span>
          </div>

          <div className={styles.item}>
            <div
              className={styles.colour}
              style={{
                backgroundColor: CATEGORIES.colors.fashion,
              }}></div>
            <span className="font-sans ml-2 text-nightBlue">
              {CATEGORIES.fashion}
            </span>
          </div>

          <div className={styles.item}>
            <div
              className={styles.colour}
              style={{
                backgroundColor: CATEGORIES.colors.shoes,
              }}></div>
            <span className="font-sans ml-2 text-nightBlue">
              {CATEGORIES.shoes}
            </span>
          </div>
        </div>
      </div>
    </>
  ));
};

export default EarningChart;
