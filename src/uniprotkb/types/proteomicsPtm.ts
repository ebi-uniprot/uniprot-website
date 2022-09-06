// Correponds to eg https://www.ebi.ac.uk/proteins/api/proteomics-ptm/Q653S1

import { ConfidenceScore } from '../components/protein-data-views/UniProtKBFeaturesView';

export type ProteomicsPtm = {
  accession: string;
  entryName: string;
  sequence: string;
  sequenceChecksum: string;
  taxid: number;
  features: ProteomicsPtmFeature[];
};

export type ProteomicsPtmFeature = {
  type: string;
  begin: string;
  end: string;
  xrefs: Xref[];
  evidences: Evidence[];
  peptide: string;
  unique: boolean;
  ptms: PTM[];
};

type Evidence = {
  code: string;
  source: Source;
};

type Source = {
  id: string;
  url: string;
};

export type PTM = {
  name: string;
  position: number;
  sources: string[];
  dbReferences: DBReference[];
};

type DBReference = {
  id: string;
  properties: Properties;
};

type Properties = {
  'Pubmed ID': string;
  'PSM Score': string;
  'Dataset ID': string;
  'Organism part': string;
  'Binomial final adjusted q_value': string;
  'Universal Spectrum Id': string;
  'PSM Count': string;
  'Final adjusted site probability': string;
  'Site probability': string;
  'Confidence score': ConfidenceScore; // TODO: subject to change - confirm when API is stable; remove optional type
};

type Xref = {
  name: string;
  id: string;
  url: string;
};
