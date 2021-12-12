import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function LineChart({ scalarData, lineColor, res }) {
  const svgRef = useRef();

  useEffect(() => {
    // setting up svg
    const domain = res === 'HOUR' ? 1000 : res === 'DAYOFWEEK' ? 3000 : 2000;
    const w = 860;
    const h = 75;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin-left', '35px')
      .style('margin-top', '10px');

    // setting the scaling
    const xScale = d3
      .scaleLinear()
      .domain([0, scalarData.length - 1])
      .range([0, w]);
    const yScale = d3.scaleLinear().domain([0, domain]).range([h, 0]);
    const generateScaleLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    // setting the axes
    const yAxis = d3.axisLeft(yScale).ticks(2);
    svg.append('g').call(yAxis);

    // setting up the data for the svg
    svg
      .selectAll('.line')
      .data([scalarData])
      .join('path')
      .attr('d', (d) => generateScaleLine(d))
      .attr('fill', 'none')
      .attr('stroke', lineColor)
      .attr('stroke-width', 2);
  }, [scalarData, res]);

  return <svg ref={svgRef}></svg>;
}
