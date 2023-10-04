import { useCallback, useEffect, useRef } from 'react';
import { select, scaleLinear, axisBottom, axisLeft, scaleBand } from 'd3';
import { sum } from 'lodash-es';

import { StatisticsCategory } from './StatisticsPage';

// import styles from './styles/amino-acid-bar-plot.module.scss';

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

type Props = {
  category: StatisticsCategory;
};
const AminoAcidBarPlot = ({ category }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

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
  const renderHistogram = useCallback(() => {
    if (!aaPercentagesSorted.length) {
      return;
    }

    const svg = select(svgRef.current);

    // Remove previous drawings
    svg.selectAll('g').remove();

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // x-axis
    const xScale = scaleBand()
      .domain(aaPercentagesSorted.map(([aa]) => aa)) // units: amino acid
      .range([0, width]) // units: pixels
      .padding(0.2);
    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .style('font-size', '1.4em')
      .attr('dx', '-0.5em')
      .attr('dy', '0.2em')
      .attr('transform', 'rotate(-45)');
    chart
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .text('Amino Acid');

    // y-axis
    const yScale = scaleLinear()
      .domain([0, maxPercentage]) // units: percentage
      .range([height, 0]); // units: pixels
    chart
      .append('g')
      .call(axisLeft(yScale))
      .selectAll('text')
      .style('font-size', '1.4em');
    chart
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', -height / 2)
      .attr('y', -0.6 * margin.left)
      .attr('transform', 'rotate(-90)')
      .text('%');

    chart
      .selectAll('bar-plot')
      .data(aaPercentagesSorted)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d[0]) || 0)
      .attr('y', (d) => yScale(d[1]) || 0)
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - (yScale(d[1]) || 0))
      .attr('fill', (d) => propertyToColor[aaToProperty[d[0]]])
      .attr('stroke', 'black');

    const size = 20;
    const xOffset = 105;
    const yOffset = 5;
    chart
      .selectAll('legend-colors')
      .data(Object.values(propertyToColor))
      .enter()
      .append('rect')
      .attr('x', width - xOffset)
      .attr('y', (d, i) => i * (size + 5) + yOffset) // 100 is where the first dot appears. 25 is the distance between dots
      .attr('width', size)
      .attr('height', size)
      .style('fill', (d) => d)
      .style('stroke', 'black');

    chart
      .selectAll('legend-labels')
      .data(Object.keys(propertyToColor))
      .enter()
      .append('text')
      .attr('x', width - xOffset + 1.2 * size)
      .attr('y', (d, i) => i * (size + 5) + size / 2 + yOffset) // 100 is where the first dot appears. 25 is the distance between dots
      .text((d) => d)
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle');
  }, [aaPercentagesSorted, maxPercentage]);

  useEffect(() => {
    if (svgRef.current) {
      renderHistogram();
    }
  }, [renderHistogram]);

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      // className={styles['line-plot']}
    />
  );
};

export default AminoAcidBarPlot;
