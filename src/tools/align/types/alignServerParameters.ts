/* Parameters of a blast job as required by the server */
// https://wwwdev.ebi.ac.uk/Tools/services/rest/clustalo?wadl
// https://wwwdev.ebi.ac.uk/Tools/services/rest/clustalo/parameters
// parameter-specific documentation at
// https://wwwdev.ebi.ac.uk/Tools/services/rest/clustalo/parameterdetails/<parameter_name>

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
  iterations?: number;
  gtiterations?: number;
  hmmiterations?: number;
  outfmt?: string;
  order?: string;
  stype?: string;
  sequence: string; // sequence
};

// same, but without the email, as the server will not send that with the rest
// of the input params
export type PublicServerParameters = Omit<ServerParameters, 'email'>;
