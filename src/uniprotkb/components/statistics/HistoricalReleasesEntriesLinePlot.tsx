import { memo, useCallback, useEffect, useRef } from 'react';
import {
  select,
  scaleLinear,
  axisBottom,
  axisLeft,
  line,
  timeParse,
  scaleTime,
  format,
  timeFormat,
} from 'd3';
import { Loader } from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../shared/hooks/useDataApi';

import apiUrls from '../../config/apiUrls/apiUrls';

import styles from './styles/historical-release-entries-line-plot.module.scss';

// Specify the chart’s dimensions.
const width = 400;
const height = 400;
const margin = { top: 20, right: 60, bottom: 45, left: 80 };

type DateCount = { date: Date; count: number };
const processResults = (results: Results): [DateCount[], number] => {
  const timeParser = timeParse('%Y-%m-%d');
  const combined = new Map<string, DateCount>();
  let maxCount = 0;
  for (const r of results) {
    const d = combined.get(r.releaseDate);
    const date = d?.date || timeParser(r.releaseDate);
    if (date) {
      const count = (d?.count || 0) + r.entryCount;
      combined.set(r.releaseDate, { date, count });
      if (count > maxCount) {
        maxCount = count;
      }
    }
  }
  const sorted = Array.from(combined.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  return [sorted, maxCount];
};
type Results = {
  statisticsType: 'REVIEWED' | 'UNREVIEWED';
  releaseName: string;
  releaseDate: string;
  valueCount: number;
  entryCount: number;
}[];

type HistoricalReleasesEntriesPayload = {
  results: Results;
};

const HistoricalReleasesEntriesLinePlot = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const historyStats = useDataApi<HistoricalReleasesEntriesPayload>(
    apiUrls.statistics.history
  );

  const renderHistogram = useCallback((results: Results) => {
    const [datesEntries, maxEntries] = processResults(results);

    const chart = select(svgRef.current).select('g');

    // x-axis
    const xScale = scaleTime()
      .domain([datesEntries[0].date, datesEntries.at(-1)?.date] as Date[]) // units: Date
      .range([0, width]); // units: pixels
    chart
      .select<SVGGElement>('.x-axis')
      .transition()
      .duration(1_000)
      .call(
        axisBottom(xScale).tickFormat((d: Date | { valueOf(): number }) =>
          timeFormat('%Y')(new Date(d.valueOf()))
        )
      );

    // y-axis
    const yScale = scaleLinear()
      .domain([0, maxEntries || 0]) // units: count
      .range([height, 0]); // units: pixels

    chart
      .select<SVGGElement>('.y-axis')
      .transition()
      .duration(1_000)
      .call(axisLeft(yScale).tickFormat(format('.2s')));

    chart
      .select(`.${styles.line}`)
      .datum(datesEntries)
      .transition()
      .duration(1_000)
      .attr('opacity', 1)
      .attr(
        'd',
        line<DateCount>()
          .x((d) => xScale(d.date) || 0)
          .y((d) => yScale(d.count) || 0)
      );
  }, []);

  useEffect(() => {
    if (svgRef.current && historyStats?.data?.results) {
      renderHistogram(historyStats.data.results);
    }
  }, [historyStats?.data?.results, renderHistogram]);

  if (historyStats.loading || historyStats.loading) {
    return <Loader />;
  }

  if (historyStats.error || !historyStats.data) {
    return (
      <ErrorHandler
        status={historyStats.status}
        error={historyStats.error}
        fullPage
      />
    );
  }

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
          Number of entries
        </text>
        <g className="y-axis" />
        <text
          textAnchor="middle"
          x={-height / 2}
          y={-0.7 * margin.left}
          transform="rotate(-90)"
        >
          Release date
        </text>
        <path className={styles.line} opacity={0} />
      </g>
    </svg>
  );
};

export default memo(HistoricalReleasesEntriesLinePlot);
