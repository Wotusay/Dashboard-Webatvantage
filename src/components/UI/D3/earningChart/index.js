import { autorun } from 'mobx';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { svg } from 'd3';

const EarningChart = ({items}) => {
    const ref = useRef();

    const graph = autorun(() => {
        const svgCanvas = d3.select(ref.current);
        const tickDuration = 500;
        const top_n = 12;

        svgCanvas.selectAll('text').remove();
        svgCanvas.selectAll('g').remove();
        svgCanvas.selectAll('rect').remove();

        const margin = {top: 80, right: 0, bottom: 5, left: 0},
        width = 640,
        height = 618

        let barPadding = (height - (margin.bottom+margin.top)) / (top_n*5); 

        let title = svgCanvas.append('text')
        .attr('class', 'title')
        .attr('y', '24')
        .html('All earnings for the webshops');
        let itemsSorted = items.slice().sort((a,b) => (b.eCommerceData.totalRevenue - a.eCommerceData.totalRevenue)).slice(0, top_n);

        itemsSorted.forEach((d,i) => {
            d.rank = i;
            d.colour = d.category === 'Medisch' ? '#F1DEA0' : d.category === 'Fashion' ? '#CAB1C5' : d.category === 'Schoenen' ? '#ACC39F' : '#ACC39F';
        });

        let x = d3.scaleLinear()
        .domain([0, d3.max(itemsSorted, d => d.eCommerceData.totalRevenue)])
        .range([margin.left, width - margin.right - 65]);
        
        let y = d3.scaleLinear()
        .domain([ top_n,0 ])
        .range([height-margin.bottom, margin.top]);


        let xAxis = d3.axisTop()
        .scale(x)
        .ticks(width > 500 ? 5:2)
        .tickSize(-(height-margin.top-margin.bottom))
        .tickFormat(d => d3.format(',')(d));

        svgCanvas.append('g')
        .attr('class', 'axis xAxis')
        .attr('transform', `translate(20, ${margin.top})`)
        .call(xAxis)
        .selectAll('.tick line')
        .classed('origin', d => d === 0);


        svgCanvas.selectAll('rect.bar')
        .data(itemsSorted, d => d.name)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', x(0)+1)
        .attr('width', d => x(d.eCommerceData.totalRevenue)-x(0)-1)
        .attr('y', d => y(d.rank)+5)
        .attr('height', y(1)-y(0)-barPadding)
        .style('fill', d => d.colour);

        svgCanvas.selectAll('text.label')
        .data(itemsSorted, d => d.name)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.eCommerceData.totalRevenue)-4)
        .attr('y', d => y(d.rank)+5+((y(1)-y(0))/2)+1)
        .style('text-anchor', 'end')
        .html(d => d.name);


        svgCanvas.selectAll('text.valueLabel')
        .data(itemsSorted, d => d.name)
        .enter()
        .append('text')
        .attr('class', 'valueLabel')
        .attr('x', d => x(d.eCommerceData.totalRevenue)+5)
        .attr('y', d => y(d.rank)+5+((y(1)-y(0))/2)+1)
        .text(d => d3.format(',.0f')(d.eCommerceData.totalRevenue));
    });

    useEffect(() => graph);
    return (
        <>
        <svg ref={ref} width="640" height="618"></svg>
        </>
    )

}

export default EarningChart;