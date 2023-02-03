import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const NeuralNetworkVisualization = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define the nodes
    const nodes = [
      { id: 'Input 1', x: 100, y: 10 },
      { id: 'Input 2', x: 100, y: 30 },
      { id: 'Hidden 1', x: 130, y: 10 },
      { id: 'Hidden 2', x: 130, y: 30 },
      { id: 'Output 1', x: 160, y: 10 },
      { id: 'Output 2', x: 160, y: 30 }
    ];

    // Define the links
    const links = [
      { source: nodes[0], target: nodes[2] },
      { source: nodes[0], target: nodes[3] },
      { source: nodes[1], target: nodes[2] },
      { source: nodes[1], target: nodes[3] },
      { source: nodes[2], target: nodes[4] },
      { source: nodes[2], target: nodes[5] },
      { source: nodes[3], target: nodes[4] },
      { source: nodes[3], target: nodes[5] }
    ];

    // Define the simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(250, 250));

    // Draw the links
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 2);

    // Draw the nodes
    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 20)
      .attr('fill', '#22A7F0')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    // Add labels to the nodes
    const label = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.id)
      .attr('font-size', '16px')
      .attr('fill', 'white');

    // Update the simulation on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
      label
        .attr('x', d => d.x - 20)
        .attr('y', d => d.y - 30);
    });
}, []);

return (
<svg width="500" height="500" ref={svgRef} />
);
};

export default NeuralNetworkVisualization;
