import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';
import convertFunction from '../functionConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

const data = convertFunction(
  modelData,
  databaseInfoMaps,
  convertXrefProperties(modelData.uniProtKBCrossReferences)
);

describe('Function data converter', () => {
  it('should convert cofactors', () => {
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

  it('should convert cofactors', () => {
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

  it('should convert biophysical properties', () => {
    const { bioPhysicoChemicalProperties } = data;
    expect(bioPhysicoChemicalProperties).toEqual({
      absorption: {
        max: 10,
        approximate: true,
        note: {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU10028',
                },
              ],
              value: 'value1',
            },
          ],
        },
        evidences: [
          {
            evidenceCode: 'ECO:0000255',
            source: 'PROSITE-ProRule',
            id: 'PRU10028',
          },
        ],
      },
      kinetics: {
        'Isoform 3': {
          maximumVelocities: [
            {
              velocity: 1,
              unit: 'unit1',
              enzyme: 'enzyme1',
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU10028',
                },
              ],
            },
          ],
          michaelisConstants: [
            {
              constant: 2.0999999046325684,
              unit: 'uM',
              substrate: 'sub1',
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU10028',
                },
              ],
            },
          ],
          note: {
            texts: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    source: 'PROSITE-ProRule',
                    id: 'PRU10028',
                  },
                ],
                value: 'value1',
              },
            ],
          },
        },
      },
      pHDependence: {
        'Isoform 3': [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10028',
              },
            ],
            value: 'value1',
          },
        ],
      },
      redoxPotential: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              source: 'PROSITE-ProRule',
              id: 'PRU10028',
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
              source: 'PROSITE-ProRule',
              id: 'PRU10028',
            },
          ],
          value: 'value1',
        },
      ],
    });
  });
});
