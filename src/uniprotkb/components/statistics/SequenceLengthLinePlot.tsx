import { memo, useCallback, useEffect, useRef } from 'react';
import { select, scaleLinear, axisBottom, axisLeft, line } from 'd3';

import { StatisticsCategory, StatisticsItem } from './StatisticsPage';

import styles from './styles/sequence-length-line-plot.module.scss';

// Specify the chart’s dimensions.
const width = 500;
const height = 400;
const margin = { top: 10, right: 60, bottom: 45, left: 80 };

const getSequenceLengthCounts = (
  items: StatisticsItem[]
): SequenceLengthCount[] =>
  items
    .map(({ name, count }): SequenceLengthCount => [+name, count])
    .sort(([aLength], [bLength]) => aLength - bLength);

type SequenceLengthCount = [sequenceLength: number, count: number];

type Props = {
  category?: StatisticsCategory;
};

const SequenceLengthLinePlot = ({ category }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const renderHistogram = useCallback((items: StatisticsItem[]) => {
    const sequenceLengthCounts = getSequenceLengthCounts(items);
    const maxSequenceLength = Math.max(...sequenceLengthCounts.map(([x]) => x));
    const maxCount = Math.max(...sequenceLengthCounts.map(([, y]) => y));
    if (!(maxCount && maxSequenceLength)) {
      return;
    }

    const chart = select(svgRef.current).select('g');

    // x-axis
    const xScale = scaleLinear()
      .domain([0, maxSequenceLength]) // units: sequence length
      .range([0, width]); // units: pixels
    chart
      .select<SVGGElement>('.x-axis')
      .transition()
      .duration(1_000)
      .call(axisBottom(xScale));

    // y-axis
    const yScale = scaleLinear()
      .domain([0, maxCount]) // units: count
      .range([height, 0]); // units: pixels
    chart
      .select<SVGGElement>('.y-axis')
      .transition()
      .duration(1_000)
      .call(axisLeft(yScale));

    chart
      .select(`.${styles.line}`)
      .datum(sequenceLengthCounts)
      .attr('opacity', 0)
      .transition()
      .duration(1_000)
      .attr('opacity', 1)
      .attr(
        'd',
        line()
          .x((d) => xScale(d[0]) || 0)
          .y((d) => yScale(d[1]) || 0)
      );
    // Keeping an empty comment here otherwise somehow prettier messes things
  }, []);

  useEffect(() => {
    if (svgRef.current && category?.items) {
      renderHistogram(category.items);
    }
  }, [renderHistogram, category?.items]);

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      className={styles['line-plot']}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g className="x-axis" transform={`translate(0, ${height})`} />
        <text
          textAnchor="middle"
          x={width / 2}
          y={height + 0.8 * margin.bottom}
        >
          Sequence length
        </text>
        <g className="y-axis" />
        <text
          textAnchor="middle"
          x={-height / 2}
          y={-0.7 * margin.left}
          transform="rotate(-90)"
        >
          Number of sequences
        </text>
        <path className={styles.line} />
      </g>
    </svg>
  );
};

export default memo(SequenceLengthLinePlot);
