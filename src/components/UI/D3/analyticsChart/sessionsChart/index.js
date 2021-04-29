import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { svg } from 'd3';


const AnalyticsChart = ({items}) => {
    
    const ref = useRef();

    const precentageOf = (num, total) => {
        return (num/100) * total;
    };

    const graph = () => {
        const svgCanvas = d3.select(ref.current); 
        svgCanvas.selectAll("g").remove();
        svgCanvas.selectAll("rect").remove();
        svgCanvas.selectAll("path").remove();
        svgCanvas.selectAll("defs").remove();

        const width = 940, 
        height = 322,
        margin= {top: 20, right: 0, bottom: 132, left: 50};
    
        const x = d3.scaleBand().domain(items.map(d => d.name))
        .range([margin.left, width])
        .padding(0.1);

        const y = d3.scaleLinear()
        .domain([0, d3.max(items.map(i => i.analyticsData), (d) => {
            return d.totalSessions
        })])
        .range([margin.top, height - margin.bottom]);

        svgCanvas.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0, ${(margin.top)} )`)
        .call(d3.axisTop(x));

        svgCanvas.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", `translate( ${margin.left}, ${(0)} )`)
        .call(d3.axisLeft().scale(y).ticks(4));
        

        svgCanvas.append('g').append("text").attr('class', 'legendCon')
        .attr('x', 10).attr('y', 220)
        .text('Bouncerate')
        .style('font-size', '11px');

        svgCanvas.append('g').append("text").attr('class', 'legendCon')
        .attr('x', 10).attr('y', 235)
        .text('Total Session')
        .style('font-size', '11px').style('opacity', '0.5');

        svgCanvas.selectAll("rect.bar")
        .data(items)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", '#FF5454')
        .attr("x", (d,i) => {
            return x(d.name);
        })
        .attr("width", x.bandwidth())    
        .attr("y", function(d,i){
            return (margin.top );
         })
        .attr("height", function(d,i){
           return (y(d.analyticsData.totalSessions)-margin.top);
         })
         .style('opacity', 0.5);

         svgCanvas.selectAll("rect.barSecond")
         .data(items)
         .enter()
         .append("rect")
         .attr("class", "barSecond")
         .attr("fill", '#FF5454')
         .attr("x", (d,i) => {
             return x(d.name);
         })
         .attr("width", x.bandwidth())    
         .attr("y", function(d,i){
             return (margin.top );
          })
         .attr("height", function(d,i){
            return (y(precentageOf(d.analyticsData.bouncerate, d.analyticsData.totalSessions))-margin.top);
          })
          .style('opacity', 1);


        svgCanvas.select('.axis--x').selectAll('text')
         .style("display", "none")
        svgCanvas.selectAll('.domain').style("display", "none");
        svgCanvas.selectAll('line').style("display", "none");
        svgCanvas.selectAll('.legendCon').style('fill','#FF5454').style('font-weight','700');
        svgCanvas.selectAll('.tick').select('text').style('fill','#FF5454').style('font-weight','700');
    }

    useEffect(() => graph())
    return (
        <>
            <svg ref={ref} width="940" height="322"></svg>
        </>
    )
}

export default AnalyticsChart;