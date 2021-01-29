import { Citation } from '../../shared/types/apiModel';

export type Reference = {
  citation: Citation;
  referencePositions?: string[];
  referenceComments?: {
    value: string;
    type: string;
  }[];
};

export type LiteratureStatistics = {
  reviewedProteinCount?: number;
  unreviewedProteinCount?: number;
  mappedProteinCount?: number;
};

export type LiteratureForProteinAPI = {
  reference: Reference;
  statistics?: LiteratureStatistics;
  categories?: string[];
  publicationSource?: string;
};

export type LiteratureAPI = {
  citation: Citation;
  statistics?: LiteratureStatistics;
};
