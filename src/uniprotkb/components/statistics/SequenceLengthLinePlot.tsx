import { useCallback, useEffect, useRef } from 'react';
import { select, scaleLinear, axisBottom, axisLeft, line } from 'd3';

import { SequenceLengthCount } from './SequenceLength';

import styles from './styles/sequence-length-line-plot.module.scss';

// Specify the chart’s dimensions.
const width = 400;
const height = 300;
const margin = { top: 10, right: 60, bottom: 40, left: 80 };

type Props = {
  sequenceLengthCounts: SequenceLengthCount[];
};

const SequenceLengthLinePlot = ({ sequenceLengthCounts }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const maxSequenceLength = Math.max(...sequenceLengthCounts.map(([x]) => x));
  const maxCount = Math.max(...sequenceLengthCounts.map(([, y]) => y));

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
      .datum(sequenceLengthCounts)
      .attr('class', styles.line)
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
  }, [maxCount, maxSequenceLength, sequenceLengthCounts]);

  useEffect(() => {
    if (svgRef.current) {
      renderHistogram();
    }
  }, [renderHistogram, sequenceLengthCounts]);

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      className={styles['line-plot']}
    />
  );
};

export default SequenceLengthLinePlot;
