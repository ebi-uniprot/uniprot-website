import {
  MinimumTaxonomyItem,
  TaxonomyEndpointItem,
} from '../../../uniprotkb/types/taxonomyTypes';

export type TaxNode = {
  name: string;
  count: number;
  children: TaxNode[];
  depth: number;
  id?: number; // optional for now, it'd be good to have it eventually
  fullObject?: TaxonomyEndpointItem | MinimumTaxonomyItem;
  parent?: TaxNode;
};

// sort by count, then alphabetically if same value
const sortingFunction = (a: TaxNode, b: TaxNode) =>
  b.count - a.count || a.name.localeCompare(b.name);
export const orderTree = (node: TaxNode): TaxNode => ({
  ...node,
  children: node.children.map(orderTree).sort(sortingFunction),
});

export const populateTree = (tree?: TaxNode, taxonHits?: number[]) => {
  // taverse the tree to find all the leaves matching the hits and set the corresponding counts
  return tree;
};

export const taxonsToTree = (
  taxons?: TaxonomyEndpointItem[]
): TaxNode | undefined => {
  if (!(taxons && taxons.length)) {
    return undefined;
  }

  // tree, as a reference to the root of the tree
  const tree: TaxNode = { name: 'All', count: 0, children: [], depth: 0 };

  // looping over all the hits lineages
  for (const taxon of taxons) {
    // this will be used to navigate the tree
    let currentNode = tree;

    // loop for right to left as higher nodes are last
    for (const lineageTaxon of [taxon, ...(taxon.lineage || [])].reverse()) {
      // find it in the current node's children
      let currentTaxonNode = currentNode.children.find(
        (child) => child.id === lineageTaxon.taxonId
      );

      // if we don't have it yet, create it and append it
      if (!currentTaxonNode) {
        currentTaxonNode = {
          id: lineageTaxon.taxonId,
          name: lineageTaxon.scientificName,
          count: 0,
          children: [],
          depth: currentNode.depth + 1,
          fullObject: lineageTaxon,
          parent: currentNode,
        };
        currentNode.children.push(currentTaxonNode);
      }

      currentNode = currentTaxonNode;
    }
  }

  // eslint-disable-next-line consistent-return
  return tree;
};

const arrayOfLineagesToTree = (lineages?: string[][]): TaxNode | null => {
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
  return orderTree(tree);
};

export default arrayOfLineagesToTree;
