import { type Evidence } from './modelTypes';

export type GeneLocation = {
  geneEncodingType: string;
  value: string;
  evidences?: Evidence[];
};
