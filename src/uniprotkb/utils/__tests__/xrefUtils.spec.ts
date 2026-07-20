import { type Xref } from '../../../shared/types/apiModel';
import { DatabaseCategory } from '../../types/databaseRefs';
import EntrySection from '../../types/entrySection';
import {
  getDatabaseSimilarityCommentImplicitXrefs,
  getDRImplicitXrefs,
  getECImplicitXrefs,
  getGenePatternOrganismImplicitXrefs,
  getJoinedXrefs,
  getUnconditionalImplicitXrefs,
  getXrefsForSection,
} from '../xrefUtils';
import databaseInfoMaps from './__mocks__/databaseInfoMaps';

const { implicitDatabaseXRefs } = databaseInfoMaps;

describe('xrefUtils tests', () => {
  it('should getDRImplicitXrefs', () => {
    expect(
      getDRImplicitXrefs(
        implicitDatabaseXRefs,
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
          {
            database: 'HGNC',
            id: 'HGNC:621',
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
        database: 'GenAtlas',
        implicit: true,
        properties: { GeneName: 'APP' },
      },
      {
        database: 'ClinGen',
        implicit: true,
        properties: { id: 'HGNC:620' },
      },
      {
        database: 'ClinGen',
        implicit: true,
        properties: { id: 'HGNC:621' },
      },
      {
        database: 'GenCC',
        implicit: true,
        properties: { id: 'HGNC:620' },
      },
      {
        database: 'GenCC',
        implicit: true,
        properties: { id: 'HGNC:621' },
      },
      {
        database: 'SWISS-MODEL-Workspace',
        implicit: true,
        properties: { GeneName: 'APP' },
      },
    ]);
  });

  it('should getDatabaseSimilarityCommentImplicitXrefs', () => {
    expect(
      getDatabaseSimilarityCommentImplicitXrefs(
        implicitDatabaseXRefs,
        'TS1R1_HUMAN',
        [
          {
            texts: [
              {
                value:
                  'Belongs to the G-protein coupled receptor 3 family. TAS1R subfamily',
                evidences: [{ evidenceCode: 'ECO:0000305' }],
              },
            ],
            commentType: 'SIMILARITY',
          },
        ]
      )
    ).toEqual([
      {
        database: 'GPCRDB',
        implicit: true,
        properties: { uniProtkbId: 'TS1R1_HUMAN' },
      },
    ]);
  });

  it('should getGenePatternOrganismImplicitXrefs', () => {
    expect(
      getGenePatternOrganismImplicitXrefs(
        implicitDatabaseXRefs,
        ['PNMA5', 'KIAA1934'],
        'Human'
      )
    ).toEqual([
      {
        database: 'HUGE',
        implicit: true,
        properties: { gene: 'KIAA1934' },
      },
    ]);
  });

  it('should getECImplicitXrefs', () => {
    expect(
      getECImplicitXrefs(implicitDatabaseXRefs, [{ value: '3.1.4.4' }])
    ).toEqual([
      {
        database: 'ENZYME',
        implicit: true,
        properties: { ec: '3.1.4.4' },
      },
    ]);
  });
  it('should getUnconditionalImplicitXrefs', () => {
    expect(getUnconditionalImplicitXrefs(implicitDatabaseXRefs)).toEqual([
      { database: 'ModBase', implicit: true },
      { database: 'MobiDB', implicit: true },
    ]);
  });

  describe('getXrefsForSection — NDEx prefix split', () => {
    const iqueryCp: Xref = {
      database: 'NDEx',
      id: 'IQUERY-CP-FOO',
    };
    const music2: Xref = {
      database: 'NDEx',
      id: 'MUSIC2-BAR',
      properties: { evidences: 'Osteosarcoma cell line (U2OS) cell map' },
    };
    const plainAccession: Xref = { database: 'NDEx', id: 'Q14332' };
    const allNdexXrefs = [iqueryCp, music2, plainAccession];

    const xrefIdsInCategory = (
      result: ReturnType<typeof getXrefsForSection>,
      category: DatabaseCategory
    ): string[] => {
      const bucket = result.find((entry) => entry.category === category);
      return (
        bucket?.databases.flatMap(({ xrefs }) =>
          xrefs.map((xref) => xref.id ?? '')
        ) ?? []
      );
    };

    it('routes IQUERY-CP-* IDs to Function under PATHWAY', () => {
      const result = getXrefsForSection(
        databaseInfoMaps,
        allNdexXrefs,
        EntrySection.Function
      );
      expect(xrefIdsInCategory(result, DatabaseCategory.PATHWAY)).toEqual([
        'IQUERY-CP-FOO',
      ]);
    });

    it('routes MUSIC2-* and plain-accession IDs to Interaction under INTERACTION', () => {
      const result = getXrefsForSection(
        databaseInfoMaps,
        allNdexXrefs,
        EntrySection.Interaction
      );
      expect(xrefIdsInCategory(result, DatabaseCategory.INTERACTION)).toEqual([
        'MUSIC2-BAR',
        'Q14332',
      ]);
    });

    it('does not surface NDEx in unrelated sections (e.g. Structure)', () => {
      const result = getXrefsForSection(
        databaseInfoMaps,
        allNdexXrefs,
        EntrySection.Structure
      );
      const allIds = result.flatMap(({ databases }) =>
        databases.flatMap(({ xrefs }) => xrefs.map((x) => x.id))
      );
      expect(allIds).toEqual([]);
    });
  });

  it('should getJoinedXrefs', () => {
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
