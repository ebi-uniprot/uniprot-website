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
    // TODO: update with ID once available
    expect(result.comments?.[0]).toEqual({
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: expect.objectContaining({
            value: 'Golgi apparatus membrane',
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

  it('should filter out Pfam cross references from ProtNLM data', () => {
    const initialPfamCount = uniprotkbData.uniProtKBCrossReferences?.filter(
      (xref) => xref.database === 'Pfam'
    ).length;
    const resultPfamCount = result.uniProtKBCrossReferences?.filter(
      (xref) => xref.database === 'Pfam'
    ).length;
    expect(resultPfamCount).toBe(initialPfamCount);
  });

  it('should transform GO evidence types correctly', () => {
    const goRef = result.uniProtKBCrossReferences?.find(
      (xref) => xref.id === 'GO:0008146'
    );
    const evidenceProp = goRef?.properties?.find(
      (p) => p.key === 'GoEvidenceType'
    );
    expect(evidenceProp?.value).toEqual('IEA:ProtNLM2');
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
    expect(
      namesSection.protnlmProteinNamesData?.recommendedName?.fullName?.value
    ).toEqual('Carbohydrate sulfotransferase');
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
