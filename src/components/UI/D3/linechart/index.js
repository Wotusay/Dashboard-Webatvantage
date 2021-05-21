import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ item }) => {
  const ref = useRef();

  const graph = () => {
    const svgCanvas = d3.select(ref.current),
      width = ref.current.width.baseVal.value,
      height = ref.current.height.baseVal.value;

    svgCanvas.selectAll('g').remove();
    svgCanvas.selectAll('rect').remove();
    svgCanvas.selectAll('path').remove();
    svgCanvas.selectAll('defs').remove();

    let loadObject = [
      {
        name: 'avg15',
        value: item.load.avg15,
      },

      {
        name: 'avg5',
        value: item.load.avg5,
      },

      {
        name: 'current',
        value: item.load.current,
      },
    ];

    const x = d3
      .scaleBand()
      .range([-30, width + 30])
      .padding(0.5);
    x.domain(
      loadObject.map((d) => {
        return d.name;
      })
    );

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(loadObject, function (d) {
          return parseFloat(d.value) + 1.5;
        }),
      ])
      .range([height, 0]);

    svgCanvas
      .append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', `translate(0,0)`)
      .call(d3.axisLeft().scale(y).ticks(3));

    svgCanvas
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,20)`)
      .call(d3.axisBottom(x));

    svgCanvas
      .append('path')
      .datum(loadObject)
      .attr('fill', 'none')
      .attr(
        'stroke',
        item.status === 'green'
          ? 'url(#status-green)'
          : item.status === 'orange'
          ? 'url(#status-orange)'
          : item.status === 'red'
          ? 'url(#status-red)'
          : 'url(#status-red)'
      )
      .attr('stroke-width', 2.5)
      .attr('transform', 'translate(1,0)')
      .attr(
        'd',
        d3
          .line()
          .x(function (d) {
            return x(d.name) + x.bandwidth() / 2;
          })
          .y(function (d) {
            return y(d.value);
          })
          .curve(d3.curveBasis)
      );

    svgCanvas.selectAll('.axis').style('opacity', 0);
  };

  // eslint-disable-next-line
  useEffect(() => graph(), [item]);
  return (
    <>
      <svg
        className="bg-lightBlue-default rounded-sm"
        ref={ref}
        width="69"
        height="21"></svg>
    </>
  );
};

export default LineChart;
