import { type WithContext } from 'schema-dts';

import { getCanonicalURL, getEntryPath } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { type UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import { TabLocation } from '../../types/entry';

const dataToSchema = (
  data?: UniProtkbAPIModel
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): WithContext<any> => {
  if (!data) {
    return;
  }

  // Same helper as the page's <link rel="canonical">, so the two cannot disagree
  const url = getCanonicalURL(
    getEntryPath(Namespace.uniprotkb, data.primaryAccession, TabLocation.Entry)
  );

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
