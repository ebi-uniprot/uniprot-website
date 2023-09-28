import { useCallback, useEffect, useRef } from 'react';
import { select, scaleLinear, max, axisBottom, axisLeft } from 'd3';

import { StatisticsItem } from './StatisticsPage';

import { BinSizeOptions } from './SequenceLength';

import styles from './styles/sequence-length-histogram.module.scss';

type SequenceLengthCounts = {
  sequenceLength: number;
  count: number;
}[];

export const bin = (
  sequenceLengthCounts: SequenceLengthCounts,
  binSize: number
): SequenceLengthCounts => {
  // Returns bins with closed start and open end eg [a, a + binSize)
  if (binSize === 1) {
    return sequenceLengthCounts;
  }
  const binned: { [k: number]: number } = {};
  for (const { sequenceLength, count } of sequenceLengthCounts) {
    const i = binSize * Math.floor(sequenceLength / binSize);
    binned[i] = (binned[i] || 0) + count;
  }
  return Object.entries(binned).map(([k, v]) => ({
    sequenceLength: +k,
    count: v,
  }));
};

// Specify the chart’s dimensions.
const width = 400;
const height = 300;
const margin = 60;

type Props = {
  items: StatisticsItem[];
  binSize: BinSizeOptions;
};

const SequenceLengthHistogram = ({ items, binSize }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const sequenceLengthCounts = Array.from(items)
    .map(({ name, count }) => ({ sequenceLength: +name, count }))
    .sort((a, b) => a.sequenceLength - b.sequenceLength);

  const binned = bin(sequenceLengthCounts, binSize);

  const maxSequenceLength = max(binned, (d) => d.sequenceLength);
  const maxCount = max(binned, (d) => d.count);

  const renderHistogram = useCallback(() => {
    if (!(maxCount && maxSequenceLength)) {
      return;
    }

    const svg = select(svgRef.current);

    // Remove previous drawings
    svg.selectAll('g').remove();

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
      .attr('y', 15)
      .attr('transform', 'rotate(-90)')
      .text('Number of sequences');

    chart
      .append('g')
      .selectAll('dot')
      .data(binned)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.sequenceLength) || 0)
      .attr('y', (d) => yScale(d.count) || 0)
      .attr('width', xScale(binSize) || 1)
      .attr('height', (d) => height - (yScale(d.count) || 0));
  }, [maxCount, maxSequenceLength, binned]);

  useEffect(() => {
    if (svgRef.current) {
      renderHistogram();
    }
  }, [renderHistogram, binned]);

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
