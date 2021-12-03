import convertFunction from '../functionConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../__mocks__/databaseInfoMaps';

const data = convertFunction(
  modelData,
  databaseInfoMaps,
  convertXrefProperties(modelData.uniProtKBCrossReferences)
);

describe('Function data converter', () => {
  test('should convert cofactors', () => {
    const { commentsData } = data;
    expect(commentsData.get('COFACTOR')).toEqual([
      {
        cofactors: [
          {
            cofactorCrossReference: { database: 'ChEBI', id: 'CHEBI:314' },
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                id: 'PIRNR001361',
                source: 'PIRNR',
              },
            ],
            name: 'Cofactor Name',
          },
        ],
        commentType: 'COFACTOR',
        molecule: 'molecule',
        note: {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000256',
                  id: 'PIRNR001361',
                  source: 'PIRNR',
                },
              ],
              value: 'value2',
            },
          ],
        },
      },
    ]);
  });

  test('should convert cofactors', () => {
    const { commentsData } = data;
    expect(commentsData.get('CATALYTIC ACTIVITY')).toEqual([
      {
        commentType: 'CATALYTIC ACTIVITY',
        molecule: 'Isoform 3',
        physiologicalReactions: [
          {
            directionType: 'right-to-left',
            evidences: [
              {
                evidenceCode: 'ECO:0000313',
                id: 'ENSP0001324',
                source: 'Ensembl',
              },
            ],
            reactionCrossReference: { database: 'Rhea', id: 'RHEA:313' },
          },
        ],
        reaction: {
          ecNumber: '1.2.4.5',
          evidences: [
            {
              evidenceCode: 'ECO:0000256',
              id: 'PIRNR001361',
              source: 'PIRNR',
            },
          ],
          name: 'some reaction',
          reactionCrossReferences: [
            { database: 'ChEBI', id: 'ChEBI:3243' },
            {
              database: 'Rhea',
              id: 'RHEA:12345',
            },
          ],
        },
      },
    ]);
  });

  test('should convert biophysical properties', () => {
    const { bioPhysicoChemicalProperties } = data;
    expect(bioPhysicoChemicalProperties).toEqual({
      absorption: {
        approximate: true,
        evidences: [
          {
            evidenceCode: 'ECO:0000255',
            id: 'PRU10028',
            source: 'PROSITE-ProRule',
          },
        ],
        max: 10,
        note: {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10028',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'value1',
            },
          ],
        },
      },
      kinetics: {
        maximumVelocities: [
          {
            enzyme: 'enzyme1',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                id: 'PRU10028',
                source: 'PROSITE-ProRule',
              },
            ],
            unit: 'unit1',
            velocity: 1,
          },
        ],
        michaelisConstants: [
          {
            constant: 2.0999999046325684,
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                id: 'PRU10028',
                source: 'PROSITE-ProRule',
              },
            ],
            substrate: 'sub1',
            unit: 'uM',
          },
        ],
        note: {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10028',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'value1',
            },
          ],
        },
      },
      pHDependence: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              id: 'PRU10028',
              source: 'PROSITE-ProRule',
            },
          ],
          value: 'value1',
        },
      ],
      redoxPotential: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              id: 'PRU10028',
              source: 'PROSITE-ProRule',
            },
          ],
          value: 'value1',
        },
      ],
      temperatureDependence: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              id: 'PRU10028',
              source: 'PROSITE-ProRule',
            },
          ],
          value: 'value1',
        },
      ],
    });
  });
});
