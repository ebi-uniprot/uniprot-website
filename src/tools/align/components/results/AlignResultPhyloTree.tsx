// See https://observablehq.com/@mbostock/tree-of-life for inspiration
import React, { FC, useRef, useEffect, useState, useMemo } from 'react';
import { Loader, Message } from 'franklin-sites';
import { debounce } from 'lodash-es';
import { cluster, hierarchy, select, max, easeQuadOut } from 'd3';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import phylotree from '../../adapters/phylotree';

import customLayout from '../../utils/customLayout';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useSize from '../../../../shared/hooks/useSize';

import toolsURLs from '../../../config/urls';

import { JobTypes } from '../../../types/toolsJobTypes';
import { PhyloTreeNode } from '../../types/alignResults';

import './styles/AlignResultPhyloTree.scss';

interface Redraw {
  ({
    width,
    showDistance,
    circularLayout,
  }: {
    width: number;
    showDistance: boolean;
    circularLayout: boolean;
  }): void;
}
interface Cancelable {
  cancel(): void;
  flush(): void;
}

const margin = 20;
const duration = 500;

const alignURLs = toolsURLs(JobTypes.ALIGN);

const AlignResultPhyloTree: FC<{ id: string }> = ({ id }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const redrawRef = useRef<Redraw & Cancelable>();

  const [showDistance, setShowDistance] = useState(true);
  const [circularLayout, setCircularLayout] = useState(false);
  const layoutRef = useRef(circularLayout);

  const { loading, data, error, status } = useDataApi<string>(
    alignURLs.resultUrl(id, 'phylotree')
  );

  const [size] = useSize<SVGSVGElement>(svgRef);

  const width = size?.width || 0;

  const [root, maxDistance, hasNegative] = useMemo(() => {
    const parsed = phylotree(data);
    const root = hierarchy(parsed)
      .sum((node) => node.distance || 0)
      // sort to have smallest total branches at the top
      .sort((a, b) => (a.value || 0) - (b.value || 0));
    const nodes = root.descendants();
    return [
      root,
      max(nodes.map((node) => node.data.distanceFromRoot || 0)) || 0,
      nodes.some((node) => (node.data.distance || 0) < 0),
    ];
  }, [data]);

  useEffect(() => {
    // cancel next possible redraw if unmounting this element
    return () => redrawRef.current?.cancel();
  });

  useEffect(() => {
    if (!root.children) {
      return;
    }

    const clusterLayout = cluster<PhyloTreeNode>();
    clusterLayout.separation(() => 1);
    const customizeLayout = customLayout().maxDistance(maxDistance);

    // it's actually returning the same object, but mutated.
    // using the returned object to have TypeScript happy
    const mutatedRoot = customizeLayout(clusterLayout(root));

    // needed to keep a margin to fit the names, get the longuest name
    const leaves = root.leaves();
    const maxNameLength =
      Math.max(...leaves.map((d) => d.data.name?.length ?? 0)) * 10;
    const nLeaves = leaves.length;

    const svg = select(svgRef.current);

    const container = svg
      .select('.container')
      .attr('transform', `translate(${margin},${margin}) translate(0, 0)`);

    // Text labels
    const labels = svg
      .select('g.labels')
      .selectAll('text.label')
      .data(mutatedRoot.leaves())
      .enter()
      .append('text')
      .classed('label', true)
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.name || null)
      .on('mouseover', (d) => {
        let target = d;
        while (target.parent) {
          select(target.linkDOM || null).classed('hovered', true);
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
      .data(mutatedRoot.links())
      .enter()
      .append('path')
      .classed('link', true)
      .classed('nonsense', (d) => (d.target.data.distance ?? 0) < 0)
      .each((d, i, domArray) => {
        // eslint-disable-next-line no-param-reassign
        d.target.linkDOM = domArray[i];
      });

    let firstTime = true;

    // debouncing the redraw function to avoid calling it quickly too many times
    redrawRef.current = debounce<Redraw>(
      ({ width, showDistance, circularLayout }) => {
        clusterLayout.size([
          circularLayout
            ? 360 // available angles to spread
            : nLeaves * 25, // available height to spread
          circularLayout
            ? width / 2 - margin - maxNameLength // available radius
            : width - 2 * margin - maxNameLength, // available width
        ]);

        svg.attr('height', circularLayout ? width : nLeaves * 25 + 2 * margin);

        // mutate
        const mutatedRoot = customizeLayout
          .width(width - 2 * margin)
          .maxLabelWidth(maxNameLength)
          .showDistance(showDistance)
          .circularLayout(circularLayout)(clusterLayout(root));

        // if circular layout, move the 0, 0 reference to the center for easier
        // calculation of coordinates
        container
          .transition()
          .ease(easeQuadOut)
          .duration(firstTime ? 0 : duration)
          .attr(
            'transform',
            `translate(${margin},${margin}) translate(${
              circularLayout ? width / 2 : 0
            }, ${circularLayout ? width / 2 : 0})`
          );

        labels
          .data(mutatedRoot.leaves())
          .merge(labels)
          .transition()
          .duration(firstTime ? 0 : duration)
          .delay((d) => (firstTime ? 0 : 25 * d.depth))
          .attr('x', ({ coords: { deg } }) =>
            circularLayout && deg > 90 && deg < 270 ? -6 : 6
          )
          .attr('text-anchor', ({ coords: { deg } }) =>
            circularLayout && deg > 90 && deg < 270 ? 'end' : 'start'
          )
          .attr('transform', ({ coords: { x, y, deg } }) => {
            let transform = `translate(${x},${y})`;
            if (circularLayout) {
              transform += ` rotate(${deg})`;
              if (deg > 90 && deg < 270) {
                // flip text if in quadrant 2 or 3
                transform += ` rotate(180)`;
              }
            }
            return transform;
          });

        links
          .data(mutatedRoot.links())
          .merge(links)
          .transition()
          .duration(firstTime ? 0 : duration)
          .delay(({ target }) => (firstTime ? 0 : 25 * target.depth))
          .attr('d', ({ source, target }) => {
            // keeping the same path structure makes it transitionable
            if (circularLayout) {
              return `M${source.coords.x} ${source.coords.y} A${
                source.coords.radius
              } ${source.coords.radius} 0 0 ${
                source.coords.phi > target.coords.phi ? 0 : 1
              } ${source.coords.radius * Math.cos(target.coords.phi)} ${
                source.coords.radius * Math.sin(target.coords.phi)
              } L${target.coords.x} ${target.coords.y}`;
            }
            return `M${source.coords.x} ${source.coords.y} A0 ${
              target.coords.y - source.coords.y
            } 0 0 ${source.coords.phi > target.coords.phi ? 0 : 1} ${
              source.coords.x
            } ${target.coords.y} L${target.coords.x} ${target.coords.y}`;
          });

        firstTime = false;
      },
      250
    );

    // eslint-disable-next-line consistent-return
    return () => {
      redrawRef.current?.cancel();
      svg.selectAll('g.nodes circle.node').remove();
      svg.selectAll('g.links line.link').remove();
    };
  }, [maxDistance, root]);

  useEffect(() => {
    if (typeof width !== 'undefined') {
      redrawRef.current?.({ width, showDistance, circularLayout });
    }
    layoutRef.current = circularLayout;
  }, [width, showDistance, circularLayout]);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  return (
    <section className="align-result-phylotree">
      <h5>Phylogenetic tree</h5>
      <fieldset>
        <div>
          Branch length:
          <label title="Branch lengths are not proportional to calculated distances">
            <input
              name="distance"
              type="radio"
              checked={!showDistance}
              onChange={() => setShowDistance(false)}
            />
            Cladogram
          </label>
          <label title="Branch lengths are proportional to calculated distances">
            <input
              name="distance"
              type="radio"
              checked={showDistance}
              onChange={() => setShowDistance(true)}
            />
            Phylogram
          </label>
        </div>
        <div>
          Layout:
          <label>
            <input
              name="layout"
              type="radio"
              checked={circularLayout}
              onChange={() => setCircularLayout(true)}
            />
            Circular
          </label>
          <label>
            <input
              name="layout"
              type="radio"
              checked={!circularLayout}
              onChange={() => setCircularLayout(false)}
            />
            Horizontal
          </label>
        </div>
      </fieldset>
      <svg ref={svgRef}>
        <g className="container">
          <g className="links" />
          <g className="labels" />
        </g>
      </svg>
      {hasNegative && (
        <Message level="warning">
          One or more branches contain negative values, shown in red. They
          represent negative distances as measured by the algorithm given the
          specific input you have provided, and they should not be interpreted
          biologically.
        </Message>
      )}
    </section>
  );
};

export default AlignResultPhyloTree;
