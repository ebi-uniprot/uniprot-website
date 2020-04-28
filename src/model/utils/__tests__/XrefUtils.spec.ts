import {
  getDRImplicitXrefs,
  getDatabaseSimilarityCommentImplicitXrefs,
  getGenePatternOrganismImplicitXrefs,
  getECImplicitXrefs,
  getUnconditionalImplicitXrefs,
  getJoinedXrefs,
} from '../XrefUtils';
import { CommentType } from '../../types/CommentTypes';

describe('XrefUtils tests', () => {
  test('should getDRImplicitXrefs', () => {
    expect(
      getDRImplicitXrefs(
        [
          {
            database: 'PDB',
            id: '1AMB',
            properties: { Method: 'NMR', Resolution: '-', Chains: 'A=672-699' },
          },
          {
            database: 'MIM',
            id: '104300',
            properties: { Type: 'phenotype' },
          },
          {
            database: 'HGNC',
            id: 'HGNC:620',
            properties: { GeneName: 'APP' },
          },
        ],
        ['APP', 'A4', 'AD1']
      )
    ).toEqual([
      {
        database: 'PDBe-KB',
        implicit: true,
        properties: { GeneName: 'APP' },
      },
      {
        database: 'SOURCE_MIM',
        implicit: true,
        properties: { GeneName: 'APP' },
      },
      {
        database: 'GenAtlas',
        implicit: true,
        properties: { GeneName: 'APP' },
      },
      {
        database: 'SWISS-MODEL-Workspace',
        implicit: true,
        properties: { GeneName: 'APP' },
      },
    ]);
  });

  test('should getDatabaseSimilarityCommentImplicitXrefs', () => {
    expect(
      getDatabaseSimilarityCommentImplicitXrefs('TS1R1_HUMAN', [
        {
          texts: [
            {
              value:
                'Belongs to the G-protein coupled receptor 3 family. TAS1R subfamily',
              evidences: [{ evidenceCode: 'ECO:0000305' }],
            },
          ],
          commentType: CommentType.SIMILARITY,
        },
      ])
    ).toEqual([
      {
        database: 'GPCRDB',
        implicit: true,
        properties: { uniProtkbId: 'TS1R1_HUMAN' },
      },
    ]);
  });

  test('should getGenePatternOrganismImplicitXrefs', () => {
    expect(
      getGenePatternOrganismImplicitXrefs(['PNMA5', 'KIAA1934'], 'Human')
    ).toEqual([
      {
        database: 'HUGE',
        implicit: true,
        properties: { gene: 'KIAA1934' },
      },
    ]);
  });

  test('should getECImplicitXrefs', () => {
    expect(getECImplicitXrefs([{ value: '3.1.4.4' }])).toEqual([
      {
        database: 'ENZYME',
        implicit: true,
        properties: { ec: '3.1.4.4' },
      },
    ]);
  });
  test('should getUnconditionalImplicitXrefs', () => {
    expect(getUnconditionalImplicitXrefs()).toEqual([
      { database: 'ModBase', implicit: true },
      { database: 'MobiDB', implicit: true },
      { database: 'ProtoNet', implicit: true },
    ]);
  });

  test('should getJoinedXrefs', () => {
    const xrefs = [
      {
        id: 'A',
        properties: {
          Status: 'SOMETHING',
          ProteinId: 'PROTEINA',
        },
      },
      {
        id: 'B',
        properties: {
          Status: 'JOINED',
          ProteinId: 'PROTEINA',
        },
      },
      {
        id: 'C',
        properties: {
          Status: 'JOINED',
          ProteinId: 'PROTEINA',
        },
      },
      {
        id: 'D',
        properties: {
          Status: 'SOMETHING ELSE',
          ProteinId: 'PROTEIND',
        },
      },
    ];
    const joined = getJoinedXrefs(xrefs);
    expect(joined).toEqual([
      {
        id: 'A',
        properties: {
          Status: 'SOMETHING',
          ProteinId: 'PROTEINA',
        },
        additionalIds: ['B', 'C'],
      },
      {
        id: 'D',
        properties: {
          Status: 'SOMETHING ELSE',
          ProteinId: 'PROTEIND',
        },
        additionalIds: [],
      },
    ]);
  });
});
