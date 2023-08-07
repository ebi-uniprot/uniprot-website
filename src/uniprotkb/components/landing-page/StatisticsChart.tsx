import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import {
  StatisticsItem,
  StatisticsPayload,
} from '../statistics-page/StatisticsPage';
import useDataApi from '../../../shared/hooks/useDataApi';

const renderPieChart = (
  svgElement: SVGSVGElement | null,
  data: StatisticsItem[]
) => {
  // Specify the chart’s dimensions.
  const width = 400,
    height = 300,
    margin = 40;

  const radius = Math.min(width, height) / 2 - margin;

  // Create the color scale.
  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range([...d3.schemeBlues[5]].reverse());

  // Create the SVG container.
  const svg = d3
    .select(svgElement)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  const g = svg.append('g');

  g.append('g').attr('class', 'slices');
  g.append('g').attr('class', 'labels');
  g.append('g').attr('class', 'lines');

  // Create the pie layout and arc generator.
  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.count);

  const arc = d3
    .arc()
    .outerRadius(radius * 0.8)
    .innerRadius(0);

  const outerArc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  const key = (d) => {
    return d.data.name;
  };

  /* ------- PIE SLICES -------*/
  const pieData = pie(data);
  const slice = g.select('.slices').selectAll('path.slice').data(pieData, key);

  slice
    .enter()
    .insert('path')
    .style('fill', (d) => {
      return color(d.data.name);
    })
    .attr('class', 'slice')
    .merge(slice)
    .transition()
    .duration(1000)
    .attrTween('d', function (d) {
      this._current = this._current || d;
      const interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        return arc(interpolate(t));
      };
    })
    .style('stroke-width', '2px');

  slice.exit().remove();

  /* ------- TEXT LABELS -------*/

  const text = g.select('.labels').selectAll('text').data(pie(data), key);

  const midAngle = (d) => {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  };

  text
    .enter()
    .append('text')
    .attr('dy', '.35em')
    .style('pointer-events', 'auto')
    .style('cursor', 'pointer')
    .style('fill', '#014371')
    .style('font-weight', 'bold')
    .on('click', function (d) {
      window.location.href = `${window.location.href}?query=(taxonomy_name:${d.data.name})`;
    })
    .text((d) => d.data.name)
    .merge(text)
    .transition()
    .duration(1000)
    .attrTween('transform', function (d) {
      this._current = this._current || d;
      const interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        const d2 = interpolate(t);
        const pos = outerArc.centroid(d2);
        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      };
    })
    .styleTween('text-anchor', function (d) {
      this._current = this._current || d;
      const interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        const d2 = interpolate(t);
        return midAngle(d2) < Math.PI ? 'start' : 'end';
      };
    });

  text.exit().remove();

  /* ------- SLICE TO TEXT POLYLINES -------*/

  const polyline = g
    .select('.lines')
    .selectAll('polyline')
    .data(pie(data), key);

  polyline
    .join('polyline')
    .transition()
    .duration(1000)
    .attrTween('points', function (d) {
      this._current = this._current || d;
      const interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function (t) {
        const d2 = interpolate(t);
        const pos = outerArc.centroid(d2);
        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);

        const startPos = d3
          .arc()
          .outerRadius(radius * 0.8)
          .innerRadius(radius * 0.4)
          .centroid(d2);

        return [startPos, outerArc.centroid(d2), pos];
      };
    })
    .style('fill', 'none')
    .style('opacity', 0.3)
    .style('stroke', 'black')
    .style('stroke-width', '2px');

  polyline.exit().remove();
};

const StatisticsChart = ({ releaseNumber }: { releaseNumber?: string }) => {
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
      !reviewedStats.loading &&
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
        ].reduce((acc, { name, count, entryCount }) => {
          acc[name] = {
            name,
            count: (acc[name] ? acc[name].count : 0) + count,
            entryCount: (acc[name] ? acc[name].entryCount : 0) + entryCount,
          };
          return acc;
        }, {})
      );

      renderPieChart(svgRef.current, taxonSummed as StatisticsItem[]);
    }
  }, [
    svgRef.current,
    reviewedStats?.data?.results,
    unreviewedStats?.data?.results,
  ]);

  return <svg ref={svgRef} />;
};

export default StatisticsChart;
