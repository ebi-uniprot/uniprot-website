import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { select } from 'd3';

import useSize from '../../../../shared/hooks/useSize';

import { getEntryPathFor } from '../../../../app/config/urls';

import { Namespace } from '../../../../shared/types/namespaces';

import styles from './styles/keywords-graph.module.scss';

const ARROW_WIDTH = 6;
const ARROW_HEIGHT = 4;
const SPACE_BETWEEN_ARROWS = 5;
const getEntryPath = getEntryPathFor(Namespace.keywords);

const renderGraph = (
  width: number,
  height: number,
  xPosition: number,
  yPosition: number,
  links: Set<string>,
  container: HTMLDivElement | null,
  svgElement: SVGSVGElement | null
) => {
  const nodeElements =
    container?.querySelectorAll<HTMLSpanElement>('span.node');

  const nodeDetails: Record<string, HTMLSpanElement> = {};
  nodeElements?.forEach((el) => {
    const key = el.textContent;
    if (key) {
      nodeDetails[key] = el;
    }
  });

  const svg = select(svgElement).attr('width', width).attr('height', height);

  svg.selectAll('line').remove();

  svg
    .append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('markerWidth', ARROW_WIDTH)
    .attr('markerHeight', ARROW_HEIGHT)
    .attr('refX', ARROW_WIDTH * 0.8)
    .attr('refY', ARROW_HEIGHT / 2)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', `M0,0 L${ARROW_WIDTH},${ARROW_HEIGHT / 2} L0,${ARROW_HEIGHT} z`)
    .attr('fill', '#000');

  const targets: string[] = [];
  for (const link of links) {
    let spacing = 0;
    const [source, target] = link.split('|');
    targets.push(target);

    const sourceEl = nodeDetails[source].getBoundingClientRect();
    const targetEl = nodeDetails[target].getBoundingClientRect();
    const x1 = sourceEl.x + sourceEl.width / 2 - xPosition;
    const y1 = sourceEl.y + sourceEl.height - yPosition;
    const targetMidPoint = targetEl.x + targetEl.width / 2 - xPosition;

    // Spacing the arrows based on the source's position whether it is to the left or right of the target in case of multiple parents
    const count = targets.filter((t) => t === target).length;
    if (count > 1) {
      if (x1 < targetMidPoint) {
        spacing -= SPACE_BETWEEN_ARROWS * count;
      } else {
        spacing += SPACE_BETWEEN_ARROWS * count;
      }
    }
    // if (targets.includes(target)) {
    //   // Spacing the arrows based on the source's position whether it is to the left or right of the target in case of multiple parents
    //   if (x1 < targetMidPoint) {
    //     spacing -= SPACE_BETWEEN_ARROWS;
    //   } else {
    //     spacing += SPACE_BETWEEN_ARROWS;
    //   }
    // } else {
    //   targets.push(target);
    // }

    const x2 = targetEl.x + targetEl.width / 2 - xPosition + spacing;
    const y2 = targetEl.y - yPosition;
    svg
      .append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke', '#000')
      .attr('stroke-width', 1.5)
      .attr('marker-end', 'url(#arrow)');
  }
};

type graphProps = {
  nodes: {
    [key: number]: string[];
  };
  links: Set<string>;
  keywords: Map<string, string>;
  currentKeyword?: string;
};

const KeywordsGraph = ({
  nodes,
  links,
  keywords,
  currentKeyword,
}: graphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [size] = useSize(containerRef);

  useLayoutEffect(() => {
    if (size?.width) {
      renderGraph(
        size.width,
        size.height,
        size.x,
        size.y,
        links,
        containerRef.current,
        svgRef.current
      );
    }
  }, [size?.width, size?.height, size?.x, size?.y, links]);

  // Setting the height to a minimum of three levels to avoid cluttering in case of many children
  const height =
    Object.values(nodes).length > 2
      ? `calc(5em * ${Object.values(nodes).length})`
      : `calc(5em * 3)`;

  return (
    <div className={styles.graph} style={{ height }}>
      <div className={styles.container} ref={containerRef} style={{ height }}>
        {Object.values(nodes).map((nodeArray, i) => {
          const id = `level${i}`;
          return (
            <div key={id} className={styles['keyword-node']}>
              {nodeArray.map((node) => {
                const nodeId = keywords.get(node);
                return (
                  <span key={node} className="node">
                    {/* Only generate a link if it's to another keyword */}
                    {nodeId && currentKeyword !== nodeId ? (
                      <Link to={getEntryPath(nodeId)}>{node}</Link>
                    ) : (
                      node
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
      <svg ref={svgRef} className={styles.arrows} />
    </div>
  );
};

export default KeywordsGraph;
