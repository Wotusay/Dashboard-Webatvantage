import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './conversionChart.module.css'
import { CHARTS } from '../../../../consts ';

const ConversionChart   = ({items}) => {
    // Ref is needed to draw in the graph
    const ref = useRef();
    const chartSetttings = CHARTS.conversionChart
    const graph = () => {
        const svgCanvas = d3.select(ref.current)   
        
        // Removes all prev items 
        svgCanvas.selectAll("g").remove();
        svgCanvas.selectAll("rect").remove();
        svgCanvas.selectAll("path").remove();
        svgCanvas.selectAll("defs").remove();
        
        const margin = chartSetttings.margin,
            width = 1190,
            height = 735
        
        // x-axis
        const x = d3.scaleBand().domain(items.map(d => d.name))
            .range([margin.left, width])
            .padding(0.1);
        
        // y-axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(items.map(i => i.eCommerceData), (d) => {
                return d.conversions
            })])
            .range([height - margin.bottom, margin.top]);
        
        // y-axis for ratio
        const yRate = d3.scaleLinear()
            .domain([0, 0.11])
            .range([height - margin.bottom, margin.top]);
        
        // view for x-axis
        svgCanvas.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0, ${(height-margin.bottom)} )`)
            .call(d3.axisBottom(x));
    
        // view for y-axis
        svgCanvas.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", `translate( ${margin.left} )`)
            .call(d3.axisLeft().scale(y));
    
        // view for ratio-axis
        svgCanvas.append("g")
            .attr("class", "axis axis--yRate")
            .attr("transform", `translate( ${margin.left} )`)
            .call(d3.axisLeft().scale(yRate).ticks(null, "%"));

        // sets the rect views & places it
        svgCanvas.selectAll("rect")
            .data(items)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill", chartSetttings.color.rect)
            .attr("x", (d,i) => {
                return x(d.name);
            })
            .attr("width", x.bandwidth())    
            .attr("y", (height - margin.bottom)) 
            .attr("y", function(d,i){
                return y(d.eCommerceData.conversions);
             })
            .attr("height", function(d,i){
               return (height-y(d.eCommerceData.conversions)) - margin.bottom;
             });
             
        // Makes the line
        const line =  d3.line()
            .x((d,i) => {
                return x(d.name) + x.bandwidth() / 2 ;
            })
            .y((d) => {
                return yRate(d.eCommerceData.conversionRate / 100);
            })
            .curve(d3.curveBasis);

        // Gradient
        const colorRange = chartSetttings.color.lineChart;
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

        // Styling
        svgCanvas.append("path")
            .attr("class", "line")
            .attr("d", line(items))
            .attr("stroke-width", chartSetttings.strokeWidth.path)
            .attr("stroke", "url(#line-gradient)")
            .attr("fill", "none");
        
            d3.select('.axis--x').selectAll('text')
            .attr("transform", chartSetttings.transforms.axisX)
            .style("text-anchor", "end")
            .style("font-size", chartSetttings.font.axisX.fontSize);
        
            d3.select('.axis--yRate').selectAll('text')
            .attr("transform", chartSetttings.transforms.ratio)
            .style('font-size', chartSetttings.font.axisY);

            d3.select('.axis--y').selectAll('text')
            .style("color",chartSetttings.color.rect)
            .style('font-size', chartSetttings.font.axisY);

            d3.select('.axis--y').select('.domain')
            .style("display",'none');

            d3.select('.axis--yRate').select('.domain')
            .style("display",'none');

            d3.select('.axis--yRate').selectAll('line')
            .style("display",'none');

            d3.select('.axis--y').selectAll('line')
            .style("display",'none');

            d3.select('.axis--x').selectAll('line')
            .style("display",'none').style('stroke-width', chartSetttings.strokeWidth.line);

            d3.select('.axis--x').selectAll('.domain')
            .style('stroke-width', chartSetttings.strokeWidth.domain);
    };

    useEffect(() => graph());

    return(
        <>
        <div className={styles.legendeWrapper}>
        <p className={styles.ratio} >Converion Ratio</p>
        <p className={styles.conversions} >Conversions</p>
        </div>
        <svg ref={ref} width="1190" height="735"></svg>
        </>
    )
}

export default ConversionChart;