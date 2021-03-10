import { Citation } from '../../supporting-data/citations/adapters/citationsConverter';

export type Reference = {
  citation?: Citation;
  referencePositions?: string[];
  referenceComments?: {
    value: string;
    type: string;
  }[];
  source: { name: string; id?: string };
  pubMedId?: string;
  sourceCategories?: string[];
  referenceNumber?: number; // Only for UniProtKB (trembl and swissprot)
  communityAnnotation?: CommunityAnnotation; // Only for community annotations
  annotation?: string; // Only for computationally mapped
};

export interface CommunityAnnotation {
  proteinOrGene?: string;
  function?: string;
  comment?: string;
  disease?: string;
}
