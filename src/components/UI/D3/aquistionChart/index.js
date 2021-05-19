import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { CHARTS, RADIALCOLORS } from '../../../../consts';
import { useStores } from '../../../../hooks';

const AquistionChart = ({ items }) => {
  const ref = useRef();
  const { clientStore } = useStores();
  const chartSetttings = CHARTS.aquistionChart;
  const [loaded, setLoaded] = useState(false);
  const _items = items.map((a) => ({ ...a }));

  
  const graph = () => {
    const svgCanvas = d3.select(ref.current);
    svgCanvas.selectAll('g').remove();

    svgCanvas.selectAll('rect').remove();
    svgCanvas.selectAll('path').remove();
    svgCanvas.selectAll('defs').remove();

    const width = ref.current.width.baseVal.value;
    const height = ref.current.height.baseVal.value / 1.6;

    // Radius for all circle
    const innerRadius = chartSetttings.innerRadius;
    const outerRadius = Math.min(width, height) * 0.75;
    const g = svgCanvas
      .append('g')
      .attr('transform', `translate( ${width / 2},${height / 1.25} )`);

    const x = d3
      .scaleBand()
      .range([0, 2 * Math.PI])
      .align(0);

    const y = d3.scaleRadial().range([innerRadius, outerRadius]);

    // Array item for
    const arrayItems = ['organic', 'direct', 'social', 'referral', 'paid'];

    // Color axis
    const z = d3.scaleOrdinal().range(chartSetttings.color.zAxis);

    // sorts items high to low
    const itemsSorted = _items
      .slice()
      .sort((a, b) => b.analyticsData.totalUsers - a.analyticsData.totalUsers).slice();

    const _itemsSorted = [...itemsSorted];

    console.log(_items, items)

    _itemsSorted.forEach((d, i) => {
      // Here we create a new obj for the stacked data
      // This can we use for the full data
      let tempObj = {};
      tempObj.name = d.name;
      tempObj.rank = i;
      tempObj.totalUsers = d.analyticsData.totalUsers;
      tempObj.organic = d.analyticsData.aquisition.organic;
      tempObj.direct = d.analyticsData.aquisition.direct;
      tempObj.social = d.analyticsData.aquisition.social;
      tempObj.referral = d.analyticsData.aquisition.referral;
      tempObj.paid = !d.analyticsData.aquisition.paid
        ? 10
        : d.analyticsData.aquisition.paid;
      d.aquisition = tempObj;
    });

    x.domain(
      _itemsSorted.map((d) => {
        return d.name;
      })
    );
    y.domain([
      0,
      d3.max(_itemsSorted, (d) => {
        return d.analyticsData.totalUsers;
      }),
    ]);
    z.domain(_itemsSorted);

    // Here we use the new array item
    const stack = d3.stack().keys(arrayItems);
    // Here we stack the items
    const series = stack(
      _itemsSorted.map((i) => {
        return i.aquisition;
      })
    );

    g.append('g')
      .selectAll('g')
      .data(series)
      .enter()
      .append('g')
      .attr('fill', (d, i) => {
        return z(d.key);
      })
      .selectAll('rect')
      .data((d) => {
        return d;
      })
      .enter()
      .append('path')
      .attr(
        'd',
        d3
          .arc()
          // Here we make a radial stackedbar
          .innerRadius((d) => {
            return y(-1);
          })
          .outerRadius((d) => {
            return y(0);
          })
          .startAngle((d) => {
            return x(d.data.name);
          })
          .endAngle((d) => {
            return x(d.data.name) + x.bandwidth();
          })
          .padAngle(0.01)
          .padRadius(innerRadius)
      );

    if (!loaded) {
      svgCanvas
        .selectAll('path')
        .transition()
        .duration(400)
        .attr(
          'd',
          d3
            .arc()
            // Here we make a radial stackedbar
            .innerRadius((d) => {
              return y(d[0]);
            })
            .outerRadius((d) => {
              return y(d[1]);
            })
            .startAngle((d) => {
              return x(d.data.name);
            })
            .endAngle((d) => {
              return x(d.data.name) + x.bandwidth();
            })
            .padAngle(0.01)
            .padRadius(innerRadius)
        )
        .ease(d3.easeCubicIn)
        .delay(function (d, i) {
          return i * 12;
        });
    }

    if (loaded) {
      svgCanvas
      .selectAll('path')
      .attr(
        'd',
        d3
          .arc()
          // Here we make a radial stackedbar
          .innerRadius((d) => {
            return y(d[0]);
          })
          .outerRadius((d) => {
            return y(d[1]);
          })
          .startAngle((d) => {
            return x(d.data.name);
          })
          .endAngle((d) => {
            return x(d.data.name) + x.bandwidth();
          })
          .padAngle(0.01)
          .padRadius(innerRadius)
      )
    }

    const label = g
      .append('g')
      .selectAll('g')
      .data(_itemsSorted)
      .enter()
      .append('g')
      .attr('text-anchor', 'middle')
      .attr('transform', (d) => {
        return `rotate(  ${
          ((x(d.name) + x.bandwidth() / 2) * 180) / Math.PI - 90
        })translate(${innerRadius}, 0)`;
      });

    label
      .append('text')
      .attr('transform', (d) => {
        return (x(d.name) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) <
          Math.PI
          ? chartSetttings.transforms.textUnder
          : chartSetttings.transforms.textUp;
      })
      .style('font-size', chartSetttings.font.label)
      .style('font-weight', '400')
      .style('font-family', 'Poppins')
      .style('font-size', '1rem')
      .style('opacity', 0)
      .style('fill', RADIALCOLORS.textColor)
      .text((d) => {
        return clientStore.truncateString(d.name);
      })
      .transition()
      .duration(800)
      .style('opacity', 1)
      .ease(d3.easeCubicIn)
      .delay(function (d, i) {
        return i * 5;
      });

    const yAxis = g.append('g').attr('text-anchor', 'end');

    const yTick = yAxis
      .selectAll('g')
      .data(y.ticks(3).slice(1))
      .enter()
      .append('g');

    yTick
      .append('text')
      .attr('x', -6)
      .style('font-size', chartSetttings.font.yAxis)

      .attr('y', (d) => {
        return -y(d);
      })
      .attr('dy', chartSetttings.yTickStyles.text.dy)
      .attr('stroke', '#fff')
      .attr('stroke-width', chartSetttings.yTickStyles.text.strokeWidth)
      .style('font-weight', '600')
      .style('font-size', '1.5rem')
      .style('font-family', 'Poppins')
      .text(y.tickFormat(3, 's'));

    yTick
      .append('text')
      .attr('x', -6)
      .style('font-size', chartSetttings.font.yAxis)
      .attr('y', (d) => {
        return -y(d);
      })
      .attr('dy', chartSetttings.yTickStyles.text.dy)
      .style('font-weight', '600')
      .style('font-size', '1.5rem')
      .style('font-family', 'Poppins')
      .style('fill', RADIALCOLORS.textColor)
      .text(y.tickFormat(3, 's'));

    const legend = g
      .append('g')
      .selectAll('g')
      .data(arrayItems)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        return `translate(-35, ${(i - (arrayItems.length - 1) / 2) * 20})`;
      });

    legend
      .append('rect')
      .attr('y', '-1')
      .attr('rx', 11)
      .attr('ry', 11)
      .attr('width', chartSetttings.legend.width)
      .attr('height', chartSetttings.legend.height)
      .attr('fill', z);

    legend
      .append('text')
      .attr('x', chartSetttings.legend.x)
      .attr('y', chartSetttings.legend.y)
      .attr('dy', chartSetttings.legend.dy)
      .style('font-weight', '500')
      .style('font-size', '1.3rem')
      .style('font-family', 'Poppins')
      .style('fill', RADIALCOLORS.textColor)
      .text((d) => {
        return d;
      });
  };
  // eslint-disable-next-line
  useEffect(() => {  graph();  setLoaded(true);  setLoaded(true);}, [clientStore.totalUsers]);

  return (
    <>
      <svg
        style={{ borderRadius: '50%' }}
        className="shadow-xl bg-white"
        ref={ref}
        width="600"
        height="600"></svg>
    </>
  );
};

export default AquistionChart;
