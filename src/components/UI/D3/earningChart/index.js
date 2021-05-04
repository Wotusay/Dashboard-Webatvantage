import * as d3 from "d3";
import { useObserver } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { CATEGORIES, CHARTS } from "../../../../consts ";
import { useStores } from "../../../../hooks";
import styles from "./earningChart.module.css";

const EarningChart = ({ items }) => {
  // Ref is needed to draw in the graph
  const ref = useRef();
  const chartElements = CHARTS.earningChart;
  const { clientStore } = useStores();

  const heightCalc = 41.5 * clientStore.lengthOfArray; // Calculates the height for the graphh

  const graph = () => {
    const svgCanvas = d3.select(ref.current);
    const top_n = clientStore.lengthOfArray; // How many items there needs to be in it

    // Removes all prev items
    svgCanvas.selectAll("text").remove();
    svgCanvas.selectAll("g").remove();
    svgCanvas.selectAll("rect").remove();

    const margin = chartElements.margin,
      width = ref.current.width.baseVal.value,
      height = heightCalc;

    let barPadding = (height - (margin.bottom + margin.top)) / (top_n * 5);
    // Sorts the items form big to small
    let itemsSorted = items
      .slice()
      .sort(
        (a, b) => b.eCommerceData.totalRevenue - a.eCommerceData.totalRevenue
      )
      .slice(0, top_n);

    itemsSorted.forEach((d, i) => {
      d.rank = i; // Adds a rank to the obj
      // Makes sets th colour for the right category
      d.colour =
        d.category === CATEGORIES.medic
          ? chartElements.color.categoriesColors.medic
          : d.category === CATEGORIES.fashion
          ? chartElements.color.categoriesColors.fashion
          : d.category === CATEGORIES.shoes
          ? chartElements.color.categoriesColors.shoes
          : "#ACC39F";
    });

    // X - Axis
    let x = d3
      .scaleLinear()
      .domain([0, d3.max(itemsSorted, (d) => d.eCommerceData.totalRevenue)])
      .range([margin.left, width - margin.right - 65]);

    // Y - Axis
    let y = d3
      .scaleLinear()
      .domain([top_n, 0])
      .range([height - margin.bottom, margin.top]);

    // Set the ticks for the xAxis
    let xAxis = d3
      .axisTop()
      .scale(x)
      .ticks(width > 500 ? 5 : 2)
      .tickSize(-(height - margin.top - margin.bottom))
      .tickFormat((d) => d3.format(",")(d));

    // Set the view for the xAxis
    svgCanvas
      .append("g")
      .attr("class", "axis xAxis")
      .attr("transform", `translate(20, ${margin.top})`)
      .call(xAxis)
      .selectAll(".tick line")
      .classed("origin", (d) => d === 0);

    // Set the view for prev bar
    svgCanvas
      .selectAll("rect.barPrev")
      .data(itemsSorted, (d) => d.name)
      .enter()
      .append("rect")
      .attr("class", "barPrev")
      .attr("x", x(0) + 1)
      .attr(
        "width",
        (d) => x(d.eCommerceData.lastMonthData.totalRevenue) - x(0) - 1
      )
      .attr("y", (d) => y(d.rank) + 5)
      .attr("height", y(1) - y(0) - barPadding)
      .style("fill", "#bbbbbb")
      .style("opacity", "0.5");

    // Set the view for the bar
    svgCanvas
      .selectAll("rect.bar")
      .data(itemsSorted, (d) => d.name)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", x(0) + 1)
      .attr("width", (d) => x(d.eCommerceData.totalRevenue) - x(0) - 1)
      .attr("y", (d) => y(d.rank) + 5)
      .attr("height", y(1) - y(0) - barPadding)
      .style("fill", (d) => d.colour);

    // Labels for the bar
    svgCanvas
      .selectAll("text.label")
      .data(itemsSorted, (d) => d.name)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) =>
        d.rank < clientStore.lengthOfArray - 8
          ? x(d.eCommerceData.totalRevenue) - 4
          : 190
      )
      .attr("y", (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
      .style("text-anchor", "end")
      .html((d) => d.name);

    // Value for the bar
    svgCanvas
      .selectAll("text.valueLabel")
      .data(itemsSorted, (d) => d.name)
      .enter()
      .append("text")
      .attr("class", "valueLabel")
      .attr("x", (d) =>
        d.rank < clientStore.lengthOfArray - 8
          ? x(d.eCommerceData.totalRevenue) + 5
          : 200
      )
      .attr("y", (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 - 5)
      .text((d) => `€${d3.format(",.0f")(d.eCommerceData.totalRevenue)}`);

    // avg for the bar
    svgCanvas
      .selectAll("text.avgLabel")
      .data(itemsSorted, (d) => d.name)
      .enter()
      .append("text")
      .attr("class", "avgLabel")
      .attr("x", (d) =>
        d.rank < clientStore.lengthOfArray - 8
          ? x(d.eCommerceData.totalRevenue) + 5
          : 200
      )
      .attr("y", (d) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 9)
      .text((d) => `${d3.format(",.0f")(d.eCommerceData.averageSell)} AVG`);

    // Stylings
    svgCanvas.selectAll("text").style("font-size", chartElements.font.fontSize);
    svgCanvas
      .selectAll(".tick")
      .select("text")
      .style("fill", chartElements.color.text);
    svgCanvas
      .selectAll(".tick")
      .select("line")
      .style("stroke", chartElements.color.line)
      .style("shape-rendering", "CrispEdges");
    svgCanvas.select(".domain").style("display", "none");
    svgCanvas
      .selectAll(".label")
      .style("font-weight", chartElements.font.fontWeight);
  };

  useEffect(() => graph());
  return useObserver(() => (
    <>
      <div>
        <div className={styles.outer}>
          <svg ref={ref} width="640" height={heightCalc}></svg>
        </div>

        <div className={styles.item}>
          <div
            className={styles.colour}
            style={{
              backgroundColor: chartElements.color.categoriesColors.medic,
            }}
          ></div>
          <span className={styles.subject}> {CATEGORIES.medic} </span>
        </div>

        <div className={styles.item}>
          <div
            className={styles.colour}
            style={{
              backgroundColor: chartElements.color.categoriesColors.fashion,
            }}
          ></div>
          <span className={styles.subject}>{CATEGORIES.fashion}</span>
        </div>

        <div className={styles.item}>
          <div
            className={styles.colour}
            style={{
              backgroundColor: chartElements.color.categoriesColors.shoes,
            }}
          ></div>
          <span className={styles.subject}>{CATEGORIES.shoes}</span>
        </div>
      </div>
    </>
  ));
};

export default EarningChart;
