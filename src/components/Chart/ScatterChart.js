import { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function ScatterChart({
  disableYAxis = false,
  resolution,
  NYCData,
  SFData,
}) {
  const [nycData] = useState(NYCData);
  const [sfData] = useState(SFData);
  const svgRef = useRef();

  useEffect(() => {
    // setting up container
    const w = 250;
    const h = 150;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin-bottom', '30px')
      .style('margin-left', '30px');

    // setting up scaling
    const xScale = d3.scaleLinear().domain([0, 2]).range([0, w]);
    const yScale = d3.scaleLinear().domain([0, 4]).range([h, 0]);

    // setting up axis
    const xAis = d3.axisBottom(xScale).ticks(4);
    svg.append('g').call(xAis).attr('transform', `translate(0, ${h})`);

    svg
      .append('text')
      .attr('x', w / 2 - 55)
      .attr('y', h + 35)
      .text('RANK(' + resolution + ')');

    if (!disableYAxis) {
      svg.style('margin-left', '70px');
      const yAxis = d3.axisLeft(yScale).ticks(10);
      svg.append('g').call(yAxis);
      svg
        .append('text')
        .attr('y', h / 2)
        .attr('x', -65)
        .text('Rank');
    }

    // setting up svg data
    svg
      .selectAll()
      .data(sfData.features)
      .enter()
      .append('circle')
      .attr('cx', (d) =>
        xScale(
          Math.sqrt(
            d.resolutions[resolution].maxRank *
              d.resolutions[resolution].maxRank +
              d.resolutions[resolution].fnRank *
                d.resolutions[resolution].fnRank +
              d.resolutions[resolution].sigRank *
                d.resolutions[resolution].sigRank
          )
        )
      )
      .attr('cy', (d) => yScale(d.rank))
      .attr('r', 3.5)
      .attr('fill', 'mediumblue')
      .attr('opacity', 0.6);

    svg
      .selectAll()
      .data(nycData.features)
      .enter()
      .append('circle')
      .attr('cx', (d) =>
        xScale(
          Math.sqrt(
            d.resolutions[resolution].maxRank *
              d.resolutions[resolution].maxRank +
              d.resolutions[resolution].fnRank *
                d.resolutions[resolution].fnRank +
              d.resolutions[resolution].sigRank *
                d.resolutions[resolution].sigRank
          )
        )
      )
      .attr('cy', (d) => yScale(d.rank))
      .attr('r', 3.5)
      .attr('fill', 'orange')
      .attr('opacity', 0.6);
  }, [nycData, sfData, disableYAxis, resolution]);

  return <svg ref={svgRef}></svg>;
}
