/**
 * @jest-environment node
 */
import protnlmData from '../../__mocks__/A8Y1C3ProtnlmApi';
import uniprotkbData from '../../__mocks__/A8Y1C3UniprotkbApi';
import EntrySection from '../../types/entrySection';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';
import {
  augmentAPIDataWithProtnlmPredictions,
  augmentUIDataWithProtnlmPredictions,
} from '../protnlmConverter';
import uniProtKbConverter, {
  type UniProtkbAPIModel,
  type UniProtkbUIModel,
} from '../uniProtkbConverter';

describe('augmentAPIDataWithProtnlmPredictions', () => {
  let result: UniProtkbAPIModel;

  beforeAll(() => {
    result = augmentAPIDataWithProtnlmPredictions(protnlmData, uniprotkbData);
  });

  it('should merge comments correctly', () => {
    expect(result.comments).toHaveLength(1);
    expect(result.comments?.[0]).toEqual({
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: expect.objectContaining({
            value: 'Golgi apparatus membrane',
            id: 'SL-0134',
          }),
        },
      ],
    });
  });

  it('should merge keywords correctly', () => {
    expect(result.keywords).toHaveLength(8);
    const carbohydrateKeyword = result.keywords?.find(
      (k) => k.id === 'KW-0119'
    );
    expect(carbohydrateKeyword?.name).toEqual('Carbohydrate metabolism');
  });

  it('should only retain UniProtKB Pfam xrefs and not include ProtNLM data', () => {
    const initialPfamCount = uniprotkbData.uniProtKBCrossReferences?.filter(
      (xref) => xref.database === 'Pfam'
    ).length;
    const resultPfamCount = result.uniProtKBCrossReferences?.filter(
      (xref) => xref.database === 'Pfam'
    ).length;
    expect(resultPfamCount).toBe(initialPfamCount);
  });

  it('drops a ProtNLM-side Pfam xref entirely (filter is active, not just no-op)', () => {
    const protnlmPfamId = 'PF12345';
    const protnlm = {
      ...protnlmData,
      uniProtKBCrossReferences: [
        ...(protnlmData.uniProtKBCrossReferences || []),
        {
          database: 'Pfam',
          id: protnlmPfamId,
          properties: [{ key: 'EntryName', value: 'TestDomain' }],
          evidences: [{ evidenceCode: 'ECO:0008006' }],
        },
      ],
    };

    const merged = augmentAPIDataWithProtnlmPredictions(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      protnlm as any,
      uniprotkbData
    );

    const found = merged.uniProtKBCrossReferences?.some(
      (xref) => xref.id === protnlmPfamId
    );
    expect(found).toBe(false);
  });

  it('should merge duplicate GO ids by appending ProtNLM GoEvidenceType to existing UniProt GO xref', () => {
    const goId = 'GO:0008146';

    const baseData = {
      ...uniprotkbData,
      uniProtKBCrossReferences: [
        {
          database: 'GO',
          id: goId,
          properties: [{ key: 'GoEvidenceType', value: 'EXP' }],
          evidences: [{ evidenceCode: 'ECO:0000269' }],
        },
      ],
    };

    const protnlm = {
      ...protnlmData,
      uniProtKBCrossReferences: [
        {
          database: 'GO',
          id: goId,
          properties: [{ key: 'GoEvidenceType', value: ':-' }], // will be fixed to IEA:ProtNLM2
          evidences: [{ evidenceCode: 'ECO:0000501' }],
        },
      ],
    };

    const result = augmentAPIDataWithProtnlmPredictions(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      protnlm as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      baseData as any
    );

    const goXrefs = (result.uniProtKBCrossReferences || []).filter(
      (x) => x.database === 'GO' && x.id === goId
    );

    // No duplicate GO xref objects
    expect(goXrefs).toHaveLength(1);

    // Properties were merged (original kept + ProtNLM added)
    const props = goXrefs[0].properties || [];
    expect(props).toEqual(
      expect.arrayContaining([
        { key: 'GoEvidenceType', value: 'EXP' },
        expect.objectContaining({
          key: 'GoEvidenceType',
          value: 'IEA:ProtNLM2',
        }),
      ])
    );

    // Evidences were merged
    expect(goXrefs[0].evidences).toEqual(
      expect.arrayContaining([
        { evidenceCode: 'ECO:0000269' },
        { evidenceCode: 'ECO:0000501' },
      ])
    );
  });

  it('should not duplicate GO xrefs when ProtNLM term already exists in UniProt', () => {
    const goId = 'GO:0008146';
    const occurrences = (result.uniProtKBCrossReferences || []).filter(
      (xref) => xref.database === 'GO' && xref.id === goId
    ).length;
    expect(occurrences).toBe(1);
  });

  it('leaves the location id unset when the name has no match in same-page UniProt comments', () => {
    const protnlm = {
      ...protnlmData,
      comments: [
        {
          commentType: 'SUBCELLULAR LOCATION',
          subcellularLocations: [
            {
              location: {
                value: 'Imaginary compartment of doom',
                evidences: [
                  {
                    evidenceCode: 'ECO:0008006',
                    source: 'Google',
                    id: 'ProtNLM2',
                    properties: [{ key: 'model_score', value: '0.42' }],
                  },
                ],
              },
            },
          ],
        },
      ],
    };

    const merged = augmentAPIDataWithProtnlmPredictions(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      protnlm as any,
      uniprotkbData
    );

    const protnlmComment = merged.comments?.find(
      (c) =>
        c.commentType === 'SUBCELLULAR LOCATION' &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (c as any).subcellularLocations?.[0]?.location?.value ===
          'Imaginary compartment of doom'
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recovered = (protnlmComment as any)?.subcellularLocations?.[0]
      ?.location?.id;
    expect(recovered).toBeUndefined();
  });

  it('should handle empty input data gracefully', () => {
    const emptyProtnlm = {};
    const emptyResult = augmentAPIDataWithProtnlmPredictions(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      emptyProtnlm as any,
      uniprotkbData
    );
    expect(emptyResult.comments).toEqual(uniprotkbData.comments || []);
    expect(emptyResult.keywords).toEqual(uniprotkbData.keywords);
    expect(emptyResult.uniProtKBCrossReferences).toEqual(
      uniprotkbData.uniProtKBCrossReferences
    );
  });
});

describe('augmentUIDataWithProtnlmPredictions', () => {
  let transformedUniProtKB: UniProtkbUIModel;

  beforeAll(() => {
    transformedUniProtKB = uniProtKbConverter(uniprotkbData, databaseInfoMaps);
  });

  it('should add protnlmProteinNamesData when evidence exists', () => {
    const result = augmentUIDataWithProtnlmPredictions(
      protnlmData,
      transformedUniProtKB
    );

    const namesSection = result[EntrySection.NamesAndTaxonomy];
    expect(namesSection).toHaveProperty('protnlmProteinNamesData');
    expect(namesSection.protnlmProteinNamesData?.[0].fullName.value).toEqual(
      'Carbohydrate sulfotransferase'
    );
  });

  it('appends submissionNames with evidence after the recommendedName', () => {
    const protnlmWithSubmissions = {
      ...protnlmData,
      proteinDescription: {
        recommendedName: protnlmData.proteinDescription.recommendedName,
        submissionNames: [
          {
            fullName: {
              value: 'Submitted name with evidence',
              evidences: [
                {
                  evidenceCode: 'ECO:0008006',
                  source: 'Google',
                  id: 'ProtNLM2',
                  properties: [{ key: 'model_score', value: '0.5' }],
                },
              ],
            },
          },
          {
            // No evidence — should be filtered out.
            fullName: {
              value: 'Submitted name without evidence',
            },
          },
        ],
      },
    };

    const result = augmentUIDataWithProtnlmPredictions(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      protnlmWithSubmissions as any,
      transformedUniProtKB
    );

    const names = result[EntrySection.NamesAndTaxonomy].protnlmProteinNamesData;
    expect(names).toHaveLength(2);
    expect(names?.[0].fullName.value).toBe('Carbohydrate sulfotransferase'); // recommended first
    expect(names?.[1].fullName.value).toBe('Submitted name with evidence');
  });

  it('should NOT add protnlmProteinNamesData when evidence is missing', () => {
    const noEvidenceProtnlm = {
      ...protnlmData,
      proteinDescription: {
        recommendedName: {
          fullName: {
            value: 'Some Name',
            evidences: [],
          },
        },
      },
    };

    const result = augmentUIDataWithProtnlmPredictions(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      noEvidenceProtnlm as any,
      transformedUniProtKB
    );

    const namesSection = result[EntrySection.NamesAndTaxonomy];
    expect(namesSection).not.toHaveProperty('protnlmProteinNamesData');
  });
});
