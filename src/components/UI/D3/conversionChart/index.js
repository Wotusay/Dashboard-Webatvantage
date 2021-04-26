import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useStores } from '../../../../hooks';

const ConversionChart   = () => {
    const ref = useRef();
    const {eCommerceStore} = useStores();

    const data = [{
        "name": "A"
    },{
        "name": "Ab"
    },{
        "name": "Ac"
    },{
        "name": "Af"
    },{
        "name": "Ag"
    },{
        "name": "Ar"
    },{
        "name": "Am"
    },{
        "name": "Ap"
    },{
        "name": "Ag"
    },{
        "name": "Aa"
    },{
        "name": "As"
    },{
        "name": "Asg"
    }]

    useEffect(() => {
        const svgCanvas = d3.select(ref.current)   
        const margin = {top: 20, right: 30, bottom: 35, left: 40},
        width = 960,
        height = 500

        const x = d3.scalePoint().domain(data.map(d => d.name))
        .range([margin.left, width-margin.right]);

        const y = d3.scaleLinear()
                .domain([0, 0.1])
                .range([height - margin.bottom, margin.top]);
       
        const xAxis = d3.axisBottom(x);

        svgCanvas.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0, ${(height-margin.bottom)} )`)
        .call(xAxis);

        svgCanvas.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", `translate( ${margin.left} )`)
        .call(d3.axisLeft(y).ticks(null, "%"));


        d3.select('.axis--x').selectAll('text').attr("transform", "translate(-10,10)rotate(-45)")
        .style("text-anchor", "end");
        


    },[]);

    return(
        <>
        <svg ref={ref} width="960" height="500"></svg>
        </>
    )
}

export default ConversionChart;