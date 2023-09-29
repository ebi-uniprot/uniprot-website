import { useCallback, useEffect, useRef } from 'react';
import { select, scaleLinear, axisBottom, axisLeft, line } from 'd3';

import styles from './styles/sequence-length-histogram.module.scss';

export type SequenceLengthToCounts = Map<number, number>;

// Specify the chart’s dimensions.
const width = 400;
const height = 300;
const margin = { top: 10, right: 60, bottom: 40, left: 80 };

type Props = {
  items: SequenceLengthToCounts;
};

const SequenceLengthLinePlot = ({ items }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const xy = Array.from(items.entries()).sort(([a], [b]) => a - b);

  console.log(xy);

  const maxSequenceLength = Math.max(...xy.map(([x]) => x));
  const maxCount = Math.max(...xy.map(([, y]) => y));

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
      .append('path')
      .datum(xy)
      .attr('fill', 'black')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        line()
          .x((d) => {
            console.log(d[0], xScale(d[0]) || 0);
            return xScale(d[0]) || 0;
          })
          .y((d) => {
            console.log(d[1], yScale(d[1]) || 0);
            return yScale(d[1]) || 0;
          })
      );
  }, [maxCount, maxSequenceLength, xy]);

  useEffect(() => {
    if (svgRef.current) {
      renderHistogram();
    }
  }, [renderHistogram, xy]);

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      className={styles.histogram}
    />
  );
};

export default SequenceLengthLinePlot;
