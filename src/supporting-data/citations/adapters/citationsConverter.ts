import { SetRequired } from 'type-fest';

import { Statistics } from '../../../shared/types/apiModel';

export enum CitationXRefDB {
  PubMed = 'PubMed',
  DOI = 'DOI',
}

export type CitationXRefDBType = `${CitationXRefDB}`;

export type CitationXRef = {
  database?: CitationXRefDBType | string;
  id?: string;
};

export type Citation = {
  // Either a pubmed ID, or a CI-<hash> internal hash if pubmed unavailable, or
  // IND<...> also available in the data
  id: `${number}` | `CI-${string}` | `IND${string}`;
  citationType?: string;
  authors?: string[];
  citationCrossReferences?: CitationXRef[];
  title?: string;
  // Will always be a string, could be like '2000', or 'DEC-2000'.
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
  citationId?: Citation['id'];
  referencePositions?: string[];
  referenceComments?: {
    value: string;
    type: string;
  }[];
  source?: { name: string; id?: string };
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

export type CitationsAPIModel = {
  statistics?: SetRequired<
    Statistics,
    'computationallyMappedProteinCount' | 'communityMappedProteinCount'
  > & {
    largeScale?: boolean;
  };
  citation: Citation;
  references?: Reference[];
};

export type CitationsUIModel = CitationsAPIModel & {
  // any addition/change by the converter
};

export const getCitationPubMedId = (citation: Citation) =>
  citation.citationCrossReferences?.find((xref) => xref.database === 'PubMed');

export const getDoiXref = (citation: Citation) =>
  citation.citationCrossReferences?.find((xref) => xref.database === 'DOI');

// Note, should this be done as part of citationsConverter?
export const formatCitationData = (citation: Citation) => {
  const pubMedXref = getCitationPubMedId(citation);

  const doiXref = getDoiXref(citation);

  const pubmedId = pubMedXref && pubMedXref.id;

  const journalInfo = {
    journal: citation.journal,
    volume: citation.volume,
    firstPage: citation.firstPage,
    lastPage: citation.lastPage,
    publicationDate: citation.publicationDate,
    doiId: doiXref?.id,
  };
  return { pubmedId, journalInfo };
};

const citationsConverter = (data: CitationsAPIModel): CitationsUIModel => ({
  ...data,
});

export default citationsConverter;
