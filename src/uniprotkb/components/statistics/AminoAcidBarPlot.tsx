import { useCallback, useEffect, useMemo, useRef } from 'react';
import { select, scaleLinear, axisBottom, axisLeft, scaleBand } from 'd3';
import { sum } from 'lodash-es';

import { StatisticsCategory } from './StatisticsPage';

// Specify the chart’s dimensions.
const width = 500;
const height = 400;
const margin = { top: 10, right: 30, bottom: 50, left: 40 };

type AAProperty =
  | 'acidic'
  | 'aliphatic'
  | 'amide'
  | 'aromatic'
  | 'basic'
  | 'small hydroxy'
  | 'sulfur';

const propertyToColor: Record<AAProperty, string> = {
  aliphatic: 'gray',
  acidic: 'red',
  'small hydroxy': 'green',
  basic: 'blue',
  aromatic: 'black',
  amide: 'white',
  sulfur: 'yellow',
};

const aaToProperty: Record<string, AAProperty> = {
  Leu: 'aliphatic',
  Ala: 'aliphatic',
  Gly: 'aliphatic',
  Val: 'aliphatic',
  Glu: 'acidic',
  Ser: 'small hydroxy',
  Ile: 'aliphatic',
  Lys: 'basic',
  Arg: 'basic',
  Asp: 'acidic',
  Thr: 'small hydroxy',
  Pro: 'aliphatic',
  Asn: 'amide',
  Gln: 'amide',
  Phe: 'aromatic',
  Tyr: 'aromatic',
  Met: 'sulfur',
  His: 'basic',
  Cys: 'sulfur',
  Trp: 'aromatic',
};

const legend = {
  boxSize: 20,
  xOffset: 105,
  yOffset: 5,
};

type Props = {
  category: StatisticsCategory;
};
const AminoAcidBarPlot = ({ category }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [aaPercentagesSorted, xScale, yScale] = useMemo(() => {
    const aaCounts = category.items
      .map(({ label, count }) => [label, count])
      .filter((d): d is [string, number] => Boolean(d[0]));
    const sumCount = sum(aaCounts.map(([, count]) => count));
    const aaPercentages: [string, number][] = aaCounts.map(([aa, count]) => [
      aa,
      100 * (count / sumCount),
    ]);
    const aaPercentagesSorted = aaPercentages.sort(
      ([, aPercentage], [, bPercentage]) => bPercentage - aPercentage
    );
    const maxPercentage = aaPercentagesSorted[0][1];
    // x-axis
    const xScale = scaleBand()
      .domain(aaPercentagesSorted.map(([aa]) => aa)) // units: amino acid
      .range([0, width]) // units: pixels
      .padding(0.2);
    // y-axis
    const yScale = scaleLinear()
      .domain([0, maxPercentage]) // units: percentage
      .range([height, 0]); // units: pixels
    return [aaPercentagesSorted, xScale, yScale];
  }, [category.items]);

  const renderAxes = useCallback(() => {
    const chart = select(svgRef.current).select('g');
    chart.select<SVGGElement>('.x-axis').call(axisBottom(xScale));
    chart.select<SVGGElement>('.y-axis').call(axisLeft(yScale));
  }, [xScale, yScale]);

  useEffect(() => {
    if (svgRef.current) {
      renderAxes();
    }
  }, [renderAxes]);

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g
          className="x-axis"
          transform={`translate(0, ${height})`}
          textAnchor="end"
          fontSize="1.4em"
          dx="-0.5em"
          dy="0.2em"
        />
        <text textAnchor="middle" x={width / 2} y={height + margin.bottom}>
          Amino acid
        </text>
        <g className="y-axis" fontSize="1.4em" />
        <text
          textAnchor="middle"
          x={-height / 2}
          y={-0.6 * margin.left}
          transform="rotate(-90)"
        >
          % of sequences
        </text>
        {aaPercentagesSorted.map(([aa, percentage]) => (
          <rect
            key={aa}
            x={xScale(aa)}
            y={yScale(percentage)}
            width={xScale.bandwidth()}
            height={height - (yScale(percentage) || 0)}
            fill={propertyToColor[aaToProperty[aa]]}
            stroke="black"
          />
        ))}
        {Object.entries(propertyToColor).map(([property, color], i) => (
          <g
            key={property}
            transform={`translate(${width - legend.xOffset}, ${
              i * (legend.boxSize + 5) + legend.yOffset
            })`}
          >
            <rect
              width={legend.boxSize}
              height={legend.boxSize}
              fill={color}
              stroke="black"
            />
            <text
              dx={legend.boxSize + 5}
              dy={legend.boxSize / 2}
              dominantBaseline="middle"
            >
              {property}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default AminoAcidBarPlot;
