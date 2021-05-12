import convertInteraction from '../interactionConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/entryModelData';

describe('Interaction data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertInteraction(
      modelData,
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
                    uniProtkbAccession: 'P12345',
                  },
                  interactantTwo: {
                    chainId: 'PROC_12347',
                    geneName: 'gene1',
                    intActId: 'EBI-0002',
                    uniProtkbAccession: 'P12345-1',
                  },
                  numberOfExperiments: 3,
                  organismDiffer: true,
                },
                {
                  interactantOne: {
                    chainId: 'PROC_12345',
                    geneName: 'gen',
                    intActId: 'EBI-00011',
                    uniProtkbAccession: 'P12345',
                  },
                  interactantTwo: {
                    chainId: 'PROC_123454',
                    geneName: 'gene1',
                    intActId: 'EBI-00012',
                    uniProtkbAccession: 'P12346',
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
      keywordData: [],
    });
  });
});
