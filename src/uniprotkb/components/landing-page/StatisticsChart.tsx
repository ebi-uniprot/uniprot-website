import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useHistory } from 'react-router-dom';
import { History } from 'history';

import useDataApi from '../../../shared/hooks/useDataApi';

import {
  StatisticsItem,
  StatisticsPayload,
} from '../statistics-page/StatisticsPage';
import { LocationToPath, Location } from '../../../app/config/urls';
import { stringifyUrl } from '../../../shared/utils/url';

import './styles/StatisticsChart.scss';

const renderPieChart = (
  svgElement: SVGSVGElement | null,
  data: StatisticsItem[],
  history: History
): void => {
  // Specify the chart’s dimensions.
  const width = 400;
  const height = 300;
  const margin = 40;
  let current: d3.PieArcDatum<StatisticsItem>;

  const radius = Math.min(width, height) / 2 - margin;

  // Create the color scale.
  const color = d3
    .scaleOrdinal<string, string>()
    .domain(data.map((d) => d.name))
    .range([...d3.schemeBlues[5]].reverse());

  // Create the SVG container.
  const svg = d3
    .select(svgElement)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  const g = svg.append('g');

  g.append('g').attr('class', 'slices');
  g.append('g').attr('class', 'labels');
  g.append('g').attr('class', 'lines');

  // Create the pie layout and arc generator.
  const pie = d3
    .pie<StatisticsItem>()
    .sort(null)
    .value((d) => d.count);

  const arc = d3
    .arc<d3.PieArcDatum<StatisticsItem>>()
    .outerRadius(radius * 0.8)
    .innerRadius(0);

  const outerArc = d3
    .arc<d3.PieArcDatum<StatisticsItem>>()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  // Below is used as a reference only for calculating the polyline start position
  const midArc = d3
    .arc<d3.PieArcDatum<StatisticsItem>>()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.4);

  const key = (d: d3.PieArcDatum<StatisticsItem>) => d.data.name;

  /* ------- PIE SLICES -------*/
  const pieData = pie(data);
  const slice = g
    .select('.slices')
    .selectAll<SVGPathElement, d3.PieArcDatum<StatisticsItem>>('path.slice')
    .data(pieData, key);

  slice
    .enter()
    .insert('path')
    .attr('class', 'slice')
    .merge(slice)
    .style('fill', (d) => color(d.data.name))
    .classed('slice', true)
    .transition()
    .duration(1000)
    .attrTween('d', (d) => {
      const interpolate = d3.interpolate(current, d);
      current = interpolate(0);
      return (t: number) =>
        arc(interpolate(t)) !== null ? `${arc(interpolate(t))}` : '';
    });

  slice.exit().remove();

  /* ------- TEXT LABELS -------*/

  const text = g
    .select('.labels')
    .selectAll<SVGTextElement, d3.PieArcDatum<StatisticsItem>>('text')
    .data(pie(data));

  const midAngle = (d: d3.PieArcDatum<StatisticsItem>) =>
    d.startAngle + (d.endAngle - d.startAngle) / 2;

  text
    .enter()
    .append('text')
    .attr('dy', '.35em')
    .classed('label', true)
    .on('click', (d) => {
      history.push(
        stringifyUrl(LocationToPath[Location.UniProtKBResults], {
          query: `taxonomy_name: ${d.data.name}`,
        })
      );
    })
    .text((d) => d.data.name)
    .merge(text)
    .transition()
    .duration(1000)
    .attrTween('transform', (d) => {
      const interpolate = d3.interpolate(current, d);
      current = interpolate(0);
      return (t) => {
        const d2 = interpolate(t);
        const pos = outerArc.centroid(d2);
        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      };
    })
    .styleTween('text-anchor', (d) => {
      const interpolate = d3.interpolate(current, d);
      current = interpolate(0);
      return (t) => {
        const d2 = interpolate(t);
        return midAngle(d2) < Math.PI ? 'start' : 'end';
      };
    });

  text.exit().remove();

  /* ------- SLICE TO TEXT POLYLINES -------*/

  const polyline = g
    .select('.lines')
    .selectAll<SVGPathElement, d3.PieArcDatum<StatisticsItem>>('polyline')
    .data(pie(data), key);

  polyline
    .join('polyline')
    .classed('polyline', true)
    .transition()
    .duration(1000)
    .attrTween('points', (d) => {
      const interpolate = d3.interpolate(current, d);
      current = interpolate(0);
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

const StatisticsChart = ({ releaseNumber }: { releaseNumber?: string }) => {
  const history: History = useHistory();
  const svgRef = useRef<SVGSVGElement>(null);

  const reviewedStats = useDataApi<StatisticsPayload>(
    releaseNumber &&
      `${API_PREFIX}/statistics/releases/${releaseNumber}/reviewed`
  );

  const unreviewedStats = useDataApi<StatisticsPayload>(
    releaseNumber &&
      `${API_PREFIX}/statistics/releases/${releaseNumber}/unreviewed`
  );

  useEffect(() => {
    if (
      svgRef.current &&
      reviewedStats.data?.results &&
      unreviewedStats?.data?.results
    ) {
      const taxonReviewed = reviewedStats.data.results.find(
        (category) => category.categoryName === 'SUPERKINGDOM'
      );
      const taxonUnreviewed = unreviewedStats.data.results.find(
        (category) => category.categoryName === 'SUPERKINGDOM'
      );
      const taxonSummed = Object.values(
        [
          ...(taxonReviewed?.items as []),
          ...(taxonUnreviewed?.items as []),
        ].reduce(
          (
            acc: Record<string, StatisticsItem>,
            { name, count, entryCount }
          ) => {
            acc[name] = {
              name,
              count: (acc[name] ? acc[name].count : 0) + count,
              entryCount: (acc[name] ? acc[name].entryCount : 0) + entryCount,
            };
            return acc;
          },
          {}
        )
      );

      renderPieChart(svgRef.current, taxonSummed as StatisticsItem[], history);
    }
  }, [reviewedStats?.data?.results, unreviewedStats?.data?.results, history]);

  return <svg ref={svgRef} className="piechart" />;
};

export default StatisticsChart;
