import convertProteinProcessing from '../ProteinProcessingConverter';
import modelData from '../../../__mocks__/entryModelData.json';
import { convertXrefProperties } from '../../UniProtkbConverter';

describe('Protein processing data converter', () => {
  beforeAll(() => {
    modelData.uniProtKBCrossReferences = convertXrefProperties(
      modelData.uniProtKBCrossReferences
    );
  });

  test('should convert the data', () => {
    const convertedData = convertProteinProcessing(modelData);
    expect(convertedData).toEqual({
      featuresData: [
        {
          alternativeSequence: {
            alternativeSequences: ['alternative value'],
            originalSequence: 'original value',
          },
          featureCrossReference: { database: 'dbSNP', id: 'db id' },
          description: 'description value',
          evidences: [
            { evidenceCode: 'ECO:0000269', id: '11389730', source: 'PubMed' },
          ],
          featureId: 'id value',
          location: {
            end: { modifier: 'EXACT', value: 8 },
            start: { modifier: 'EXACT', value: 2 },
            sequence: 'sequence 1',
          },
          type: 'chain',
        },
      ],
      commentsData: new Map([['PTM', []]]),
      xrefData: [],
      keywordData: [],
    });
  });
});
