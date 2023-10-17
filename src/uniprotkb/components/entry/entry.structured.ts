import { WithContext } from 'schema-dts';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';
import { TabLocation } from './Entry';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

const dataToSchema = (
  data?: UniProtkbAPIModel
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): WithContext<any> => {
  if (!data) {
    return;
  }

  const url = `https://www.uniprot.org${getEntryPath(
    Namespace.uniprotkb,
    data.primaryAccession,
    TabLocation.Entry
  )}`;

  // eslint-disable-next-line consistent-return
  return {
    '@context': [
      {
        '@base': 'http://schema.org',
      },
      {
        Protein: {
          '@id': 'http://purl.obolibrary.org/obo/PR_000000001',
        },
      },
    ],
    '@type': 'DataRecord',
    url,
    mainEntity: {
      '@type': ['Protein', 'BioChemEntity'],
      '@id': url,
      identifier: data.primaryAccession,
      name:
        data.proteinDescription?.recommendedName?.fullName.value ||
        data.proteinDescription?.submissionNames?.[0].fullName.value,
      url,
      hasRepresentation: data.sequence.value,
    },
  };
};

export default dataToSchema;
