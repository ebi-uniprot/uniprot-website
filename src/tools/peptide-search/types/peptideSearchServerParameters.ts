/* Parameters of a peptide search job as required by the server */
// http://peptidesearch.uniprot.org/

export type PepS = string;

export type TaxIds = string;

export type LEQi = 'on' | 'off';

export type SpOnly = 'on' | 'off';

export type ServerParameters = {
  peps: PepS;
  taxIds?: TaxIds;
  lEQi: LEQi;
  spOnly: SpOnly;
};

// same, because no email was provided before
export type PublicServerParameters = ServerParameters;
