/* Parameters of a peptide search job as required by the server */
// http://peptidesearch.uniprot.org/

export type peps = string;

export type taxIds = string;

export type lEQi = 'on' | 'off';

export type spOnly = 'on' | 'off';

export type ServerParameters = {
  peps: peps;
  taxIds?: taxIds;
  lEQi: lEQi;
  spOnly: spOnly;
};

// same, because no email was provided before
export type PublicServerParameters = ServerParameters;
