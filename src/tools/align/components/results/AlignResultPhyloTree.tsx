// See https://observablehq.com/@mbostock/tree-of-life for inspiration
import React, { FC, useRef, useEffect, useState } from 'react';
import { Loader } from 'franklin-sites';
import { debounce } from 'lodash-es';
import {
  cluster,
  hierarchy,
  select,
  easeBackOut,
  HierarchyPointNode,
} from 'd3';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import phylotree, { findLongerDistance } from '../../adapters/phylotree';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useSize from '../../../../shared/hooks/useSize';

import toolsURLs from '../../../config/urls';

import { JobTypes } from '../../../types/toolsJobTypes';
import { PhyloTreeNode } from '../../types/alignResults';

import './styles/AlignResultPhyloTree.scss';

interface Redraw {
  ({ width, showDistance }: { width: number; showDistance: boolean }): void;
}
interface Cancelable {
  cancel(): void;
  flush(): void;
}

type MutatedHierarchy = HierarchyPointNode<PhyloTreeNode> & {
  linkDOM: SVGElement;
};

const margin = 20;

const alignURLs = toolsURLs(JobTypes.ALIGN);

const AlignResultPhyloTree: FC<{ id: string }> = ({ id }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const redrawRef = useRef<Redraw & Cancelable>();

  const [showDistance, setShowDistance] = useState(true);

  const { loading, data, error, status } = useDataApi<string>(
    alignURLs.resultUrl(id, 'phylotree')
  );

  const [size] = useSize<SVGSVGElement>(svgRef);

  const width = size?.width || 0;

  useEffect(() => {
    if (!data) {
      return;
    }

    const parsed = phylotree(data);
    const maxDistance = findLongerDistance(parsed);

    const root = hierarchy(parsed);

    const clusterLayout = cluster<PhyloTreeNode>();
    const clusteredRoot = clusterLayout(root);

    // needed to keep a margin to fit the names, get the longuest name
    const maxNameLength =
      Math.max(...root.leaves().map((d) => d.data.name?.length ?? 0)) * 10;

    const svg = select(svgRef.current);
    // Text labels
    const labels = svg
      .select('g.labels')
      .selectAll('text.label')
      .data(clusteredRoot.leaves())
      .enter()
      .append('text')
      .classed('label', true)
      .attr('alignment-baseline', 'middle')
      .attr('x', 6)
      .text((d) => d.data.name || null)
      .on('mouseover', (d) => {
        let target = d;
        while (target.parent) {
          select((target as MutatedHierarchy).linkDOM).classed('hovered', true);
          target = target.parent;
        }
      })
      .on('mouseout', () => {
        svg.selectAll('.link.hovered').classed('hovered', false);
      });

    // Links
    const links = svg
      .select('g.links')
      .selectAll('line.link')
      .data(clusteredRoot.links())
      .enter()
      .append('path')
      .classed('link', true)
      .each((d, i, domArray) => {
        // eslint-disable-next-line no-param-reassign
        (d.target as MutatedHierarchy).linkDOM = domArray[i];
      });

    let firstTime = true;

    redrawRef.current = debounce<Redraw>(({ width, showDistance }) => {
      const widthForLinks = width - 2 * margin - maxNameLength;
      clusterLayout.size([width - 2 * margin, widthForLinks]);
      clusterLayout(root);

      labels
        .merge(labels)
        .transition()
        .duration(firstTime ? 0 : 500)
        .ease(easeBackOut)
        .attr(
          'transform',
          (d) =>
            `translate(${
              showDistance
                ? (Math.max(
                    (d.parent && d.parent.data.distanceFromRoot) || 0,
                    d.data.distanceFromRoot || 0
                  ) /
                    maxDistance) *
                  widthForLinks
                : d.y
            },${d.x})`
        );

      links
        .merge(links)
        // .classed('hovered', () => Math.random() > 0.5)
        .transition()
        .duration(firstTime ? 0 : 500)
        .ease(easeBackOut)
        .attr(
          'd',
          (d) =>
            `M${
              showDistance
                ? ((d.source.data.distanceFromRoot || 0) / maxDistance) *
                  widthForLinks
                : d.source.y
            },${d.source.x} V${d.target.x} H${
              showDistance
                ? // sometimes distance is negative... so take the parent's...
                  (Math.max(
                    d.source.data.distanceFromRoot || 0,
                    d.target.data.distanceFromRoot || 0
                  ) /
                    maxDistance) *
                  widthForLinks
                : d.target.y
            }`
        );

      firstTime = false;
    }, 250);

    // eslint-disable-next-line consistent-return
    return () => {
      redrawRef.current?.cancel();
      svg.selectAll('g.nodes circle.node').remove();
      svg.selectAll('g.links line.link').remove();
    };
  }, [data]);

  useEffect(() => {
    if (typeof width !== 'undefined') {
      redrawRef.current?.({ width, showDistance });
    }
  }, [width, showDistance]);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  return (
    <section className="align-result-pim">
      <h5>Phylogenetic tree</h5>
      <svg ref={svgRef} height={width || 400}>
        <g transform={`translate(${margin}, ${margin})`}>
          <g className="links" />
          <g className="labels" />
        </g>
      </svg>
      <fieldset>
        <div>
          Branch length:
          <label>
            <input
              name="distance"
              type="radio"
              checked={!showDistance}
              onChange={() => setShowDistance(false)}
            />
            Cladogram
          </label>
          <label>
            <input
              name="distance"
              type="radio"
              checked={showDistance}
              onChange={() => setShowDistance(true)}
            />
            Real
          </label>
        </div>
      </fieldset>
    </section>
  );
};

export default AlignResultPhyloTree;
