// See https://observablehq.com/@mbostock/tree-of-life for inspiration
import React, { FC, useRef, useEffect, useState } from 'react';
import { Loader } from 'franklin-sites';
import { debounce } from 'lodash-es';
import { cluster, hierarchy, select, HierarchyPointNode } from 'd3';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import phylotree, { findLongerDistance } from '../../adapters/phylotree';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useSize from '../../../../shared/hooks/useSize';

import toolsURLs from '../../../config/urls';

import { JobTypes } from '../../../types/toolsJobTypes';
import { PhyloTreeNode } from '../../types/alignResults';

import './styles/AlignResultPhyloTree.scss';

interface Redraw {
  (
    {
      width,
      showDistance,
      circularLayout,
    }: {
      width: number;
      showDistance: boolean;
      circularLayout: boolean;
    },
    duration: number
  ): void;
}
interface Cancelable {
  cancel(): void;
  flush(): void;
}

interface CustomHierarchyNode extends HierarchyPointNode<PhyloTreeNode> {
  links(): {
    source: CustomHierarchyNode;
    target: CustomHierarchyNode;
  }[];
  coords: {
    x: number;
    y: number;
    radius: number;
    phi: number;
    deg: number;
  };
  linkDOM: SVGElement | null;
}

const margin = 20;

const alignURLs = toolsURLs(JobTypes.ALIGN);

const degToRad = (deg: number) => deg * (Math.PI / 180);
const polToCart = (radius: number, phi: number) => [
  radius * Math.cos(phi),
  radius * Math.sin(phi),
];

const customLayout = () => {
  let maxDistance = 0;
  let maxLabelWidth = 0;
  let width = 0;
  let showDistance = true;
  let circularLayout = true;

  const outputFn = (node: HierarchyPointNode<PhyloTreeNode>) => {
    // recursively do the same for the whole tree
    node.children?.map(outputFn);

    const availableWidth = width - (circularLayout ? 2 : 1) * maxLabelWidth;

    const output = node as Partial<CustomHierarchyNode>;

    output.coords = {
      // switch x and y because default layout assumes top to bottom
      // direct mapping for horizontal layout
      x: output.y || 0,
      y: output.x || 0,
      // mapping through polar coordinates for circular layout
      deg: output.x || 0, // in degrees
      phi: degToRad(output.x || 0), // in radians
      radius: output.y || 0,
    };
    if (showDistance) {
      output.coords.x =
        ((output.data?.distanceFromRoot || 0) / maxDistance) * availableWidth;
      output.coords.radius = output.coords.x / 2;
    }
    if (circularLayout) {
      // the correct data for circular layout is in polar coordinates, convert:
      [output.coords.x, output.coords.y] = polToCart(
        output.coords.radius,
        output.coords.phi
      );
    }
    output.linkDOM = null;

    return output as CustomHierarchyNode;
  };

  // modify values in the function scope by exposing these on the output fn
  // returning the output function to be able to chain them
  outputFn.maxDistance = (value: number) => {
    maxDistance = value;
    return outputFn;
  };
  outputFn.maxLabelWidth = (value: number) => {
    maxLabelWidth = value;
    return outputFn;
  };
  outputFn.width = (value: number) => {
    width = value;
    return outputFn;
  };
  outputFn.showDistance = (value: boolean) => {
    showDistance = value;
    return outputFn;
  };
  outputFn.circularLayout = (value: boolean) => {
    circularLayout = value;
    return outputFn;
  };

  return outputFn;
};

const AlignResultPhyloTree: FC<{ id: string }> = ({ id }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const redrawRef = useRef<Redraw & Cancelable>();

  const [showDistance, setShowDistance] = useState(false);
  const [circularLayout, setCircularLayout] = useState(true);
  const layoutRef = useRef(circularLayout);

  const { loading, data, error, status } = useDataApi<string>(
    alignURLs.resultUrl(id, 'phylotree')
  );

  const [size] = useSize<SVGSVGElement>(svgRef);

  const width = size?.width || 0;

  useEffect(() => {
    // cancel next possible redraw if unmounting this element
    return () => redrawRef.current?.cancel();
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    const parsed = phylotree(data);
    const maxDistance = findLongerDistance(parsed);

    const root = hierarchy(parsed);

    const clusterLayout = cluster<PhyloTreeNode>();
    const customizeLayout = customLayout().maxDistance(maxDistance);

    // it's actually returning the same object, but mutated.
    // using the returned object to have TypeScript happy
    const mutatedRoot = customizeLayout(clusterLayout(root));

    // needed to keep a margin to fit the names, get the longuest name
    const maxNameLength =
      Math.max(...root.leaves().map((d) => d.data.name?.length ?? 0)) * 10;

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
          select(target.linkDOM).classed('hovered', true);
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
      ({ width, showDistance, circularLayout }, duration) => {
        clusterLayout.size([
          circularLayout
            ? 360 // available angles to spread (full circle)
            : width - 2 * margin, // available height to spread
          circularLayout
            ? width / 2 - margin - maxNameLength // available radius
            : width - 2 * margin - maxNameLength, // available width
        ]);

        // mutate
        const mutatedRoot = customizeLayout
          .width(width - 2 * margin)
          .maxLabelWidth(maxNameLength)
          .showDistance(showDistance)
          .circularLayout(circularLayout)(clusterLayout(root));

        // if circular layout, move the 0, 0 reference to the center for easier
        // calculation of coordinates
        container.attr(
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
          .attr('d', ({ source, target }) => {
            if (!circularLayout) {
              return `M${source.coords.x} ${source.coords.y} V${target.coords.y} H${target.coords.x}`;
            }
            const endAngle = polToCart(source.coords.radius, target.coords.phi);
            return `M${source.coords.x} ${source.coords.y} A${
              source.coords.radius
            } ${source.coords.radius} 0 0 ${
              source.coords.phi > target.coords.phi ? 0 : 1
            } ${endAngle[0]} ${endAngle[1]} L${target.coords.x} ${
              target.coords.y
            }`;
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
  }, [data]);

  useEffect(() => {
    if (typeof width !== 'undefined') {
      redrawRef.current?.(
        { width, showDistance, circularLayout },
        layoutRef.current !== circularLayout ? 0 : 500
      );
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
      <svg ref={svgRef} height={width || 400}>
        <g className="container">
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
    </section>
  );
};

export default AlignResultPhyloTree;
