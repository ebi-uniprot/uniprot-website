import { Citation } from '../../shared/types/apiModel';

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

export type LiteratureStatistics = {
  reviewedProteinCount?: number;
  unreviewedProteinCount?: number;
  computationallyMappedProteinCount?: number;
  communityMappedProteinCount?: number;
};

// export type LiteratureForProteinAPI = {
//   reference: Reference;
//   statistics?: LiteratureStatistics;
//   categories?: string[];
// };

export type LiteratureResultsAPI = {
  citation: Citation;
  references: Reference[];
  statistics?: LiteratureStatistics;
};
