export interface MinervaEventDetail {
  centerPoint: CenterPoint;
  hierarchyVisibilityLevel: string;
  id: number;
  kineticLaw: null;
  lines: Line[];
  modelId: number;
  modifiers: Modifier[];
  notes: string;
  products: Modifier[];
  reactants: Modifier[];
  reactionId: string;
  references: Reference[];
  type: string;
}

export interface CenterPoint {
  x: number;
  y: number;
}

export interface Line {
  start: CenterPoint;
  end: CenterPoint;
  type: string;
}

export interface Modifier {
  aliasId: number;
  stoichiometry: null;
  element: Ment;
}

export interface Ment {
  abbreviation: null;
  activity: boolean | null;
  boundaryCondition: boolean | null;
  bounds: Bounds;
  compartmentId: number;
  complexId: null;
  constant: boolean | null;
  elementId: string;
  formerSymbols: any[];
  formula: null;
  fullName: null | string;
  glyph: null;
  hierarchyVisibilityLevel: string;
  hypothetical: boolean | null;
  id: number;
  initialAmount: number | null;
  initialConcentration: null;
  linkedSubmodel: null;
  modelId: number;
  name: string;
  notes: string;
  other: Other;
  references: Reference[];
  symbol: null;
  synonyms: string[];
  transparencyLevel: string;
  type: Type;
  compartment?: Ment;
}

export interface Bounds {
  height: number;
  width: number;
  x: number;
  y: number;
  z: number;
}

export interface Other {
  modifications: Modification[];
  structuralState: null;
  structures: Structures;
}

export interface Modification {
  modificationId: string;
  name: string;
  type: string;
  state?: string;
}

export interface Structures {}

export interface Reference {
  annotatorClassName: AnnotatorClassName;
  id: number;
  link: string;
  resource: string;
  type: string;
  article?: Article;
}

export enum AnnotatorClassName {
  Empty = '',
  LcsbMapviewerAnnotationServicesAnnotatorsHgncAnnotator = 'lcsb.mapviewer.annotation.services.annotators.HgncAnnotator',
}

export interface Article {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  link: string;
  id: string;
  citationCount: number;
  stringAuthors: string;
}

export enum Type {
  Complex = 'Complex',
  Pathway = 'Pathway',
  Protein = 'Protein',
}
