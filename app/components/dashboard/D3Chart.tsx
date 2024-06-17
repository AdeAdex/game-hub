// components/D3Chart.js

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const D3Chart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = [30, 80, 45, 60, 20, 90, 55];

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', 600)
      .attr('height', 400);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 80)
      .attr('y', d => 400 - d)
      .attr('width', 70)
      .attr('height', d => d)
      .attr('fill', 'teal');
  }, []);

  return <div ref={chartRef}></div>;
};

export default D3Chart;
