import { FormParameters } from '../types/blastFormParameters';
import { ServerParameters } from '../types/blastServerParameters';

const createFormData = (serverParameters: ServerParameters) => {
  const formData = new FormData();
  Object.keys(serverParameters).forEach((key) => {
    const value = serverParameters[key as keyof ServerParameters];
    if (value) {
      formData.append(key, String(value));
    }
  });
  return formData;
};

const convertFormParametersForServer = (formParameters: FormParameters) => {
  const {
    program,
    matrix,
    hits,
    threshold,
    filter,
    gapped,
    taxIDs = [],
    stype,
    sequence,
    database,
  } = formParameters;

  const serverParameters: ServerParameters = {
    program, // program
    email: 'uuw_dev@uniprot.org',
    matrix,
    alignments: hits,
    scores: hits,
    exp: threshold,
    filter,
    gapalign: gapped,
    taxids: taxIDs && taxIDs.map(({ id }) => id).join(','),
    stype,
    sequence,
    database,
  };

  return createFormData(serverParameters);
};

export default convertFormParametersForServer;
