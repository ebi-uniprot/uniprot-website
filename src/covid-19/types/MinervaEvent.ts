/* eslint-disable @typescript-eslint/no-explicit-any */
export type MinervaClickEventDetail = {
  entities?: BioEntity[];
  reactions?: Reaction[];
}[];

export interface Bound {
  height: number;
  width: number;
  x: number;
  y: number;
  z: number;
}

export interface Reference {
  annotatorClassName: string;
  id: number;
  link: string;
  resource: string;
  type: string;
  article?: Article;
}

export interface Article {
  title: string;
  authors: Array<string>;
  journal: string;
  year: number;
  link: string;
  id: string | number;
  citationCount: number;
  stringAuthors: string;
}

export interface BioEntity {
  abbreviation?: string;
  activity: boolean;
  boundaryCondition: boolean;
  bounds: Bound;
  compartmentId: number;
  compartment: BioEntity;
  complexId?: number; // TODO: is this a number?
  constant: boolean;
  elementId: string;
  formerSymbols: Array<any>; // TODO:
  formula?: any; // TODO:
  fullName?: string;
  glyph?: any; // TODO:
  hierarchyVisibilityLevel: number; // TODO: Server returns this as a string;
  hypothetical: boolean;
  id: number;
  initialAmount: number;
  initialConcentration?: any; // TODO:
  linkedSubmodel?: any; // TODO:
  modelId: number;
  name: string;
  notes?: string;
  synonyms: Array<string>;
  references: Array<Reference>;
}

export interface Point {
  x: number;
  y: number;
}

export interface Reaction {
  centerPoint: Point;
  hierarchyVisibilityLevel: string;
  id: number;
  kineticLaw: any; // TODO: whats this?
  lines: Array<{
    start: Point;
    end: Point;
    type: 'START' | 'END' | 'MIDDLE'; // TODO: are there others?
  }>;
  modelId: number;
  modifiers: Array<{
    aliasId: number;
    stoichiometry: any; // TODO: whats this?
    element: BioEntity;
  }>;
  notes: string;
  products: Array<{
    aliasId: number;
    stoichiometry: any; // TODO: whats this?
    element: BioEntity;
  }>;

  reactants: Array<{
    aliasId: number;
    stoichiometry: any; // TODO: whats this?
    element: BioEntity;
  }>;
  reactionId: string;
  references: Array<Reference>;
  type: string;
}
