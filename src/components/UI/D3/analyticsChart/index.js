import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { CHARTS } from '../../../../consts ';
import { useStores } from '../../../../hooks';

const AnalyticsChart = ({ items }) => {
  const ref = useRef();
  const chartSetttings = CHARTS.analyticsChart;
  const precentageOf = (num, total) => {
    return (num / 100) * total;
  };
  const { clientStore } = useStores();

  const graph = () => {
    const svgCanvas = d3.select(ref.current);

    // Dit verwijderd alle bestaande elementen als er nieuwe data inkomt
    svgCanvas.selectAll('g').remove();
    svgCanvas.selectAll('rect').remove();
    svgCanvas.selectAll('path').remove();
    svgCanvas.selectAll('defs').remove();

    const margin = chartSetttings.margin,
      width = ref.current.width.baseVal.value - margin.left - margin.right,
      height = ref.current.height.baseVal.value - margin.top - margin.bottom;

    // Y-axis for views
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
      .range([height, 0]);

    // Y-axis for sessions
    const sessions = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          items.map((i) => i.analyticsData),
          (d) => {
            return d.totalSessions;
          }
        ),
      ])
      .range([height, 0]);

    const keys = ['sessions', 'views'];

    const x0 = d3
      .scaleBand()
      .rangeRound([margin.left, width - margin.right])
      .paddingInner(0.1);
    const x1 = d3.scaleBand().padding(0.2);

    x0.domain(
      items.map((d) => {
        return clientStore.truncateString(d.name);
      })
    );
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);

    svgCanvas
      .append('g')
      .selectAll('g')
      .data(items)
      .enter()
      .append('g')
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
      .attr('x', (d) => {
        return x1(d.key);
      })
      .attr('y', (d) => {
        return sessions(d.value);
      })
      .attr('width', x1.bandwidth())
      .attr('height', (d) => {
        return height - sessions(d.value);
      })
      .attr('fill', 'red')
      .style('opacity', 0.3);

    svgCanvas
      .append('g')
      .selectAll('g')
      .data(items)
      .enter()
      .append('g')
      .attr('transform', (d) => {
        return 'translate(' + x0(clientStore.truncateString(d.name)) + ',0)';
      })
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
      .attr('x', (d) => {
        return x1(d.key);
      })
      .attr('y', (d) => {
        return sessions(d.value);
      })
      .attr('width', x1.bandwidth())
      .attr('height', (d) => {
        return height - sessions(d.value);
      })
      .attr('fill', 'red')
      .style('opacity', 1);

    svgCanvas
      .append('g')
      .selectAll('g')
      .data(items)
      .enter()
      .append('g')
      .attr('transform', (d) => {
        return 'translate(' + x0(clientStore.truncateString(d.name)) + ',0)';
      })
      .selectAll('rect')
      .data((d) => {
        return keys.map(() => {
          return { key: 'views', value: d.analyticsData.pageviews };
        });
      })
      .enter()
      .append('rect')
      .attr('x', (d) => {
        return x1(d.key);
      })
      .attr('y', (d) => {
        return pageviews(d.value);
      })
      .attr('width', x1.bandwidth())
      .attr('height', (d) => {
        return height - pageviews(d.value);
      })
      .attr('fill', 'blue')
      .style('opacity', 0.3);

    svgCanvas
      .append('g')
      .selectAll('g')
      .data(items)
      .enter()
      .append('g')
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
      .attr('x', (d) => {
        return x1(d.key);
      })
      .attr('y', (d) => {
        return pageviews(d.value);
      })
      .attr('width', x1.bandwidth())
      .attr('height', (d) => {
        return height - pageviews(d.value);
      })
      .attr('fill', 'blue')
      .style('opacity', 1);

    svgCanvas
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left} )`)
      .call(d3.axisLeft().scale(pageviews).ticks(4));

    svgCanvas
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0));

    svgCanvas
      .append('g')
      .attr('class', 'axis--y axis')
      .attr('transform', `translate( ${width - margin.right} )`)
      .call(d3.axisRight().scale(sessions).ticks(4));

    svgCanvas
      .select('.axis--x')
      .selectAll('text')
      .attr('transform', chartSetttings.transforms.axisX)
      .style('text-anchor', 'end')
      .style('font-size', chartSetttings.font.axisX.fontSize);

    svgCanvas.select('.axis--x').selectAll('line');

    svgCanvas
      .select('.axis--x')
      .selectAll('.domain')
      .style('display', 'none')
      .style('stroke-width', chartSetttings.strokeWidth.domain);

    svgCanvas.selectAll('.domain').style('display', 'none');
    svgCanvas.selectAll('line').style('display', 'none');

    svgCanvas
      .select('.axis--y')
      .selectAll('.tick')
      .select('text')
      .style('fill', 'blue')
      .style('font-weight', '700');

    svgCanvas
      .select('.y')
      .selectAll('.tick')
      .select('text')
      .style('fill', 'red')
      .style('font-weight', '700');
  };

  useEffect(() => graph());
  return (
    <>
      <svg width="1100" height="735" ref={ref}></svg>
    </>
  );
};

export default AnalyticsChart;
