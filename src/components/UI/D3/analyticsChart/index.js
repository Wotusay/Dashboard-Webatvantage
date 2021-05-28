import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { CHARTS, RADIALCOLORS } from '../../../../consts';
import { useStores } from '../../../../hooks';
import styles from './analyticsChart.module.css';

const AnalyticsChart = ({ items, oldItems }) => {
  const ref = useRef();
  const chartSetttings = CHARTS.analyticsChart;
  const [loaded, setLoaded] = useState(false); // Here we check if the the item has been loaded in already

  // Berekent het het percentage van een getal
  const precentageOf = (num, total) => {
    return (num / 100) * total;
  };

  const { clientStore } = useStores();
  const widthCalculator = 71.5 * clientStore.lengthOfArray;

  const graph = () => {
    const svgCanvas = d3.select(ref.current);
    // Dit is nodig voor de groepen
    const keys = chartSetttings.groups;

    // Dit verwijderd alle bestaande elementen als er nieuwe data binnen komt
    svgCanvas.selectAll('g').remove();
    svgCanvas.selectAll('rect').remove();
    svgCanvas.selectAll('path').remove();
    svgCanvas.selectAll('defs').remove();

    // Plaast de margins
    const margin = chartSetttings.margin,
      width = ref.current.width.baseVal.value - margin.left - margin.right,
      height = ref.current.height.baseVal.value - margin.top - margin.bottom;

    // Y-axis for views left
    const pageviews = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          items.map((i) => i.analyticsData),
          (d) => {
            return d.pageviews;
          }
        ),
      ])
      .range([height - 10, 0]);

    // old values for the Y-axis for views left
    const oldPageviews = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          oldItems.map((i) => i.analyticsData),
          (d) => {
            return d.pageviews;
          }
        ),
      ])
      .range([height - 10, 0]);

    // Y-axis for sessions right
    const sessions = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          // haalt de maximum waardes
          items.map((i) => i.analyticsData),
          (d) => {
            return d.totalSessions;
          }
        ),
      ])
      .range([height - 10, 0]);

    // old values for the Y-axis for sessions right
    const sessionsOld = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          // haalt de maximum waardes
          oldItems.map((i) => i.analyticsData),
          (d) => {
            return d.totalSessions;
          }
        ),
      ])
      .range([height - 10, 0]);

    // Dit zijn de namen vande waardes
    const x0 = d3
      .scaleBand()
      .rangeRound([margin.left, width - margin.right])
      .paddingInner(0.1);

    // Hier mee bepalen we de groepen
    const x1 = d3.scaleBand().padding(0.2);

    // Hier worden alle namen opgehaald en ingekort
    x0.domain(
      items.map((d) => {
        return clientStore.truncateString(d.name);
      })
    );

    // Hier worden alle groepen ingeladen
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);

    const colorRangeRed = [RADIALCOLORS.red, '#DB2121'];
    const colorRangePurple = [RADIALCOLORS.purple, '#C1A3F9'];
    const colorRed = d3.scaleLinear().range(colorRangeRed).domain([1, 2]);
    const colorPurple = d3.scaleLinear().range(colorRangePurple).domain([1, 2]);
    const linearGradientRed = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'red')
      .attr('gradientTransform', 'rotate(90)');

    linearGradientRed
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorRed(1));

    linearGradientRed
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorRed(2));

    const linearGradientPurple = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'purple')
      .attr('gradientTransform', 'rotate(90)');

    linearGradientPurple
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorPurple(2));

    linearGradientPurple
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorPurple(1));

    svgCanvas
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left},8 )`)
      .call(
        d3
          .axisLeft(oldPageviews)
          .ticks(4)
          .tickSize(-(width - 100))
      )
      .transition()
      .duration(800)
      .call(
        d3
          .axisLeft(pageviews)
          .ticks(4)
          .tickSize(-(width - 100))
      );

    // oproepen van de x-as

    svgCanvas
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0));

    // oproepen van de y-as rechts
    svgCanvas
      .append('g')
      .style('position', 'absolute')
      .attr('class', 'axis--y axis')
      .attr('transform', `translate( ${width - margin.right} )`)
      .call(d3.axisRight(sessionsOld).ticks(4))
      .transition()
      .duration(800)
      .call(d3.axisRight(sessions).ticks(4));

    // Deze bars is voor de totale sessies
    svgCanvas
      .append('g')
      .selectAll('g')
      .data(oldItems) // Here we start with the old items and later end with the newitems
      .enter()
      .append('g')
      .attr('class', 'groupsessions')
      .attr('z-index', 1)
      .attr('transform', (d) => {
        return 'translate(' + x0(clientStore.truncateString(d.name)) + ',0)';
      })
      .selectAll('rect')
      .data((d) => {
        return keys.map(() => {
          return { key: 'sessions', value: d.analyticsData.totalSessions };
        });
      })
      .enter()
      .append('rect')
      .attr('class', 'totalsessions')
      .attr('x', (d) => {
        return x1(d.key);
      })
      .attr('y', (d) => {
        return loaded ? sessions(d.value) : sessions(0); // If its not loaded in we give a value of 0
      })
      .attr('width', x1.bandwidth())
      .attr('height', (d) => {
        return loaded ? height - sessions(d.value) : height - sessions(0); // If its not loaded in we give a value of 0
      })
      .attr('fill', '#F6B4B0')
      .style('opacity', 1)
      .attr('rx', 3)
      .attr('ry', 3);

    if (!loaded) {
      // Animations for the start
      svgCanvas
        .selectAll('.totalsessions')
        .transition()
        .duration(800)
        .attr('y', function (d) {
          return sessions(d.value);
        })
        .attr('height', function (d) {
          return height - sessions(d.value);
        })
        .delay(function (d, i) {
          return i * 50;
        });
    } else {
      // Animations for updates
      svgCanvas
        .selectAll('.groupsessions')
        .data(items)
        .selectAll('.totalsessions')
        .data((d) => {
          return keys.map(() => {
            return { key: 'sessions', value: d.analyticsData.totalSessions };
          });
        })
        .transition()
        .duration(2000)
        .attr('y', function (d) {
          return sessions(d.value);
        })
        .attr('height', function (d) {
          return height - sessions(d.value);
        });
    }
    // Deze bars is voor de percentage van de avg pages per sessies
    svgCanvas
      .append('g')
      .selectAll('g')
      .data(oldItems)
      .enter()
      .append('g')
      .attr('z-index', 1)
      .attr('transform', (d) => {
        return 'translate(' + x0(clientStore.truncateString(d.name)) + ',0)';
      })
      .attr('class', 'avgpagesgroup')
      .selectAll('rect')
      .data((d) => {
        return keys.map(() => {
          return {
            key: 'sessions',
            value: precentageOf(
              d.analyticsData.averagePagesPerSessions,
              d.analyticsData.totalSessions
            ),
          };
        });
      })
      .enter()
      .append('rect')
      .attr('class', 'avgpages')
      .attr('x', (d) => {
        return x1(d.key);
      })
      .attr('y', (d) => {
        return loaded ? sessions(d.value) : sessions(0); // If its not loaded in we give a value of 0
      })
      .attr('width', x1.bandwidth())
      .attr('height', (d) => {
        return loaded ? height - sessions(d.value) : height - sessions(0); // If its not loaded in we give a value of 0
      })
      .style('opacity', 1)
      .attr('fill', 'url(#red)')
      .attr('rx', 3)
      .attr('ry', 3);

    if (!loaded) {
      // Animations for the start
      svgCanvas
        .selectAll('.avgpages')
        .transition()
        .duration(1000)
        .attr('y', function (d) {
          return sessions(d.value);
        })
        .attr('height', function (d) {
          return height - sessions(d.value);
        })
        .delay(function (d, i) {
          return i * 50;
        });
    } else {
      // Animations for updates
      svgCanvas
        .selectAll('.avgpagesgroup')
        .data(items)
        .selectAll('.avgpages')
        .data((d) => {
          return keys.map(() => {
            return {
              key: 'sessions',
              value: precentageOf(
                d.analyticsData.averagePagesPerSessions,
                d.analyticsData.totalSessions
              ),
            };
          });
        })
        .transition()
        .duration(800)
        .attr('y', function (d) {
          return sessions(d.value);
        })
        .attr('height', function (d) {
          return height - sessions(d.value);
        });
    }

    // Dit is voor het totale pageviews te tonen
    svgCanvas
      .append('g')
      .selectAll('g')
      .data(oldItems)
      .enter()
      .append('g')
      .attr('z-index', 1)
      .attr('transform', (d) => {
        return 'translate(' + x0(clientStore.truncateString(d.name)) + ',0)';
      })
      .attr('class', 'pageviewsgroup')
      .selectAll('rect')
      .data((d) => {
        return keys.map(() => {
          return { key: 'views', value: d.analyticsData.pageviews };
        });
      })
      .enter()
      .append('rect')
      .attr('class', 'pageviews')
      .attr('x', (d) => {
        return x1(d.key);
      })
      .attr('y', (d) => {
        return loaded ? pageviews(d.value) : pageviews(0);
      })
      .attr('width', x1.bandwidth())
      .attr('height', (d) => {
        return loaded ? height - pageviews(d.value) : height - pageviews(0);
      })
      .attr('fill', '#CCCAFC')
      .style('opacity', 1)
      .attr('rx', 3)
      .attr('ry', 3);

    if (!loaded) {
      // Animations for the start
      svgCanvas
        .selectAll('.pageviews')
        .transition()
        .duration(800)
        .attr('y', function (d) {
          return pageviews(d.value);
        })
        .attr('height', function (d) {
          return height - pageviews(d.value);
        })
        .delay(function (d, i) {
          return i * 50;
        });
    } else {
      // Animations for updates
      svgCanvas
        .selectAll('.pageviewsgroup')
        .data(items)
        .selectAll('.pageviews')
        .data((d) => {
          return keys.map(() => {
            return { key: 'views', value: d.analyticsData.pageviews };
          });
        })
        .transition()
        .duration(800)
        .attr('y', function (d) {
          return pageviews(d.value);
        })
        .attr('height', function (d) {
          return height - pageviews(d.value);
        });
    }

    // Dit is voor het bounce te tonen die een op de pageviews staat
    svgCanvas
      .append('g')
      .selectAll('g')
      .data(oldItems)
      .enter()
      .append('g')
      .attr('class', 'bouncegroup')
      .attr('z-index', 1)
      .attr('transform', (d) => {
        return 'translate(' + x0(clientStore.truncateString(d.name)) + ',0)';
      })
      .selectAll('rect')
      .data((d) => {
        return keys.map(() => {
          return {
            key: 'views',
            value: precentageOf(
              d.analyticsData.bouncerate,
              d.analyticsData.pageviews
            ),
          };
        });
      })
      .enter()
      .append('rect')
      .attr('class', 'bounce')
      .attr('x', (d) => {
        return x1(d.key);
      })
      .attr('y', (d) => {
        return loaded ? pageviews(d.value) : pageviews(0);
      })
      .attr('width', x1.bandwidth())
      .attr('height', (d) => {
        return loaded ? height - pageviews(d.value) : height - pageviews(0);
      })
      .attr('fill', 'url(#purple)')
      .style('opacity', 1)
      .attr('rx', 3)
      .attr('ry', 3);

    if (!loaded) {
      // Animations for the start
      svgCanvas
        .selectAll('.bounce')
        .transition()
        .duration(800)
        .attr('y', function (d) {
          return pageviews(d.value);
        })
        .attr('height', function (d) {
          return height - pageviews(d.value);
        })
        .delay(function (d, i) {
          return i * 50;
        });
    } else {
      // Animations for updates
      svgCanvas
        .selectAll('.bouncegroup')
        .data(items)
        .selectAll('.bounce')
        .data((d) => {
          return keys.map(() => {
            return {
              key: 'views',
              value: precentageOf(
                d.analyticsData.bouncerate,
                d.analyticsData.pageviews
              ),
            };
          });
        })
        .transition()
        .duration(800)
        .attr('y', function (d) {
          return pageviews(d.value);
        })
        .attr('height', function (d) {
          return height - pageviews(d.value);
        });
    }

    svgCanvas.selectAll('g').select('rect').remove();

    // oproepen van de y-as links

    // Styling van de elementenxss
    svgCanvas
      .select('.axis--x')
      .selectAll('text')
      .attr('transform', chartSetttings.transforms.axisX)
      .style('text-anchor', 'end')
      .style('font-size', chartSetttings.font.axisX.fontSize)
      .style('font-family', 'Poppins')
      .style('color', RADIALCOLORS.textColor)
      .style('font-weight', '600');

    svgCanvas.select('.axis--x').selectAll('line').style('display', 'none');

    svgCanvas.select('.axis--x').selectAll('.domain').remove();

    svgCanvas.selectAll('.domain').remove();
    svgCanvas
      .select('.axis--y')
      .selectAll('.tick')
      .select('line')
      .style('display', 'none');

    svgCanvas
      .select('.y')
      .select('.tick:first-of-type line')
      .style('display', 'none');

    svgCanvas
      .select('.y')
      .selectAll('.tick line')
      .attr('z-index', -1)
      .attr('opacity', '0.2')
      .attr('stroke', RADIALCOLORS.textColor);

    svgCanvas
      .select('.axis--y')
      .selectAll('.tick')
      .select('text')
      .style('fill', RADIALCOLORS.purple)
      .style('font-weight', '600')
      .style('font-family', 'Poppins')
      .style('font-size', '1.5rem');

    svgCanvas
      .select('.y')
      .selectAll('.tick')
      .select('text')
      .style('fill', RADIALCOLORS.red)
      .style('font-weight', '600')
      .style('font-size', '1.5rem')
      .style('font-family', 'Poppins');
  };

  // eslint-disable-next-line
  useEffect(() => {  graph();  setLoaded(true);  setLoaded(true);}, [clientStore.totalViews]);

  useEffect(() => {
    setTimeout(() => {
      clientStore.loaded = true;
    }, 800);
  });



  return (
    <>
      <div className={styles.legendWrapper}>
        <div className={styles.legendItems}>
          <p
            className="font-sans font-semibold text-2xl"
            style={{ color: RADIALCOLORS.red }}>
            Pages per sessions
          </p>
          <p
            className="font-sans text-2xl opacity-50"
            style={{ color: RADIALCOLORS.red }}>
            Total pageviews
          </p>
        </div>
        <div className={styles.legendItemsViews}>
          <p
            className="font-sans font-semibold text-2xl"
            style={{ color: RADIALCOLORS.purple }}>
            Bounce
          </p>
          <p
            className="font-sans text-2xl opacity-50"
            style={{ color: RADIALCOLORS.purple }}>
            Total sessions
          </p>
        </div>
      </div>
      <div id="outer" className={styles.outer}>
        <svg className={styles.test} width={widthCalculator} height="500" ref={ref}></svg>
      </div>
    </>
  );
};

export default AnalyticsChart;
