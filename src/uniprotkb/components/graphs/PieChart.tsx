import { LocationDescriptor } from 'history';
import { useEffect, useRef } from 'react';
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

import { StatisticsItem } from '../statistics/StatisticsPage';

import styles from './styles/pie-chart.module.scss';

export type StatisticsGraphItem = Pick<
  StatisticsItem,
  'name' | 'entryCount'
> & {
  to: LocationDescriptor;
};

// Specify the chart’s dimensions.
const width = 400;
const height = 300;
const margin = 40;

const radius = Math.min(width, height) / 2 - margin;

// Create the pie layout and arc generators
const pie = d3pie<StatisticsGraphItem>()
  .sort(null) // use null to keep order in original data
  .value((d) => d.entryCount);

const arc = d3arc<PieArcDatum<StatisticsGraphItem>>()
  .outerRadius(radius * 0.8)
  .innerRadius(0);

const outerArc = d3arc<PieArcDatum<StatisticsGraphItem>>()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9);

// Below is used as a reference only for calculating the polyline start position
const midArc = d3arc<PieArcDatum<StatisticsGraphItem>>()
  .outerRadius(radius * 0.8)
  .innerRadius(radius * 0.4);

const midAngle = (d: PieArcDatum<StatisticsGraphItem>) =>
  d.startAngle + (d.endAngle - d.startAngle) / 2;

const current: Map<
  string,
  { datum: PieArcDatum<StatisticsGraphItem>; opacity: number }
> = new Map();

const renderPieChart = (
  svgElement: SVGSVGElement,
  data: StatisticsGraphItem[]
): void => {
  // Create the color scale.
  const color = scaleOrdinal<string, string>()
    .domain(data.map((d) => d.name))
    .range([...schemeBlues[5]].reverse());

  // Get the SVG container.
  const svg = select(svgElement);

  const pieData = pie(data);

  svg
    .selectAll<SVGGElement, PieArcDatum<StatisticsGraphItem>>(
      `.${styles.slice}`
    )
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
  data: StatisticsGraphItem[];
  type: string;
};

const PieChart = ({ data, type }: StatisticsChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      renderPieChart(svgRef.current, data);
    }
  }, [data]);

  return (
    <svg ref={svgRef} className={styles.piechart} width={width} height={height}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        {data?.map((datum) => (
          <g className={styles.slice} key={datum.name} data-key={datum.name}>
            <path />
            <polyline />
            <foreignObject>
              <Link
                // eslint-disable-next-line uniprot-website/use-config-location
                to={datum.to}
                title={`Search for the ${datum.entryCount} entries with ${type}: ${datum.name}`}
              >
                {datum.name}
              </Link>
            </foreignObject>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default PieChart;
