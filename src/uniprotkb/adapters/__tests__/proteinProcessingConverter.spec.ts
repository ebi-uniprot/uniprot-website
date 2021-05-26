import convertProteinProcessing from '../proteinProcessingConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';

describe('Protein processing data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertProteinProcessing(
      modelData,
      convertXrefProperties(modelData.uniProtKBCrossReferences)
    );
    expect(convertedData).toEqual({
      featuresData: [
        {
          alternativeSequence: {
            alternativeSequences: ['alternative value'],
            originalSequence: 'original value',
          },
          featureCrossReference: { database: 'dbSNP', id: 'db id' },
          description: 'description value 123',
          evidences: [
            { evidenceCode: 'ECO:0000269', id: '11389730', source: 'PubMed' },
          ],
          featureId: 'id value CHAIN',
          location: {
            end: { modifier: 'EXACT', value: 8 },
            start: { modifier: 'EXACT', value: 2 },
            sequence: 'sequence 1',
          },
          type: 'Chain',
        },
      ],
      commentsData: new Map([['PTM', []]]),
      xrefData: [],
      keywordData: [],
    });
  });
});
