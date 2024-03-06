import { SetRequired } from 'type-fest';

import { Statistics } from '../../../shared/types/apiModel';
import { Evidence } from '../../../uniprotkb/types/modelTypes';

export enum CitationXRefDB {
  PubMed = 'PubMed',
  DOI = 'DOI',
}

export type CitationXRefDBType = `${CitationXRefDB}`;

export type CitationXRef = {
  database?: CitationXRefDBType | string;
  id?: string;
};

export type CitationType =
  | 'journal article'
  | 'book'
  | 'online journal article'
  | 'patent'
  | 'submission'
  | 'thesis'
  | 'UniProt indexed literatures'
  | 'unpublished observations';

export type Citation = {
  // Either a pubmed ID, or a CI-<hash> internal hash if pubmed unavailable, or
  // IND<...> also available in the data
  id: `${number}` | `CI-${string}` | `IND${string}`;
  citationType?: CitationType;
  authors?: string[];
  citationCrossReferences?: CitationXRef[];
  title?: string;
  // Will always be a string, could be like '2000', or 'DEC-2000'.
  publicationDate?: string;
  institute?: string;
  patentNumber?: string;
  bookName?: string;
  editors?: string[];
  journal?: string;
  locator?: string;
  firstPage?: string;
  lastPage?: string;
  volume?: string;
  publisher?: string;
  address?: string;
  completeAuthorList?: boolean;
  literatureAbstract?: string;
  authoringGroup?: string[];
  submissionDatabase?: string;
};

export type SourceCategory =
  | 'Function'
  | 'Names'
  | 'Subcellular Location'
  | 'Disease & Variants'
  | 'Phenotypes & Variants'
  | 'PTM / Processing'
  | 'Expression'
  | 'Interaction'
  | 'Structure'
  | 'Family & Domains'
  | 'Sequences';

export type ReferenceComment = {
  value: string;
  type: string;
  evidences?: Evidence[];
};

export type Reference = {
  citationId?: Citation['id'];
  referencePositions?: string[];
  referenceComments?: ReferenceComment[];
  evidences?: Evidence[];
  source?: { name: string; id?: string };
  pubMedId?: string;
  sourceCategories?: SourceCategory[];
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

const getCitationPubMedId = (citation: Citation) =>
  citation.citationCrossReferences?.find((xref) => xref.database === 'PubMed');

const getDoiXref = (citation: Citation) =>
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
    submissionDatabase: citation?.submissionDatabase,
    citationType: citation?.citationType,
    locator: citation?.locator,
    editors: citation.editors,
    bookName: citation.bookName,
    publisher: citation.publisher,
    address: citation.address,
    patentNumber: citation.patentNumber,
  };

  return { pubmedId, journalInfo };
};

const citationsConverter = (data: CitationsAPIModel): CitationsUIModel => ({
  ...data,
});

export default citationsConverter;
