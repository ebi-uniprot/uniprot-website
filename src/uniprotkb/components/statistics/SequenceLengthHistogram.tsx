import { select, scaleLinear, max, axisBottom, axisLeft } from 'd3';

import { useCallback, useEffect, useRef } from 'react';
import { StatisticsCategory } from './StatisticsPage';

import styles from './styles/sequence-length-histogram.module.scss';

// Specify the chart’s dimensions.
const width = 400;
const height = 300;
const margin = 50;

type Props = {
  category: StatisticsCategory;
};

const SequenceLengthHistogram = ({ category }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const sequenceLengthCounts = Array.from(category.items)
    .map(({ name, count }) => ({ sequenceLength: +name, count }))
    .sort((a, b) => a.sequenceLength - b.sequenceLength);

  const maxSequenceLength = max(sequenceLengthCounts, (d) => d.sequenceLength);
  const maxCount = max(sequenceLengthCounts, (d) => d.count);

  const renderHistogram = useCallback(() => {
    if (!(maxCount && maxSequenceLength)) {
      return;
    }
    console.log(maxSequenceLength);
    const svg = select(svgRef.current);
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin},${margin})`);
    const xScale = scaleLinear()
      .domain([0, maxCount]) // units: count
      .range([0, width]); // units: pixels
    const yScale = scaleLinear()
      .domain([0, maxSequenceLength]) // units: sequence length
      .range([height, 0]); // units: pixels
    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(xScale));
    chart.append('g').call(axisLeft(yScale));
    chart
      .append('g')
      .selectAll('dot')
      .data(sequenceLengthCounts)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.sequenceLength))
      .attr('cy', (d) => yScale(d.count))
      .attr('r', 1.5)
      .style('fill', '#69b3a2');
  }, [maxCount, maxSequenceLength, sequenceLengthCounts]);

  useEffect(() => {
    if (svgRef.current) {
      renderHistogram();
    }
  }, [renderHistogram]);

  return (
    <svg ref={svgRef} width={width + margin * 2} height={height + margin * 2} />
  );
};

export default SequenceLengthHistogram;
