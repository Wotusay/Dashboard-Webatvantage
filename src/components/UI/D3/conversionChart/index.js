import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { autorun } from 'mobx';

const ConversionChart   = ({items}) => {
    
    const ref = useRef();

    const graph = autorun(() => {
    const svgCanvas = d3.select(ref.current)   

    svgCanvas.selectAll("g").remove();

    svgCanvas.selectAll("rect").remove();
    svgCanvas.selectAll("path").remove();
    svgCanvas.selectAll("defs").remove();

        const margin = {top: 20, right: 30, bottom: 100, left: 40},
        width = 1190,
        height = 735

        const x = d3.scaleBand().domain(items.map(d => d.name))
        .range([margin.left, width])
        .padding(0.1);

        const y = d3.scaleLinear()
                .domain([0, d3.max(items.map(i => i.eCommerceData), (d) => {
                    return d.conversions
                })])
                .range([height - margin.bottom, margin.top]);
       
        const yRate = d3.scaleLinear()
        .domain([0, 0.11])
        .range([height - margin.bottom, margin.top]);

        svgCanvas.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0, ${(height-margin.bottom)} )`)
        .call(d3.axisBottom(x));

        svgCanvas.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", `translate( ${margin.left} )`)
        .call(d3.axisLeft().scale(y));

        svgCanvas.append("g")
        .attr("class", "axis axis--yRate")
        .attr("transform", `translate( ${margin.left} )`)
        .call(d3.axisLeft().scale(yRate).ticks(null, "%"));

        svgCanvas.selectAll("rect")
        .data(items)
        .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill", "rgb(187,187,187)")
            .attr("x", (d,i) => {
                return x(d.name);
            })
            .attr("width", x.bandwidth())    
            .attr("y", (height - margin.bottom)) 
            .attr("y", function(d,i){
                return y(d.eCommerceData.conversions);
             })

             .attr("height", function(d,i){
                return (height-y(d.eCommerceData.conversions))- margin.bottom;
              });
       const line =  d3.line()
        .x((d,i) => {
            return x(d.name) + x.bandwidth() / 2 ;
        })
        .y((d) => {
            return yRate(d.eCommerceData.conversionRate / 100);
        })
        .curve(d3.curveMonotoneX)


        const colorRange = ['#05FF00','#FF9F10', '#FF0202' ]
        const color = d3.scaleLinear().range(colorRange).domain([1, 2, 3]);

        const linearGradient = svgCanvas.append("defs")
            .append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientTransform", "rotate(90)");

        linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", color(1));

        linearGradient.append("stop")
            .attr("offset", "75%")
            .attr("stop-color", color(2));

        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", color(3));

        svgCanvas.append("path")
            .attr("class", "line")
            .attr("d", line(items))
            .attr("stroke-width", 3)
            .attr("stroke", "url(#line-gradient)")
            .attr("fill", "none");

        d3.select('.axis--x').selectAll('text').attr("transform", "translate(-10,10)rotate(-45)")
        .style("text-anchor", "end");

        d3.select('.axis--yRate').selectAll('text').attr("transform", "translate(2,-14)")
        d3.select('.axis--y').selectAll('text').style("color",'rgb(187,187,187)');

    })

    useEffect(() => graph);

    return(
        <>
        <svg ref={ref} width="1190" height="735"></svg>
        </>
    )
}

export default ConversionChart;