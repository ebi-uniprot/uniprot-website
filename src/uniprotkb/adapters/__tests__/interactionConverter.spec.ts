import convertInteraction from '../interactionConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';

describe('Interaction data converter', () => {
  it('should convert the data', () => {
    const convertedData = convertInteraction(
      modelData,
      databaseInfoMaps,
      convertXrefProperties(modelData.uniProtKBCrossReferences)
    );
    expect(convertedData).toEqual({
      commentsData: new Map([
        [
          'INTERACTION',
          [
            {
              commentType: 'INTERACTION',
              interactions: [
                {
                  interactantOne: {
                    chainId: 'PROC_12344',
                    geneName: 'gen',
                    intActId: 'EBI-0001',
                    uniProtKBAccession: 'P21802',
                  },
                  interactantTwo: {
                    chainId: 'PROC_12347',
                    geneName: 'gene1',
                    intActId: 'EBI-0002',
                    uniProtKBAccession: 'P12345-1',
                  },
                  numberOfExperiments: 3,
                  organismDiffer: true,
                },
                {
                  interactantOne: {
                    chainId: 'PROC_12345',
                    geneName: 'gen',
                    intActId: 'EBI-00011',
                    uniProtKBAccession: 'P12345',
                  },
                  interactantTwo: {
                    chainId: 'PROC_123454',
                    geneName: 'gene1',
                    intActId: 'EBI-00012',
                    uniProtKBAccession: 'P21802',
                  },
                  numberOfExperiments: 6,
                  organismDiffer: true,
                },
              ],
            },
          ],
        ],
        ['SUBUNIT', []],
      ]),
      xrefData: [],
      featuresData: [],
      isoforms: ['name'],
      keywordData: [],
    });
  });
});
