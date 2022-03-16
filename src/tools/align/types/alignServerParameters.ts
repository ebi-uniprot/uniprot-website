/* Parameters of an align job as required by the server */
// https://www.ebi.ac.uk/Tools/services/rest/clustalo?wadl
// https://www.ebi.ac.uk/Tools/services/rest/clustalo/parameters
// parameter-specific documentation at
// https://www.ebi.ac.uk/Tools/services/rest/clustalo/parameterdetails/<parameter_name>

export type ServerParameters = {
  email: string; // email
  // A title to identify the analysis job (managed by the server, different
  // than our job name)
  title?: string;
  guidetreeout?: boolean;
  dismatout?: boolean;
  dealign?: boolean;
  mbed?: boolean;
  mbediteration?: boolean;
  iterations?: 0 | 1 | 2 | 3 | 4 | 5;
  gtiterations?: number;
  hmmiterations?: number;
  outfmt?: string;
  order?: 'aligned' | 'input';
  stype?: string;
  sequence: string; // sequence
};

export type PublicServerParameters = Omit<ServerParameters, 'email'>;
