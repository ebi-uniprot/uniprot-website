import { FormParameters } from '../types/blastFormParameters';
import {
  ServerParameters,
  PublicServerParameters,
} from '../types/blastServerParameters';

const DEFAULT_EMAIL = 'uuw_dev@uniprot.org';

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

export const formParameterToServerParameters = (
  formParameters: FormParameters
) => {
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
    program,
    email: DEFAULT_EMAIL,
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

export const serverParametersToFormParameters = (
  serverParameters: PublicServerParameters
): FormParameters => {
  const {
    program,
    matrix,
    scores,
    alignments,
    exp,
    filter,
    gapalign,
    taxids,
    stype,
    sequence,
    database,
  } = serverParameters;

  if (scores !== alignments) {
    // eslint-disable-next-line no-console
    console.warn(
      `mismatch between number of scores (${scores}) and number of alignments (${alignments})`
    );
  }

  const formParameters: FormParameters = {
    program,
    matrix,
    hits: +scores as FormParameters['hits'],
    threshold: exp,
    filter,
    gapped: Boolean(gapalign),
    taxIDs: (taxids || '')
      .split(',')
      .filter(Boolean)
      .map((taxid) => ({ id: taxid.trim(), label: taxid.trim() })),
    stype,
    sequence,
    database,
  };

  return formParameters;
};
