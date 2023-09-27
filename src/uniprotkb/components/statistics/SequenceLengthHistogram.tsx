import { select, scaleLinear, max, axisBottom, axisLeft } from 'd3';

import { useCallback, useEffect, useRef } from 'react';
import { StatisticsCategory } from './StatisticsPage';

import styles from './styles/sequence-length-histogram.module.scss';

// Specify the chart’s dimensions.
const width = 400;
const height = 300;
const margin = 60;

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

  const binSize = 10;
  const binned = {};
  // currentUpperBound =  binSize
  //     for (const {sequenceLength, count} of sequenceLengthCounts) {
  //         const bin = Math.floor(sequenceLength/binSize)
  //         binned[bin] +=
  //     }

  const renderHistogram = useCallback(() => {
    if (!(maxCount && maxSequenceLength)) {
      return;
    }
    const svg = select(svgRef.current);
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin},${margin})`);

    // x-axis
    const xScale = scaleLinear()
      .domain([0, maxSequenceLength]) // units: sequence length
      .range([0, width]); // units: pixels
    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(xScale));
    chart
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'end')
      .attr('x', margin + width / 2)
      .attr('y', height + 35)
      .text('Sequence length');

    // y-axis
    const yScale = scaleLinear()
      .domain([0, maxCount]) // units: count
      .range([height, 0]); // units: pixels
    chart.append('g').call(axisLeft(yScale));
    svg
      .append('text')
      .attr('class', 'y label')
      .attr('text-anchor', 'end')
      .attr('x', -height / 2)
      .attr('y', 17.5)
      .attr('transform', 'rotate(-90)')
      .text('Number of sequences');

    chart
      .append('g')
      .selectAll('dot')
      .data(sequenceLengthCounts)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.sequenceLength) || 0)
      .attr('y', (d) => yScale(d.count) || 0)
      .attr('width', 1)
      .attr('height', (d) => height - (yScale(d.count) || 0));
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
