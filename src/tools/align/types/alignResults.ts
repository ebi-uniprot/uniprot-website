/* Results as given by the server */
/* and also adding the results afters parsing because server just gives text */

// TODO

export type AlignResults = string;

export type PIMRow = { name: string; accession?: string; values: number[] };
export type PIM = PIMRow[];
