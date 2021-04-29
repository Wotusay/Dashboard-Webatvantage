import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { CHARTS } from '../../../../consts ';


const AquistionChart = ({items}) => {

    const ref = useRef();

    const chartSetttings = CHARTS.aquistionChart;

    const graph = () => {

        const svgCanvas = d3.select(ref.current);
        svgCanvas.selectAll("g").remove();

        svgCanvas.selectAll("rect").remove();
        svgCanvas.selectAll("path").remove();
        svgCanvas.selectAll("defs").remove();
        
        const width = 606;
        const height = 390;
    
        // Radius for all circle
        const innerRadius = chartSetttings.innerRadius;
        const outerRadius = Math.min(width, height) * 0.67;
        const g = svgCanvas.append("g").attr("transform", `translate( ${width / 2},${height * 0.67} )`);

        const x = d3.scaleBand()
            .range([0, 2 * Math.PI])
            .align(0);
        
        const y = d3.scaleRadial()
            .range([innerRadius, outerRadius]);

        // Array item for 
        const arrayItems = ["organic", "direct","social","referral","paid"];
        
        // Color axis
        const z = d3.scaleOrdinal()
            .range(chartSetttings.color.zAxis);

        // sorts items high to low
        let itemsSorted = items.slice().sort((a,b) => (b.analyticsData.totalUsers - a.analyticsData.totalUsers));
            itemsSorted.forEach((d,i) => {
                // Here we create a new obj for the stacked data
                // This can we use for the full data 
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

        // Here we use the new array item
        const stack = d3.stack()
            .keys(arrayItems);

        // Here we stack the items 
        const series = stack(itemsSorted.map((i) => {return i.analyticsData.aquisition}));

        g.append("g")
          .selectAll("g")
          .data(series)
          .enter().append("g")
            .attr("fill", (d) => { return z(d.key); })
          .selectAll("rect")
          .data((d) => { return d; })
          .enter().append("path")
          .attr("d", d3.arc()
            // Here we make a radial stackedbar
            .innerRadius((d) => { return y(d[0]); })
            .outerRadius((d) => { return y(d[1]); })
            .startAngle((d) => { return x(d.data.name); })
            .endAngle((d) => { return x(d.data.name) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius));

        const label = g.append("g")
            .selectAll("g")
            .data(itemsSorted)
            .enter().append("g")
            .attr("text-anchor", "middle")
            .attr("transform", (d) => { return `rotate(  ${((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90)})translate(${innerRadius}, 0)`; });
          
        label.append("line")
            .attr("x2", -5)
            .attr("stroke", chartSetttings.color.line);
        
        label.append("text")
            .attr("transform", (d) => { 
                return (x(d.name) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? 
                    chartSetttings.transforms.textUnder : 
                    chartSetttings.transforms.textUp; })
            .style('font-size', chartSetttings.font.label )
            .text((d) => { return d.name; });
    
        const yAxis = g.append("g")
            .attr("text-anchor", "end");
        
        const yTick = yAxis
            .selectAll("g")
            .data(y.ticks(5).slice(1))
            .enter().append("g");
            
        
        yTick.append("circle")
            .attr("fill", "none")
            .attr("stroke", chartSetttings.color.circleColor)
            .attr("stroke-opacity", chartSetttings.yTickStyles.circleOpacity)
            .attr("r", y);

        yTick.append("text")
            .attr("x", -6)
            .style('font-size', chartSetttings.font.yAxis)
            .attr("y", (d) => { return -y(d); })
            .attr("dy",  chartSetttings.yTickStyles.text.dy)
            .attr("fill", "none")
            .attr("stroke", chartSetttings.color.strokeLegend)
            .attr("stroke-width",chartSetttings.yTickStyles.text.strokeWidth )
            .text(y.tickFormat(3, "s"));

        yTick.append("text")
            .attr("x", -6)
            .style('font-size', chartSetttings.font.yAxis)
            .attr("y", (d) => { return -y(d); })
            .attr("dy", chartSetttings.yTickStyles.text.dy)
            .text(y.tickFormat(3, "s"));
        
        const legend = g.append("g")
            .selectAll("g")
            .data(arrayItems)
            .enter().append("g")
            .attr("transform", (d, i) => { return `translate(-35, ${(i - (arrayItems.length - 1) / 2) * 20})`; });

        legend.append("rect")
            .attr("width", chartSetttings.legend.width)
            .attr("height",chartSetttings.legend.height)
            .attr("fill", z);
            
        legend.append("text")
            .attr("x", chartSetttings.legend.x)
            .attr("y", chartSetttings.legend.y)
            .attr("dy", chartSetttings.legend.dy)
            .style('font-size', chartSetttings.font.legend)
            .text(d => {return d});
    }

    useEffect(() => graph());
    return (
        <>
        <svg ref={ref} width="606" height="616"></svg>
        </>
    )
}

export default AquistionChart;