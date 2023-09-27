import { select, scaleLinear, max, axisBottom, axisLeft } from 'd3';

import { useCallback, useEffect, useRef } from 'react';
import { StatisticsCategory } from './StatisticsPage';

import styles from './styles/sequence-length-histogram.module.scss';

// Specify the chart’s dimensions.
const width = 500;
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
    const svg = select(svgRef.current);
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin},${margin})`);
    const xScale = scaleLinear()
      .domain([0, maxSequenceLength]) // units: sequence length
      .range([0, width]); // units: pixels
    const yScale = scaleLinear()
      .domain([0, maxCount]) // units: count
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
      .append('rect')
      .attr('x', (d) => xScale(d.sequenceLength))
      .attr('y', (d) => yScale(d.count))
      .attr('width', 1)
      .attr('height', (d) => height - yScale(d.count));
  }, [maxCount, maxSequenceLength, sequenceLengthCounts]);

  useEffect(() => {
    if (svgRef.current) {
      renderHistogram();
    }
  }, [renderHistogram]);

  return (
    <svg
      ref={svgRef}
      width={width + margin * 2}
      height={height + margin * 2}
      className={styles.histogram}
    />
  );
};

export default SequenceLengthHistogram;
