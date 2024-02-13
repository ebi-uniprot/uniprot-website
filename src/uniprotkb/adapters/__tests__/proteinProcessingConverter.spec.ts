import convertProteinProcessing from '../proteinProcessingConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';

describe('Protein processing data converter', () => {
  it('should convert the data', () => {
    const convertedData = convertProteinProcessing(
      modelData,
      databaseInfoMaps,
      convertXrefProperties(modelData.uniProtKBCrossReferences)
    );
    expect(convertedData).toEqual({
      featuresData: [
        {
          alternativeSequence: {
            alternativeSequences: ['alternative value'],
            originalSequence: 'original value',
          },
          featureCrossReferences: [{ database: 'dbSNP', id: 'db id' }],
          description: 'description value 123',
          evidences: [
            { evidenceCode: 'ECO:0000269', id: '11389730', source: 'PubMed' },
          ],
          featureId: 'id value CHAIN',
          ligand: {
            id: 'ChEBICHEBI:3214',
            label: 'A1',
            name: 'Ca(2+)',
            note: 'Some note',
          },
          ligandPart: {
            id: 'ChEBICHEBI:3314',
            label: 'A2',
            name: 'Cu(2+)',
            note: 'Some note',
          },
          location: {
            end: { modifier: 'EXACT', value: 8 },
            start: { modifier: 'EXACT', value: 2 },
            sequence: 'sequence 1',
          },
          type: 'Chain',
        },
      ],
      isoforms: ['name'],
      commentsData: new Map([['PTM', []]]),
      xrefData: [],
      keywordData: [],
    });
  });
});
