// See https://observablehq.com/@mbostock/tree-of-life for original inspiration
import { useEffect, useRef, useMemo, FC } from 'react';
import { debounce } from 'lodash-es';
import { cluster, hierarchy, select, max, easeQuadOut } from 'd3';
import { Message } from 'franklin-sites';

import AlignLabel from './AlignLabel';

import useSize from '../../../../shared/hooks/useSize';
import { useReducedMotion } from '../../../../shared/hooks/useMatchMedia';

import newicktree from '../../adapters/newicktree';

import extractAccession from '../../utils/extractAccession';
import { polarToX, polarToY } from '../../utils/trigonometry';
import pathMaker from '../../utils/pathMaker';
import customLayout, { CustomHierarchyNode } from '../../utils/customLayout';

import { NewickTreeNode } from '../../types/alignResults';
import { SequenceInfo } from '../../utils/useSequenceInfo';

import './styles/NewickTree.scss';

const DURATION = 500;
const DEBOUNCE_DELAY = 250;
// keep that in case it's needed at a later point as it is now already included
// in all the calculations thorugh this file anyway
const MARGIN = 0;

interface Redraw {
  ({
    width,
    showDistance,
    alignLabels,
    circularLayout,
  }: {
    width: number;
    showDistance: boolean;
    alignLabels: boolean;
    circularLayout: boolean;
  }): void;
}

interface Cancelable {
  cancel(): void;
  flush(): void;
}

type NewickTreeProps = {
  newick?: string;
  showDistance: boolean;
  alignLabels: boolean;
  circularLayout: boolean;
  sequenceInfo: SequenceInfo;
  selectedEntries: string[];
  handleEntrySelection: (rowId: string) => void;
};

const NewickTree: FC<NewickTreeProps> = ({
  newick,
  showDistance,
  alignLabels,
  circularLayout,
  sequenceInfo,
  selectedEntries,
  handleEntrySelection,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const redrawRef = useRef<Redraw & Cancelable>();

  const [size] = useSize(svgRef);
  const reducedMotion = useReducedMotion();

  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

  const width = size?.width || 0;

  const [root, maxDistance, maxDepth, hasNegative] = useMemo(() => {
    const parsed = newicktree(newick);
    const root = hierarchy(parsed)
      .sum((node) => node.distance || 0)
      // sort to have smallest total branches at the top
      .sort((a, b) => (a.value || 0) - (b.value || 0));
    const nodes = root.descendants();
    return [
      root,
      max(nodes.map((node) => node.data.distanceFromRoot || 0)) || 0,
      max(root.leaves().map((leaf) => leaf.depth)) || 1,
      nodes.some((node) => (node.data.distance || 0) < 0),
    ];
  }, [newick]);

  useEffect(() => {
    if (!root.children) {
      return;
    }

    const clusterLayout = cluster<NewickTreeNode>();
    // ensures same space everywhere
    clusterLayout.separation(() => 1);
    const customizeLayout = customLayout().maxDistance(maxDistance);

    // it's actually returning the same object, but mutated.
    // using the returned object to have TypeScript happy
    const mutatedRoot = customizeLayout(clusterLayout(root));

    // needed to keep a margin to fit the names, get the longuest name
    const leaves = root.leaves();
    let maxNameLength = 0;
    const nLeaves = leaves.length;

    const svg = select(svgRef.current).attr('opacity', 0);

    const container = svg
      .select('.container')
      .attr('transform', `translate(${MARGIN},${MARGIN}) translate(0, 0)`);

    // Text labels
    const labels = svg
      .select('g.labels')
      .selectAll<SVGForeignObjectElement, CustomHierarchyNode>(
        'foreignObject.label'
      )
      .data(mutatedRoot.leaves())
      // keep text size once at the beginning before rotating everything
      .each((d, i, domArray) => {
        const el = domArray[i];
        const { width = 0, height = 0 } =
          domArray[i].firstElementChild?.getBoundingClientRect() || {};
        el.setAttribute('width', `${width}`);
        el.setAttribute('height', `${height}`);
        // measure actual size to compare
        const rect = el.getBoundingClientRect();
        // if the difference is higher than 1 (in case rounding happens)
        if (Math.abs(width - rect.width) > 1) {
          // it means zoom is acting up, compensate it
          const correctedWidth = width * (width / rect.width);
          const correctedHeight = height * (height / rect.height);
          el.setAttribute('width', `${correctedWidth}`);
          el.setAttribute('height', `${correctedHeight}`);

          maxNameLength = Math.max(maxNameLength, correctedWidth);
          // eslint-disable-next-line no-param-reassign
          d.textSize = correctedWidth;
        } else {
          maxNameLength = Math.max(maxNameLength, width);
          // eslint-disable-next-line no-param-reassign
          d.textSize = width;
        }
      })
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

    const pm = pathMaker(false);
    // Ends of links
    const endLinks = svg
      .select('g.links')
      .selectAll('path.end-link')
      .data(mutatedRoot.leaves())
      .enter()
      .append('path')
      .classed('end-link', true)
      .attr('d', (d) =>
        pm({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          source: d.parent!,
          target: d,
        })
      );

    // Links
    const links = svg
      .select('g.links')
      .selectAll('path.link')
      .data(mutatedRoot.links())
      .enter()
      .append('path')
      .classed('link', true)
      .classed('nonsense', (d) => (d.target.data.distance ?? 0) < 0)
      .attr('d', pm)
      // keep a reference to the corresponding DOM element in the object
      .each((d, i, domArray) => {
        // eslint-disable-next-line no-param-reassign
        d.target.linkDOM = domArray[i];
      });

    /* REDRAW FUNCTION */
    // debouncing the redraw function to avoid calling it quickly too many times
    redrawRef.current = debounce<Redraw>(
      ({ width, showDistance, alignLabels, circularLayout }) => {
        const availableRadius = width / 2 - MARGIN - maxNameLength;
        const availableWidth = width - 2 * MARGIN - maxNameLength;
        clusterLayout.size([
          circularLayout
            ? 360 // available angles to spread
            : nLeaves * 25, // available height to spread
          circularLayout ? availableRadius : availableWidth,
        ]);

        const duration = reducedMotionRef.current ? 0 : DURATION;

        {
          const height = circularLayout ? width : nLeaves * 25 + 2 * MARGIN;
          svg
            .transition()
            .duration(duration)
            .attr('opacity', 1)
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`);
        }

        // mutate
        const mutatedRoot = customizeLayout
          .width(width - 2 * MARGIN)
          .maxLabelWidth(maxNameLength)
          .showDistance(showDistance)
          .circularLayout(circularLayout)(clusterLayout(root));

        // if circular layout, move the 0, 0 reference to the center for easier
        // calculation of coordinates
        container
          .transition()
          .ease(easeQuadOut)
          .duration(duration)
          .attr(
            'transform',
            `translate(${MARGIN},${MARGIN}) translate(${
              circularLayout ? width / 2 : 0
            }, ${circularLayout ? width / 2 : 0})`
          );

        labels
          .data(mutatedRoot.leaves())
          .merge(labels)
          .transition()
          .duration(duration)
          .delay((d) => duration * (d.depth / maxDepth))
          .attr('opacity', 1)
          .attr('y', -14) // alignment to the middle of the line
          .attr('x', ({ coords: { deg } }) =>
            circularLayout && deg > 90 && deg < 270 ? -6 : 6
          )
          .attr(
            'transform',
            ({ coords: { x, y, deg, phi, radius }, textSize }) => {
              let transform = `translate(${
                alignLabels ? availableWidth : x
              },${y})`;
              if (circularLayout) {
                if (alignLabels) {
                  transform = `translate(${polarToX(
                    availableRadius,
                    phi
                  )},${polarToY(availableRadius, phi)})`;
                }
                // flip text if in quadrant 2 or 3
                const flip = deg > 90 && deg < 270;
                if (flip) {
                  // replace previous translate, as we need to take into account
                  // the position of the node + the text size
                  transform = `translate(${polarToX(
                    (alignLabels ? availableRadius : radius) + (textSize || 0),
                    phi
                  )},${polarToY(
                    (alignLabels ? availableRadius : radius) + (textSize || 0),
                    phi
                  )})`;
                }
                transform += ` rotate(${deg})`;
                if (flip) {
                  transform += ' rotate(180)';
                }
              }
              return transform;
            }
          );

        const pm = pathMaker(circularLayout);

        endLinks
          .data(mutatedRoot.leaves())
          .merge(endLinks)
          .transition()
          .duration(duration)
          .delay((d) => duration * (d.depth / maxDepth))
          .attr('d', (d) => {
            const fakeTarget = { coords: { ...d.coords } };
            if (alignLabels) {
              if (circularLayout) {
                fakeTarget.coords.radius = availableRadius;
                fakeTarget.coords.x = polarToX(
                  availableRadius,
                  fakeTarget.coords.phi
                );
                fakeTarget.coords.y = polarToY(
                  availableRadius,
                  fakeTarget.coords.phi
                );
              } else {
                fakeTarget.coords.x = availableWidth;
              }
            }
            return pm({
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              source: d.parent!,
              target: fakeTarget,
            });
          });

        links
          .data(mutatedRoot.links())
          .merge(links)
          .transition()
          .duration(duration)
          .delay(({ target }) => duration * (target.depth / maxDepth))
          .attr('d', pm);
      },
      DEBOUNCE_DELAY
    );

    // eslint-disable-next-line consistent-return
    return () => {
      redrawRef.current?.cancel();
      svg.selectAll('g.links path').remove();
    };
  }, [maxDepth, maxDistance, root]);

  useEffect(() => {
    if (typeof width !== 'undefined') {
      redrawRef.current?.({ width, showDistance, alignLabels, circularLayout });
    }
  }, [width, showDistance, alignLabels, circularLayout]);

  return (
    <>
      <svg ref={svgRef} className="newicktree">
        <g className="container">
          <g className="links" />
          <g className="labels">
            {root.leaves().map(({ data: { name } }) => {
              const accession = extractAccession(name);
              return (
                <foreignObject className="label" key={name}>
                  <AlignLabel
                    accession={accession}
                    info={sequenceInfo.data.get(accession || '')}
                    loading={sequenceInfo.loading}
                    checked={Boolean(
                      accession && selectedEntries?.includes(accession)
                    )}
                    onSequenceChecked={handleEntrySelection}
                  >
                    {name || ''}
                  </AlignLabel>
                </foreignObject>
              );
            })}
          </g>
        </g>
      </svg>
      {hasNegative && (
        <Message level="warning">
          This is a Neighbour-joining tree without distance corrections.
          <br />
          One or more branches contain negative values, shown in red. They
          represent negative distances as measured by the algorithm given the
          specific input you have provided, and they should not be interpreted
          biologically.
        </Message>
      )}
    </>
  );
};

export default NewickTree;
