import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { select } from 'd3';

import useSize from '../../../../shared/hooks/useSize';

import { getEntryPathFor } from '../../../../app/config/urls';

import { Namespace } from '../../../../shared/types/namespaces';

import styles from './styles/keywords-graph.module.scss';

const ARROW_WIDTH = 6;
const ARROW_HEIGHT = 4;
const getEntryPath = getEntryPathFor(Namespace.keywords);

const renderGraph = (
  width: number,
  height: number,
  xPosition: number,
  yPosition: number,
  links: string[],
  container: HTMLDivElement | null,
  svgElement: SVGSVGElement | null
) => {
  const nodeElements =
    container?.querySelectorAll<HTMLSpanElement>(`span.node`);

  const nodeDetails: Record<string, HTMLSpanElement> = {};
  nodeElements?.forEach((el) => {
    const key = el.textContent;
    nodeDetails[`keyword-${key}`] = el;
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

  for (let i = 0; i < links.length; i += 1) {
    const [source, target] = links[i].split('|');
    const sourceEl = nodeDetails[`keyword-${source}`].getBoundingClientRect();
    const targetEl = nodeDetails[`keyword-${target}`].getBoundingClientRect();
    const x1 = sourceEl.x + sourceEl.width / 2 - xPosition;
    const y1 = sourceEl.y + sourceEl.height - yPosition;
    const x2 = targetEl.x + targetEl.width / 2 - xPosition;
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
  links: string[];
  keywords: Map<string, string>;
};

const KeywordsGraph = ({ nodes, links, keywords }: graphProps) => {
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

  return (
    <div className={styles.graph}>
      <div className={styles.container} ref={containerRef}>
        {Object.values(nodes).map((nodeArray, i) => {
          const id = `level${i}`;
          return (
            <div key={id} className={styles['keyword-node']}>
              {nodeArray.map((node) => {
                const nodeId = keywords.get(node);
                return (
                  <span key={`keyword-${node}`} className="node">
                    {nodeId ? (
                      <Link to={getEntryPath(nodeId)}>{node}</Link>
                    ) : (
                      { node }
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
