export type TaxNode = {
  name: string;
  count: number;
  children: TaxNode[];
  depth: number;
  id?: number; // optional for now, it'd be good to have it eventually
};

const orderChildren = (node: TaxNode): TaxNode => ({
  ...node,
  children: node.children.map(orderChildren).sort((a, b) => b.count - a.count),
});

const arrayOfLineagesToTree = (lineages?: string[][]) => {
  if (!(lineages && lineages.length)) {
    return null;
  }

  // tree, as a reference to the root of the tree
  const tree: TaxNode = { name: 'All', count: 0, children: [], depth: 0 };

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
          depth: currentNode.depth + 1,
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

export default arrayOfLineagesToTree;
