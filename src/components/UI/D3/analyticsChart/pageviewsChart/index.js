import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './pageviewsChart.module.css';

const PageviewsChart = ({items}) => {

    const ref = useRef();

    const precentageOf = (num, total) => {
        return (num/100) * total;
    };

    useEffect(() => {
        const svgCanvas = d3.select(ref.current); 
        svgCanvas.selectAll("g").remove();
        svgCanvas.selectAll("rect").remove();
        svgCanvas.selectAll("path").remove();
        svgCanvas.selectAll("defs").remove();

        const width = 940, 
        height = 350,
        margin= {top: 20, right: 0, bottom: 160, left: 50};

        const x = d3.scaleBand().domain(items.map(d => d.name))
            .range([margin.left, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(items.map(i => i.analyticsData), (d) => {
                return d.pageviews;
            })])
            .range([height - margin.bottom, margin.top]);

            svgCanvas.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0, ${(height-margin.bottom)} )`)
            .call(d3.axisBottom(x));

            svgCanvas.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", `translate( ${margin.left} )`)
            .call(d3.axisLeft().scale(y).ticks(4));

            svgCanvas.selectAll("rect.bar")
            .data(items)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill", '#bbb')
            .attr("x", (d,i) => {
                return x(d.name);
            })
            .attr("width", x.bandwidth())    
            .attr("y", (height - margin.bottom)) 
            .attr("y", function(d,i){
                return y(d.analyticsData.pageviews);
             })
            .attr("height", function(d,i){
               return (height-y(d.analyticsData.pageviews)) - margin.bottom;
             }).style("opacity", 0.5);


            svgCanvas.selectAll("rect.barTwo")
             .data(items)
             .enter()
             .append("rect")
             .attr("class", "barTwo")
             .attr("fill", '#bbb')
             .attr("x", (d,i) => {
                 return x(d.name);
             })
             .attr("width", x.bandwidth())    
             .attr("y", (height - margin.bottom)) 
             .attr("y", function(d,i){
                 return y(precentageOf(d.analyticsData.averagePagesPerSessions,d.analyticsData.pageviews));
              })
             .attr("height", function(d,i){
                return (height-y(precentageOf(d.analyticsData.averagePagesPerSessions,d.analyticsData.pageviews))) - margin.bottom;
              }).style("opacity", 1);

            svgCanvas.select('.axis--x').selectAll('text')
            .attr("transform", 'translate(-13,90)rotate(-90)')
            .style("text-anchor", "center")
            .style("font-size", '1.2rem');
            
            svgCanvas.selectAll('.domain').style("display", "none");
            svgCanvas.selectAll('line').style("display", "none");
            svgCanvas.select('.axis--y').selectAll('.tick').select('text').style('fill','#bbb').style('font-weight','700');
            svgCanvas.select('.axis--x').selectAll('.tick').select('text').style('font-weight','400');
    })

    return (
        <>
            <div>
                <div className={styles.legendWrapper}>
                    <p className={styles.legendItemViews}>Total pageviews</p>
                    <p className={styles.legendItemSession}>Average Pages per session</p>
                </div>
                <svg ref={ref} width="940" height="350" ></svg>
            </div>    

        </>
    )
}

export default PageviewsChart;