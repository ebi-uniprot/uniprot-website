import React, { FC, useMemo, useState } from 'react';
import { DoughnutChart } from 'franklin-sites';

import { EnrichedData } from './BlastResult';

import './styles/blast-result-taxonomy.scss';

type TaxNode = {
  name: string;
  count: number;
  children: TaxNode[];
};

const orderChildren = (node: TaxNode): TaxNode => ({
  ...node,
  children: node.children.map(orderChildren).sort((a, b) => b.count - a.count),
});

const createTree = (data: EnrichedData | null) => {
  if (!data) {
    return null;
  }

  const lineages: string[][] = data.hits
    // extract lineages and do copy (to not mess up the original)
    .map((hit) => Array.from(hit?.extra?.organism?.lineage ?? []))
    // filter out no data
    .filter((lineage) => lineage.length);

  // tree, as a reference to the root of the tree
  const tree: TaxNode = { name: 'All', count: 0, children: [] };

  // looping over all the hits lineages
  for (const lineage of lineages) {
    tree.count += 1;
    // this will be used to navigate the tree
    let currentNode = tree;
    // while loop over all the organism from the left to the right of the array
    while (lineage.length) {
      // extract higher organism to process
      const currentOrganism = lineage.shift();
      if (!currentOrganism) {
        continue; // eslint-disable-line no-continue
      }
      // find it in the current node's children
      let currentOrganismNode = currentNode.children.find(
        (child) => child.name === currentOrganism
      );
      // if we don't have it yet, create it and append it
      if (!currentOrganismNode) {
        currentOrganismNode = {
          name: currentOrganism,
          count: 0,
          children: [],
        };
        currentNode.children.push(currentOrganismNode);
      }
      currentOrganismNode.count += 1;
      currentNode = currentOrganismNode;
    }
  }
  // here we have the full tree generated
  // now mutate it to order by number of children
  return orderChildren(tree);
};

type TaxItemProps = {
  taxNode: TaxNode;
  ratio: number;
};

const TaxItem: FC<TaxItemProps> = ({ taxNode, ratio }) => {
  const [open, setOpen] = useState(true);

  let arrowMaybe = null;
  if (taxNode.children.length) {
    arrowMaybe = open ? '▿' : '▹';
  }

  // eslint-disable-next-line no-shadow
  const handleClick = () => setOpen((open) => !open);

  return (
    <>
      <button type="button" onClick={handleClick}>
        {<DoughnutChart size="small" percent={Math.round(ratio * 100)} />}{' '}
        {taxNode.name} (count: {taxNode.count}) {arrowMaybe}
      </button>
      <ul>
        {open &&
          taxNode.children.map((child) => (
            <li key={child.name}>
              <TaxItem taxNode={child} ratio={child.count / taxNode.count} />
            </li>
          ))}
      </ul>
    </>
  );
};

const BlastResultToolInput: FC<{ data: EnrichedData | null }> = ({ data }) => {
  const tree = useMemo(() => createTree(data), [data]);

  if (!tree) {
    return null;
  }

  return (
    <section className="blast-taxonomy">
      Taxonomy tree of the results:
      <ul>
        <li>
          <TaxItem taxNode={tree} ratio={1} />
        </li>
      </ul>
    </section>
  );
};

export default BlastResultToolInput;
