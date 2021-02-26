export type Statistics = {
  computationallyMappedProteinCount: number;
  largeScale?: boolean;
  communityMappedProteinCount: number;
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
};

export type CitationXRef = {
  database?: string;
  id?: string;
  properties?: { [key: string]: string };
  additionalIds?: string[];
  isoformId?: string;
  implicit?: true;
};

export type Citation = {
  citationType?: string;
  authors?: string[];
  citationCrossReferences?: CitationXRef[];
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

export type CitationsAPIModel = {
  statistics: Statistics;
  citation: Citation;
};

export type CitationsUIModel = CitationsAPIModel & {
  // any addition/change by the converter
};

const citationsConverter = (data: CitationsAPIModel): CitationsUIModel => ({
  ...data,
});

export default citationsConverter;
