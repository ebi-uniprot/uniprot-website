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
  const width = 450,
    height = 300,
    radius = Math.min(width, height) / 2;

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
    .attr('viewBox', [-width / 2, -height / 2, width, height]);

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
        return [arc.centroid(d2), outerArc.centroid(d2), pos];
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
  // Using reviewed stats for demo pie chart
  const reviewedStats = useDataApi<StatisticsPayload>(
    releaseNumber &&
      `${API_PREFIX}/statistics/releases/${releaseNumber}/reviewed`
  );

  useEffect(() => {
    if (svgRef.current) {
      if (!reviewedStats.loading && reviewedStats.data?.results) {
        const plotData = reviewedStats.data.results.find(
          (category) => category.categoryName === 'SUPERKINGDOM'
        );
        renderPieChart(svgRef.current, plotData.items);
        // renderPieChart(250, 250, 20, svgRef.current, plotData.items);
      }
    }
  }, [svgRef.current, reviewedStats?.data?.results]);

  return <svg ref={svgRef} />;
};

export default StatisticsChart;
