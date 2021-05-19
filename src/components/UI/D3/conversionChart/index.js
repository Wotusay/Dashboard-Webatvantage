import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styles from './conversionChart.module.css';
import { CHARTS, RADIALCOLORS } from '../../../../consts';
import { useStores } from '../../../../hooks';

const ConversionChart = ({ items, oldItems }) => {
  const { clientStore } = useStores();
  // Ref is needed to draw in the graph
  const ref = useRef();
  const [loaded, setLoaded] = useState(false);


  const widthCalc = 61.5 * clientStore.lengthOfArray; // Calculates the width for the graphh
  const chartSetttings = CHARTS.conversionChart;
  const graph = async () => {
    const svgCanvas = d3.select(ref.current);
    // Removes all prev items
    svgCanvas.selectAll('g').remove();
    svgCanvas.selectAll('rect').remove();
    svgCanvas.selectAll('path').remove();
    svgCanvas.selectAll('defs').remove();

    const margin = chartSetttings.margin,
      width = ref.current.width.baseVal.value,
      height = ref.current.height.baseVal.value;

    // x-axis
    const x = d3
      .scaleBand()
      .domain(items.map((d) => clientStore.truncateString(d.name)))
      .range([margin.left, width])
      .padding(0.1);
    // y-axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          items.map((i) => i.eCommerceData),
          (d) => {
            return d.conversions;
          }
        ),
      ])
      .range([height - margin.bottom, margin.top]);

    // y-axis for ratio
    const yRate = d3
      .scaleLinear()
      .domain([0, 0.11])
      .range([height - margin.bottom, margin.top]);

    // view for x-axis
    svgCanvas
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height - margin.bottom} )`)
      .call(d3.axisBottom(x));

    // view for y-axis
    svgCanvas
      .append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', `translate( ${margin.left} )`)
      .call(d3.axisLeft().scale(y).ticks(3));

    // view for ratio-axis
    svgCanvas
      .append('g')
      .attr('class', 'axis axis--yRate')
      .attr('transform', `translate( ${margin.left} )`)
      .call(d3.axisLeft().scale(yRate).ticks(3, '%'));

    // sets the rect views & places it


    // Makes the line
    const line = d3
      .line()
      .x((d, i) => {
        return x(clientStore.truncateString(d.name)) + x.bandwidth() / 2;
      })
      .y((d) => {
        return yRate(d.eCommerceData.conversionRate / 100);
      })
      .curve(d3.curveBasis);

      svgCanvas
      .selectAll('rect')
      .data(oldItems)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', chartSetttings.color.rect)
      .attr('x', (d, i) => {
        console.log(d)
        return x(clientStore.truncateString(d.name));
      })
      .attr('width', x.bandwidth())
      .attr('y', height - margin.bottom)
      .attr('y', function (d, i) {
        return loaded ?( y(d.eCommerceData.conversions)) :(y(0));
      })
      .attr('height', function (d, i) {
        return loaded ? (height - y(d.eCommerceData.conversions) - margin.bottom) :(height - y(0) - margin.bottom);
      })
      .attr('rx', 3)
      .attr('ry', 3);

    if (!loaded) {
      svgCanvas
        .selectAll('rect')
        .transition()
        .duration(800)
        .attr('y', function (d) {
          return y(d.eCommerceData.conversions);
        })
        .attr('height', function (d) {
          return height - y(d.eCommerceData.conversions) - margin.bottom;
        })
        .delay(function (d, i) {
          return i * 100;
        });
    }
    else {
      svgCanvas
        .selectAll('rect')
        .data(items)
        .transition()
        .duration(800)
        .attr('y', function (d) {
          return y(d.eCommerceData.conversions);
        })
        .attr('height', function (d) {
          return height - y(d.eCommerceData.conversions) - margin.bottom;
        })

    }
    // Gradient
    const colorRange = chartSetttings.color.lineChart;
    const color = d3.scaleLinear().range(colorRange).domain([1, 2, 3]);

    const linearGradient = svgCanvas
      .append('defs')
      .append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientTransform', 'rotate(90)');

    linearGradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', color(1));

    linearGradient
      .append('stop')
      .attr('offset', '75%')
      .attr('stop-color', color(2));

    linearGradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', color(3));

    // Styling
    const lineDraw = svgCanvas
      .append('path')
      .attr('class', 'line')
      .attr('stroke-width', chartSetttings.strokeWidth.path)
      .attr('stroke', 'url(#line-gradient)')
      .attr('d', line(items))
      .attr('fill', 'none');

    if (!loaded) {
    let totalLength = lineDraw.node().getTotalLength();
    lineDraw
      .attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2500)
      .ease(d3.easeCubicIn)
      .attr('stroke-dashoffset', 0);
    }
    else {
      let totalLength = lineDraw.node().getTotalLength();
      lineDraw
        .attr('stroke-dasharray', totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1000)
        .ease(d3.easeCubicIn)
        .attr('stroke-dashoffset', 0);
    }

    svgCanvas
      .select('.axis--x')
      .selectAll('text')
      .attr('transform', chartSetttings.transforms.axisX)
      .style('text-anchor', 'end')
      .style('font-size', chartSetttings.font.axisX.fontSize)
      .style('font-family', 'Poppins')
      .style('color', RADIALCOLORS.textColor)
      .style('font-weight', '600');

    svgCanvas
      .select('.axis--yRate')
      .selectAll('text')
      .attr('transform', chartSetttings.transforms.ratio)
      .style('font-size', chartSetttings.font.axisY)
      .style('font-family', 'Poppins')
      .style('color', RADIALCOLORS.textColor)
      .style('font-weight', '600')
      .style('font-size', '1.3rem');

    svgCanvas
      .select('.axis--y')
      .selectAll('text')
      .style('color', chartSetttings.color.rect)
      .style('font-size', '1.3rem')
      .style('font-family', 'Poppins')
      .style('font-weight', '600');

    svgCanvas.select('.axis--y').select('.domain').style('display', 'none');

    svgCanvas.select('.axis--yRate').select('.domain').style('display', 'none');

    svgCanvas.select('.axis--yRate').selectAll('line').style('display', 'none');

    svgCanvas.select('.axis--y').selectAll('line').style('display', 'none');

    svgCanvas
      .select('.axis--x')
      .selectAll('line')
      .style('display', 'none')
      .style('stroke-width', chartSetttings.strokeWidth.line);

    svgCanvas.select('.axis--x').select('.domain').style('display', 'none');

    svgCanvas
      .select('.axis--x')
      .selectAll('.domain')
      .style('stroke-width', chartSetttings.strokeWidth.domain);
  };

  // eslint-disable-next-line
  useEffect(() => { graph();  setLoaded(true);}, [clientStore.totalEarining]);

  return (
    <>
      <div className={styles.legendeWrapper}>
        <p className="font-sans text-nightBlue font-semibold">
          Conversion Ratio
        </p>
        <p className="font-sans text-lightBlue-rect">Conversions</p>
      </div>
      <div className={styles.outer}>
        <svg ref={ref} width={widthCalc} height="500"></svg>
      </div>
    </>
  );
};

export default ConversionChart;