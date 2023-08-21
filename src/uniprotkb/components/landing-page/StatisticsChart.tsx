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

import useDataApi from '../../../shared/hooks/useDataApi';

import {
  StatisticsItem as SI,
  StatisticsPayload,
} from '../statistics/StatisticsPage';
import { LocationToPath, Location } from '../../../app/config/urls';
import { stringifyQuery, stringifyUrl } from '../../../shared/utils/url';

import styles from './styles/statistics-chart.module.scss';
import PieChart, { StatisticsGraphItem } from '../graphs/PieChart';

type StatisticsItem = Pick<SI, 'name' | 'entryCount'>;

export const nameToQuery = new Map<string, string>([
  ['Archaea', '(taxonomy_id:2157)'],
  ['Eukaryota', '(taxonomy_id:2759)'],
  ['Viruses', '(taxonomy_id:10239)'],
  ['Bacteria', '(taxonomy_id:2)'],
  ['Other', '((taxonomy_id:2787854) OR (taxonomy_id:2787823))'],
]);

// Specify the chart’s dimensions.
const width = 400;
const height = 300;
const margin = 40;

const radius = Math.min(width, height) / 2 - margin;

// Create the pie layout and arc generators
const pie = d3pie<StatisticsItem>()
  .sort(null) // use null to keep order in original data
  .value((d) => d.entryCount);

const arc = d3arc<PieArcDatum<StatisticsItem>>()
  .outerRadius(radius * 0.8)
  .innerRadius(0);

const outerArc = d3arc<PieArcDatum<StatisticsItem>>()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9);

// Below is used as a reference only for calculating the polyline start position
const midArc = d3arc<PieArcDatum<StatisticsItem>>()
  .outerRadius(radius * 0.8)
  .innerRadius(radius * 0.4);

const midAngle = (d: PieArcDatum<StatisticsItem>) =>
  d.startAngle + (d.endAngle - d.startAngle) / 2;

const current: Map<
  string,
  { datum: PieArcDatum<StatisticsItem>; opacity: number }
> = new Map();

const renderPieChart = (
  svgElement: SVGSVGElement,
  data: StatisticsItem[]
): void => {
  // Create the color scale.
  const color = scaleOrdinal<string, string>()
    .domain(data.map((d) => d.name))
    .range([...schemeBlues[5]].reverse());

  // Get the SVG container.
  const svg = select(svgElement);

  const pieData = pie(data);

  svg
    .selectAll<SVGGElement, PieArcDatum<StatisticsItem>>(`.${styles.slice}`)
    .data(
      pieData,
      (d, i, domArray) => d?.data.name || domArray[i].dataset.key || i
    )
    .style('fill', (d) => color(d.data.name))
    .transition()
    .duration(1_000)
    .tween('tween', (d, i, domArray) => {
      const group = domArray[i];
      const slice = group.querySelector<SVGPathElement>('path');
      const line = group.querySelector<SVGLineElement>('polyline');
      const label =
        group.querySelector<SVGForeignObjectElement>('foreignObject');

      const { width = 0, height = 0 } =
        label?.firstElementChild?.getBoundingClientRect() || {};

      label?.setAttribute('width', `${width}`);
      // x1.5 to take into account the typography descenders (e.g. in "y")
      label?.setAttribute('height', `${height * 1.5}`);

      const isOnTheLeft = midAngle(d) < Math.PI;
      const cur = current.get(d.data.name) || {
        datum: {
          startAngle: isOnTheLeft ? 0 : 2 * Math.PI,
          endAngle: isOnTheLeft ? 0 : 2 * Math.PI,
        },
        opacity: 0,
      };
      const interpolate = d3interpolate(cur.datum, d);
      const interpolateOpacity = d3interpolate(cur.opacity, d.value ? 1 : 0);

      // At each tick, change the DOM
      return (t) => {
        const tweened = interpolate(t);
        const tweenedOpacity = interpolateOpacity(t);
        if (!tweened) {
          return;
        }
        current.set(d.data.name, { datum: tweened, opacity: tweenedOpacity });
        const isOnTheLeft = midAngle(tweened) < Math.PI;
        // slices
        slice?.setAttribute('d', arc(tweened) || '');
        // lines
        const linePos = outerArc.centroid(tweened);
        linePos[0] = radius * 0.95 * (isOnTheLeft ? 1 : -1);
        const pointsArray = [
          midArc.centroid(tweened),
          outerArc.centroid(tweened),
          linePos,
        ];
        line?.setAttribute(
          'points',
          pointsArray.map((point) => point.join(',')).join(' ')
        );
        line?.setAttribute('opacity', `${tweenedOpacity}`);
        // labels
        const labelPos = outerArc.centroid(tweened);
        labelPos[0] =
          radius * (isOnTheLeft ? 1 : -1) - (isOnTheLeft ? 0 : width);
        labelPos[1] -= height / 1.5;
        label?.setAttribute(
          'transform',
          `translate(${labelPos[0]}, ${labelPos[1]})`
        );
        // whole group
        group.setAttribute('opacity', `${tweenedOpacity}`);
      };
    });
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

  const data: StatisticsGraphItem[] = useMemo(() => {
    const taxonSummed = Object.fromEntries(
      Array.from(nameToQuery.keys(), (name) => [
        name,
        {
          name,
          entryCount: 0,
          to: {
            pathname: LocationToPath[Location.UniProtKBResults],
            query: '',
          },
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
      if (reviewed && unreviewed) {
        entry.to.query = stringifyQuery({
          query: nameToQuery.get(name),
        });
      } else {
        entry.to.query = stringifyQuery({
          query: `(reviewed:${reviewed}) AND ${nameToQuery.get(name)}`,
        });
      }
    }

    return Object.values(taxonSummed);
  }, [
    reviewed,
    reviewedStats.data?.results,
    unreviewed,
    unreviewedStats.data?.results,
  ]);

  useEffect(() => {
    if (svgRef.current && !reviewedStats.loading && !unreviewedStats.loading) {
      renderPieChart(svgRef.current, data);
    }
  }, [data, reviewedStats.loading, unreviewedStats.loading]);

  return <PieChart data={data} type="taxonomy" />;
};

export default StatisticsChart;
