import { memo, useCallback, useEffect, useRef } from 'react';
import { select, scaleLinear, axisBottom, axisLeft, line } from 'd3';

import { warn } from '../../../shared/utils/logging';

import { StatisticsItem } from './StatisticsPage';

import styles from './styles/sequence-length-line-plot.module.scss';

// Specify the chart’s dimensions.
const width = 400;
const height = 400;
const margin = { top: 20, right: 60, bottom: 45, left: 80 };

const CURRENT_MAX = 2_000;

const getSequenceLengthCounts = (
  items?: StatisticsItem[],
  maxIndex = CURRENT_MAX + 1
): [counts: number[], max: number] => {
  // Create a new array filled with 0
  const out = Array.from({ length: maxIndex }, () => 0);
  let max = 0;
  for (const item of items || []) {
    const index = +item.name;
    if (Number.isNaN(index) || index > maxIndex) {
      warn(`Invalid index value: ${item.name}`);
    }
    out[index] = item.count;
    if (item.count > max) {
      max = item.count;
    }
  }
  return [out, max];
};

type Props = {
  counts?: StatisticsItem[];
};

const SequenceLengthLinePlot = ({ counts }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const renderHistogram = useCallback((items?: StatisticsItem[]) => {
    const [sequenceLengthCounts, maxCount] = getSequenceLengthCounts(items);

    const chart = select(svgRef.current).select('g');

    // x-axis
    const xScale = scaleLinear()
      .domain([0, CURRENT_MAX]) // units: sequence length
      .range([0, width]); // units: pixels
    chart
      .select<SVGGElement>('.x-axis')
      .transition()
      .duration(1_000)
      .call(axisBottom(xScale));

    // y-axis
    const yScale = scaleLinear()
      .domain([0, maxCount || 1]) // units: count
      .range([height, 0]); // units: pixels
    chart
      .select<SVGGElement>('.y-axis')
      .transition()
      .duration(1_000)
      .call(axisLeft(yScale));

    chart
      .select(`.${styles.line}`)
      .datum(sequenceLengthCounts)
      .transition()
      .duration(1_000)
      .attr('opacity', 1)
      .attr(
        'd',
        line<number>()
          .x((_, index) => xScale(index) || 0)
          .y((d) => yScale(d) || 0)
      );
    // Keeping an empty comment here otherwise somehow prettier messes things
  }, []);

  useEffect(() => {
    if (svgRef.current) {
      renderHistogram(counts);
    }
  }, [renderHistogram, counts]);

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
        <path className={styles.line} opacity={0} />
      </g>
    </svg>
  );
};

export default memo(SequenceLengthLinePlot);
