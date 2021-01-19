import { Xref } from './commentTypes';

export type Citation = {
  citationType?: string;
  authors?: string[];
  citationCrossReferences?: Xref[];
  title?: string;
  publicationDate?: string;
  journal?: string;
  firstPage?: string;
  lastPage?: string;
  volume?: string;
  completeAuthorList?: boolean;
  literatureAbstract?: string;
  authoringGroup?: string[];
  submissionDatabase?: string;
};

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
