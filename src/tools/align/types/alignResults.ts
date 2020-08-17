/* Results as given by the server */
/* and also adding the results afters parsing because server just gives text */

export type AlignResults = string;

export type PhyloTreeNode = {
  name?: string;
  distance?: number;
  distanceFromRoot?: number;
  children?: PhyloTreeNode[];
};
export type PhyloTree = PhyloTreeNode;

export type PIMRow = { name: string; accession?: string; values: number[] };
export type PIM = PIMRow[];
