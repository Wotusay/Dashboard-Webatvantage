import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


const AquistionChart = ({items}) => {

    const ref = useRef();

    const graph = () => {

        const svgCanvas = d3.select("svg");
        svgCanvas.selectAll("g").remove();

        svgCanvas.selectAll("rect").remove();
        svgCanvas.selectAll("path").remove();
        svgCanvas.selectAll("defs").remove();
        
        const width = 606;
        const height = 390;
        const innerRadius = 180;
        const outerRadius = Math.min(width, height) * 0.67;
        const g = svgCanvas.append("g").attr("transform", "translate(" + width / 2 + "," + height * 0.67 + ")");

            const x = d3.scaleBand()
            .range([0, 2 * Math.PI])
            .align(0);
        
            const y =  d3.scaleRadial()
            .range([innerRadius, outerRadius]);

            const arrayItems = ["organic", "direct","social","referral","paid"];

            const z = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            let itemsSorted = items.slice().sort((a,b) => (b.analyticsData.totalUsers - a.analyticsData.totalUsers));
            itemsSorted.forEach((d,i) => {
                let tempObj = {};
                d.rank = i;
                tempObj.name = d.name;
                tempObj.rank = d.rank;
                tempObj.totalUsers = d.analyticsData.totalUsers;
                tempObj.organic = d.analyticsData.aquisition.organic;
                tempObj.direct = d.analyticsData.aquisition.direct;
                tempObj.social = d.analyticsData.aquisition.social;
                tempObj.referral = d.analyticsData.aquisition.referral;
                tempObj.paid = d.analyticsData.aquisition.paid;
                d.analyticsData.aquisition = tempObj;
            });

            x.domain(itemsSorted.map((d) => { return d.name; }));
            y.domain([0, d3.max(itemsSorted, (d) =>  { return d.analyticsData.totalUsers; })]);
            z.domain(itemsSorted);

            const stack = d3.stack()
            .keys(arrayItems);
            const series = stack(itemsSorted.map((i) => {return i.analyticsData.aquisition}));
            console.log(series)

        g.append("g")
          .selectAll("g")
          .data(series)
          .enter().append("g")
            .attr("fill", function(d) { return z(d.key); })
          .selectAll("rect")
          .data(function(d) { return d; })
          .enter().append("path")
          .attr("d", d3.arc()
              .innerRadius(function(d) { return y(d[0]); })
              .outerRadius(function(d) { return y(d[1]); })
              .startAngle(function(d) { return x(d.data.name); })
              .endAngle(function(d) { return x(d.data.name) + x.bandwidth(); })
              .padAngle(0.01)
              .padRadius(innerRadius));

        var label = g.append("g")
              .selectAll("g")
              .data(itemsSorted)
              .enter().append("g")
              .attr("text-anchor", "middle")
              .attr("transform", function(d) { return "rotate(" + ((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)"; });
          
        label.append("line")
            .attr("x2", -5)
            .attr("stroke", "#000");
        
        label.append("text")
            .attr("transform", function(d) { return (x(d.name) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-9)"; })
            .text(function(d) { return d.name; });
    
        const yAxis = g.append("g")
            .attr("text-anchor", "end");
        
        const yTick = yAxis
            .selectAll("g")
            .data(y.ticks(5).slice(1))
            .enter().append("g");
        
         yTick.append("circle")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.2)
            .attr("r", y);

        yTick.append("text")
            .attr("x", -6)
            .attr("y", function(d) { return -y(d); })
            .attr("dy", "0.35em")
            .attr("fill", "none")
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .text(y.tickFormat(3, "s"));

        yTick.append("text")
            .attr("x", -6)
            .attr("y", function(d) { return -y(d); })
            .attr("dy", "0.35em")
            .text(y.tickFormat(3, "s"));
        
        var legend = g.append("g")
            .selectAll("g")
            .data(arrayItems)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(-40," + (i - (arrayItems.length - 1) / 2) * 20 + ")"; });        
          legend.append("rect")
              .attr("width", 18)
              .attr("height", 18)
              .attr("fill", z);
        
          legend.append("text")
              .attr("x", 24)
              .attr("y", 9)
              .attr("dy", "0.35em")
              .text(d => {return d});
              
        console.log(itemsSorted.map(d => {
            return d.analyticsData.aquisition.inIt
        }))

    }

    useEffect(() => graph());
    return (
        <>
        <svg ref={ref} width="606" height="616"></svg>
        </>
    )
}

export default AquistionChart;