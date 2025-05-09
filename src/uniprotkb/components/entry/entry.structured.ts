import { WithContext } from 'schema-dts';

import { getEntryPath } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import { TabLocation } from '../../types/entry';

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
      hasRepresentation: data.sequence?.value,
    },
  };
};

export default dataToSchema;
