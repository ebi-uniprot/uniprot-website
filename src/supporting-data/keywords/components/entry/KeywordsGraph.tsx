import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { select } from 'd3';

import useSize from '../../../../shared/hooks/useSize';
import { Namespace } from '../../../../shared/types/namespaces';
import { getEntryPathFor } from '../../../../app/config/urls';

import styles from './styles/keywords-graph.module.css';
import { sleep } from 'timing-functions';

const ARROW_WIDTH = 5;
const ARROW_HEIGHT = 3;
const getEntryPath = getEntryPathFor(Namespace.keywords);

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

  const nodeDetails = {};

  const renderGraph = (
    width: number,
    height: number,
    xPosition: number,
    yPosition: number
  ) => {
    const container = containerRef.current;
    const nodeElements = container?.querySelectorAll('span.node');

    nodeElements?.forEach((el) => {
      const key = el.textContent;
      nodeDetails[`keyword ${key}`] = el;
    });

    const svg = select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('line').remove();

    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('markerWidth', ARROW_WIDTH)
      .attr('markerHeight', ARROW_HEIGHT)
      .attr('refX', 0)
      .attr('refY', 1.5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0 L3,1.5 L0,3 z')
      .attr('fill', '#000');

    for (let i = 0; i < links.length; i += 1) {
      const [source, target] = links[i].split('|');
      const sourceEl = nodeDetails[`keyword ${source}`].getBoundingClientRect();
      const targetEl = nodeDetails[`keyword ${target}`].getBoundingClientRect();
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

  useEffect(() => {
    if (size) {
      renderGraph(size.width, size.height, size.x, size.y);
    }
  }, [size?.width, size?.height, size?.x, size?.y, nodes, links]);

  return (
    <div className={styles['graph']}>
      <div className={styles['container']} ref={containerRef}>
        {Object.values(nodes).map((nodeArray, i) => (
          <div key={i} className={styles['keyword-node']}>
            {nodeArray.map((node) => (
              <span key={`keyword ${node}`} className="node">
                <Link to={getEntryPath(keywords.get(node))}>{node}</Link>
              </span>
            ))}
          </div>
        ))}
      </div>
      <svg ref={svgRef} className={styles['arrows']} />
    </div>
  );
};

export default KeywordsGraph;
