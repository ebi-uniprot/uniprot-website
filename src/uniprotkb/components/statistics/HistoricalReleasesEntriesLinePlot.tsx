import { memo, useCallback, useEffect, useRef } from 'react';
import {
  select,
  scaleLinear,
  axisBottom,
  axisLeft,
  line,
  scaleTime,
  format,
  timeFormat,
  timeYear,
} from 'd3';

import styles from './styles/historical-release-entries-line-plot.module.scss';

// Specify the chart’s dimensions.
const width = 400;
const height = 400;
const margin = { top: 20, right: 60, bottom: 45, left: 80 };

export type DateCount = [Date, number];
export type Bounds = {
  date: [Date, Date];
  count: [number, number];
};

type Props = {
  dateCounts?: DateCount[];
  bounds?: Bounds;
};

const START_DATE = new Date(1986, 9, 1);

const HistoricalReleasesEntriesLinePlot = ({ dateCounts, bounds }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const renderPlot = useCallback((dateCounts: DateCount[], bounds: Bounds) => {
    const chart = select(svgRef.current).select('g');

    const endYear = new Date(bounds.date[1].getFullYear() + 2, 1, 1);

    // x-axis
    const xScale = scaleTime()
      .domain([START_DATE, endYear]) // units: Date
      .range([0, width]); // units: pixels
    chart
      .select<SVGGElement>('.x-axis')
      .transition()
      .duration(1_000)
      .call(
        axisBottom(xScale)
          .ticks(timeYear.every(4))
          .tickFormat((d: Date | { valueOf(): number }) =>
            timeFormat('%Y')(new Date(d.valueOf()))
          )
      );

    // y-axis
    const yScale = scaleLinear()
      .domain(bounds.count) // units: count
      .range([height, 0]) // units: pixels
      .nice();

    chart
      .select<SVGGElement>('.y-axis')
      .transition()
      .duration(1_000)
      .call(axisLeft(yScale).tickFormat(format('.2s')));

    chart
      .select(`.${styles.line}`)
      .datum(dateCounts)
      .transition()
      .duration(1_000)
      .attr('opacity', 1)
      .attr(
        'd',
        line<DateCount>()
          .x((d) => xScale(d[0]) || 0)
          .y((d) => yScale(d[1]) || 0)
      );
  }, []);

  useEffect(() => {
    if (svgRef.current && dateCounts && bounds) {
      renderPlot(dateCounts, bounds);
    }
  }, [bounds, dateCounts, renderPlot]);

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
          Release date
        </text>
        <g className="y-axis" />
        <text
          textAnchor="middle"
          x={-height / 2}
          y={-0.7 * margin.left}
          transform="rotate(-90)"
        >
          Number of entries
        </text>
        <path className={styles.line} opacity={0} />
      </g>
    </svg>
  );
};

export default memo(HistoricalReleasesEntriesLinePlot);
