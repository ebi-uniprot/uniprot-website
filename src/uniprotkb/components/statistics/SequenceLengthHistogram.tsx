import { useCallback, useEffect, useRef } from 'react';
import { select, scaleLinear, axisBottom, axisLeft } from 'd3';

import { BinSizeOptions } from './SequenceLength';

import styles from './styles/sequence-length-histogram.module.scss';

export type SequenceLengthToCounts = Map<number, number>;

export const bin = (
  sequenceLengthToCounts: SequenceLengthToCounts,
  binSize: number
): SequenceLengthToCounts => {
  // Returns bins with closed start and open end eg [a, a + binSize)
  if (binSize === 1) {
    return sequenceLengthToCounts;
  }
  const binned: SequenceLengthToCounts = new Map();
  for (const [sequenceLength, count] of sequenceLengthToCounts) {
    const i = binSize * Math.floor(+sequenceLength / binSize);
    binned.set(i, (binned.get(i) || 0) + count);
  }
  return binned;
};

// Specify the chart’s dimensions.
const width = 400;
const height = 300;
const margin = { top: 10, right: 60, bottom: 40, left: 80 };

type Props = {
  items: SequenceLengthToCounts;
  binSize: BinSizeOptions;
};

const SequenceLengthHistogram = ({ items, binSize }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const binned = bin(items, binSize);

  const maxSequenceLength = Math.max(...binned.keys());
  const maxCount = Math.max(...binned.values());

  const renderHistogram = useCallback(() => {
    if (!(maxCount && maxSequenceLength)) {
      return;
    }

    const svg = select(svgRef.current);

    // Remove previous drawings
    svg.selectAll('g').remove();

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

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
      .attr('x', margin.left + width / 2)
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
      .attr('x', margin.bottom + margin.top - height / 2)
      .attr('y', 15)
      .attr('transform', 'rotate(-90)')
      .text('Number of sequences');

    chart
      .append('g')
      .selectAll('dot')
      .data(Array.from(binned))
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d[0]) || 0)
      .attr('y', (d) => yScale(d[1]) || 0)
      .attr('width', xScale(binSize) || 1)
      .attr('height', (d) => height - (yScale(d[1]) || 0));
  }, [maxCount, maxSequenceLength, binned]);

  useEffect(() => {
    if (svgRef.current) {
      renderHistogram();
    }
  }, [renderHistogram, binned]);

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      className={styles.histogram}
    />
  );
};

export default SequenceLengthHistogram;
