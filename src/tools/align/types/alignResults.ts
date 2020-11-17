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

export type AlnClustalSequence = {
  sequence: string;
  name: string;
};

// Parsed output of Alignment in CLUSTAL format with base/residue numbering
// See the following for more details:
//  - ResultFormat[JobTypes.ALIGN][‘aln-clustal_num’]
//  - src/tools/adapters/alnClustalNum.ts
export type AlnClustalNum = {
  sequences: AlnClustalSequence[];
  conservation: string;
};
