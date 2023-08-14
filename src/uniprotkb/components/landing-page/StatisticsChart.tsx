import { useEffect, useMemo, useRef } from 'react';
import {
  pie as d3pie,
  arc as d3arc,
  PieArcDatum,
  scaleOrdinal,
  schemeBlues,
  select,
  interpolate as d3interpolate,
} from 'd3';
import { Link } from 'react-router-dom';

import useDataApi from '../../../shared/hooks/useDataApi';

import {
  StatisticsItem as SI,
  StatisticsPayload,
} from '../statistics-page/StatisticsPage';
import { LocationToPath, Location } from '../../../app/config/urls';
import { stringifyQuery, stringifyUrl } from '../../../shared/utils/url';

import styles from './styles/statistics-chart.module.scss';

type StatisticsItem = Pick<SI, 'name' | 'entryCount'>;

const nameToQuery = new Map<string, string>([
  ['Eukaryota', '(taxonomy_id:2759)'],
  ['Archaea', '(taxonomy_id:2157)'],
  ['Viruses', '(taxonomy_id:10239)'],
  ['Bacteria', '(taxonomy_id:2)'],
  ['Other', '(taxonomy_id:2787854) OR (taxonomy_id:2787823)'],
]);

const transitionDuration = 1_000;

// Specify the chart’s dimensions.
const width = 400;
const height = 300;
const margin = 40;

const radius = Math.min(width, height) / 2 - margin;

// Create the pie layout and arc generator.
const pie = d3pie<StatisticsItem>()
  .sort(null)
  .value((d) => d.entryCount);

const arc = d3arc<d3.PieArcDatum<StatisticsItem>>()
  .outerRadius(radius * 0.8)
  .innerRadius(0);

const outerArc = d3arc<d3.PieArcDatum<StatisticsItem>>()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9);

// Below is used as a reference only for calculating the polyline start position
const midArc = d3arc<d3.PieArcDatum<StatisticsItem>>()
  .outerRadius(radius * 0.8)
  .innerRadius(radius * 0.4);

const key = (d: d3.PieArcDatum<StatisticsItem>) => d.data.name;

const current: Map<string, PieArcDatum<StatisticsItem>> = new Map();
console.log(current);
const renderPieChart = (
  svgElement: SVGSVGElement,
  data: StatisticsItem[]
): void => {
  console.log(data[0]);
  // Create the color scale.
  const color = scaleOrdinal<string, string>()
    .domain(data.map((d) => d.name))
    .range([...schemeBlues[5]].reverse());

  // Get the SVG container.
  const svg = select(svgElement);

  /* ------- PIE SLICES -------*/
  const pieData = pie(data);
  const slice = svg
    .select('.slices')
    .selectAll<SVGPathElement, d3.PieArcDatum<StatisticsItem>>(
      `path.${styles.slice}`
    )
    .data(pieData, key);

  slice
    .enter()
    .insert('path')
    .classed(styles.slice, true)
    .style('fill', (d) => color(d.data.name))
    .merge(slice)
    .transition()
    .duration(transitionDuration)
    .attrTween('d', (d, i) => {
      const interpolate = d3interpolate(current.get(d.data.name) || null, d);
      if (!i) console.log(current.get(d.data.name), d, interpolate(0.5));
      current.set(d.data.name, interpolate(0));
      return (t: number) => arc(interpolate(t)) || '';
    });

  slice.exit().remove();

  /* ------- TEXT LABELS -------*/

  const text = svg
    .select('.labels')
    .selectAll<SVGForeignObjectElement, d3.PieArcDatum<StatisticsItem>>(
      'foreignObject'
    )
    .data(pie(data));

  const midAngle = (d: d3.PieArcDatum<StatisticsItem>) =>
    d.startAngle + (d.endAngle - d.startAngle) / 2;

  text
    .style('opacity', (d) => (d.data.entryCount ? 1 : 0))
    .transition()
    .duration(transitionDuration)
    .style('opacity', (d) => (d.data.entryCount ? 1 : 0))
    .tween('tween', (...args) => {
      console.log(...args);
      return (t) => {
        console.log(t);
      };
    })
    .attrTween('transform', (d, i, domArray) => {
      const el = domArray[i];
      const { width = 0, height = 0 } =
        domArray[i].firstElementChild?.getBoundingClientRect() || {};
      el.setAttribute('width', `${width}`);
      el.setAttribute('height', `${height}`);
      const interpolate = d3interpolate(current.get(d.data.name) || null, d);
      current.set(d.data.name, interpolate(0));
      return (t) => {
        const d2 = interpolate(t);
        const pos = outerArc.centroid(d2);
        const isOnTheLeft = midAngle(d2) < Math.PI;
        pos[0] = radius * (isOnTheLeft ? 1 : -1) - (isOnTheLeft ? 0 : width);
        pos[1] -= height / 1.5;
        return `translate(${pos})`;
      };
    });

  text.exit().remove();

  /* ------- SLICE TO TEXT POLYLINES -------*/

  const polyline = svg
    .select('.lines')
    .selectAll<SVGPathElement, d3.PieArcDatum<StatisticsItem>>('polyline')
    .data(pie(data), key);

  polyline
    .join('polyline')
    .classed(styles.polyline, true)
    .style('opacity', (d) => (d.data.entryCount ? 0.3 : 0))
    .transition()
    .duration(transitionDuration)
    .style('opacity', (d) => (d.data.entryCount ? 0.3 : 0))
    .attrTween('points', (d) => {
      const interpolate = d3interpolate(current.get(d.data.name) || null, d);
      current.set(d.data.name, interpolate(0));
      return (t) => {
        const d2 = interpolate(t);
        const pos = outerArc.centroid(d2);
        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
        const pointsArray = [midArc.centroid(d2), outerArc.centroid(d2), pos];
        return pointsArray.map((point) => point.join(',')).join(' ');
      };
    });

  polyline.exit().remove();
};

type StatisticsChartProps = {
  releaseNumber?: string;
  reviewed: boolean;
  unreviewed: boolean;
};

const StatisticsChart = ({
  releaseNumber,
  reviewed,
  unreviewed,
}: StatisticsChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const reviewedStats = useDataApi<StatisticsPayload>(
    releaseNumber &&
      stringifyUrl(
        `${API_PREFIX}/statistics/releases/${releaseNumber}/reviewed`,
        { categories: 'superkingdom' }
      )
  );

  const unreviewedStats = useDataApi<StatisticsPayload>(
    releaseNumber &&
      stringifyUrl(
        `${API_PREFIX}/statistics/releases/${releaseNumber}/unreviewed`,
        { categories: 'superkingdom' }
      )
  );

  const data: StatisticsItem[] = useMemo(() => {
    const taxonSummed = Object.fromEntries(
      Array.from(nameToQuery.keys(), (name) => [
        name,
        {
          name,
          entryCount: 0,
        },
      ])
    );

    const reviewedData = reviewedStats.data?.results.find(
      (category) => category.categoryName === 'SUPERKINGDOM'
    );

    const unreviewedData = unreviewedStats.data?.results.find(
      (category) => category.categoryName === 'SUPERKINGDOM'
    );

    for (const [name, entry] of Object.entries(taxonSummed)) {
      if (reviewed) {
        entry.entryCount +=
          reviewedData?.items.find((item) => item.name === name)?.entryCount ||
          0;
      }
      if (unreviewed) {
        entry.entryCount +=
          unreviewedData?.items.find((item) => item.name === name)
            ?.entryCount || 0;
      }
    }

    return Object.values(taxonSummed);
  }, [
    reviewed,
    reviewedStats.data?.results,
    unreviewed,
    unreviewedStats.data?.results,
  ]);

  console.log(data);

  useEffect(() => {
    if (svgRef.current && !reviewedStats.loading && !unreviewedStats.loading) {
      renderPieChart(svgRef.current, data);
    }
  }, [data, reviewedStats.loading, unreviewedStats.loading]);

  return (
    <svg ref={svgRef} className={styles.piechart} width={width} height={height}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        <g className="slices" />
        <g className="lines" />
        <g className="labels">
          {data?.map((datum) => (
            <foreignObject key={datum.name}>
              <Link
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: stringifyQuery({
                    query: nameToQuery.get(datum.name),
                  }),
                }}
                title={`Search for the ${datum.entryCount} entries with taxonomy: ${datum.name}`}
              >
                {datum.name}
              </Link>
            </foreignObject>
          ))}
        </g>
      </g>
    </svg>
  );
};

export default StatisticsChart;
