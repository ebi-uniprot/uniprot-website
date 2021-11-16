import { Graph, Thing } from 'schema-dts';
import { TransformedVariant } from 'protvista-variation-adapter';

import { ProcessedFeature } from './FeaturesView';
import { UniParcProcessedFeature } from '../../../uniparc/components/entry/UniParcFeaturesView';

const dataToSchema = <
  T extends ProcessedFeature | TransformedVariant | UniParcProcessedFeature
>(
  data?: T[]
): Graph | undefined => {
  if (!data) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return {
    '@context': 'https://schema.org',
    '@graph': data.map(
      (datum) =>
        ({
          '@type': 'SequenceAnnotation',
          'http://purl.org/dc/terms/conformsTo': {
            '@id':
              'https://bioschemas.org/profiles/SequenceAnnotation/0.7-DRAFT',
          },
          // long term, replace to use the `location` complex field
          sequenceLocation: {
            '@type': 'SequenceRange',
            'http://purl.org/dc/terms/conformsTo': {
              '@id':
                'https://bioschemas.org/types/SequenceRange/0.1-DRAFT-2019_06_21',
            },
            rangeStart: datum.start,
            rangeEnd: datum.end,
          },
          name: datum.type,
          description: 'description' in datum ? datum.description : undefined,
          // Might be heavy?
          sequenceValue: 'sequence' in datum ? datum.sequence : undefined,
          isPartOfBioChemEntity: {
            '@id': window.location.href,
          },
        } as unknown as Thing)
    ),
  };
};

export default dataToSchema;
