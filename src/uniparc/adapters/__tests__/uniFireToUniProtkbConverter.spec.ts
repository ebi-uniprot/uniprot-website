import * as logging from '../../../shared/utils/logging';
import { type NamesAndTaxonomyUIModel } from '../../../uniprotkb/adapters/namesAndTaxonomyConverter';
import { type UIModel } from '../../../uniprotkb/adapters/sectionConverter';
import {
  type CommentType,
  type FreeTextComment,
} from '../../../uniprotkb/types/commentTypes';
import EntrySection from '../../../uniprotkb/types/entrySection';
import unifireModelData from '../../__mocks__/unifireModelData';
import uniparcPrecomputedModelData from '../../__mocks__/uniparcPrecomputedModelData';
import uniFireToUniProtkbConverter from '../uniFireToUniProtkbConverter';

jest.mock('../../../shared/utils/logging', () => ({
  warn: jest.fn(),
  error: jest.fn(),
}));

const mockWarn = logging.warn as jest.MockedFunction<typeof logging.warn>;

describe('uniFireToUniProtkbConverter', () => {
  let result: ReturnType<typeof uniFireToUniProtkbConverter>;

  beforeEach(() => {
    mockWarn.mockClear();
    result = uniFireToUniProtkbConverter(unifireModelData);
  });

  it('should set the recommended protein name from the first matching prediction', () => {
    const namesSection = result[
      EntrySection.NamesAndTaxonomy
    ] as NamesAndTaxonomyUIModel;
    const { recommendedName } = uniparcPrecomputedModelData.proteinDescription;
    const proteinNamesData = namesSection.proteinNamesData as {
      recommendedName: { fullName: { value: string; evidences: unknown[] } };
    };
    expect(proteinNamesData.recommendedName.fullName.value).toBe(
      recommendedName?.fullName.value
    );
    expect(proteinNamesData.recommendedName.fullName.evidences).toEqual(
      recommendedName?.fullName.evidences
    );
  });

  it('should transform the function comment', () => {
    const functionSection = result[EntrySection.Function] as UIModel;
    const functionComments = functionSection.commentsData.get(
      'FUNCTION' as CommentType
    ) as FreeTextComment[];
    const expectedComment = (uniparcPrecomputedModelData.comments ?? []).find(
      (c) => c.commentType === 'FUNCTION'
    ) as FreeTextComment | undefined;
    expect(functionComments).toHaveLength(1);
    expect(functionComments[0].texts?.[0].value).toBe(
      expectedComment?.texts?.[0].value
    );
    expect(functionComments[0].texts?.[0].evidences).toEqual(
      expectedComment?.texts?.[0].evidences
    );
  });

  it('should transform the similarity comment into FamilyAndDomains section', () => {
    const familySection = result[EntrySection.FamilyAndDomains] as UIModel;
    const similarityComments = familySection.commentsData.get(
      'SIMILARITY' as CommentType
    ) as FreeTextComment[];
    const expectedComment = (uniparcPrecomputedModelData.comments ?? []).find(
      (c) => c.commentType === 'SIMILARITY'
    ) as FreeTextComment | undefined;
    expect(similarityComments).toHaveLength(1);
    expect(similarityComments[0].texts?.[0].value).toBe(
      expectedComment?.texts?.[0].value
    );
  });

  it('should transform all subcellular location predictions as free-text comments', () => {
    const subCellSection = result[EntrySection.SubCellularLocation] as UIModel;
    const subCellComments = subCellSection.commentsData.get(
      'SUBCELLULAR LOCATION' as CommentType
    ) as FreeTextComment[];
    const subcellularPredictions = unifireModelData.predictions.filter(
      (p) => p.annotationType === 'comment.subcellular_location'
    );
    expect(subCellComments).toHaveLength(subcellularPredictions.length);
  });

  it('should transform disulfide bond features into ProteinProcessing section', () => {
    const processingSection = result[EntrySection.ProteinProcessing] as UIModel;
    const expectedFeatures = (
      uniparcPrecomputedModelData.features ?? []
    ).filter((f) => f.type === 'Disulfide bond');
    expect(processingSection.featuresData).toHaveLength(
      expectedFeatures.length
    );
    processingSection.featuresData.forEach((feature, i) => {
      expect(feature.type).toBe('Disulfide bond');
      expect(feature.location.start.value).toBe(
        expectedFeatures[i].location.start.value
      );
      expect(feature.location.end.value).toBe(
        expectedFeatures[i].location.end.value
      );
    });
  });

  it('should transform region features into FamilyAndDomains section', () => {
    const familySection = result[EntrySection.FamilyAndDomains] as UIModel;
    const regionFeatures = familySection.featuresData.filter(
      (f) => f.type === 'Region'
    );
    const regionPredictions = unifireModelData.predictions.filter(
      (p) => p.annotationType === 'feature.REGION'
    );
    expect(regionFeatures).toHaveLength(regionPredictions.length);
    expect(regionFeatures[0].description).toBe('GFLD subdomain');
    expect(regionFeatures[1].description).toBe('CuBD subdomain');
  });

  it('should transform all keyword predictions', () => {
    const keywords = (result as Record<string, unknown>).keywords as Array<{
      name: string;
      evidences: unknown[];
    }>;
    const keywordPredictions = unifireModelData.predictions.filter(
      (p) => p.annotationType === 'keyword'
    );
    expect(keywords).toHaveLength(keywordPredictions.length);
    const expectedKeywordNames = (
      uniparcPrecomputedModelData.keywords ?? []
    ).map((k) => k.name);
    keywords.forEach((kw) => {
      expect(expectedKeywordNames).toContain(kw.name);
    });
  });

  it('should warn and skip unknown annotation types (alternativeNames and xref.GO)', () => {
    const unknownPredictions = unifireModelData.predictions.filter(
      (p) =>
        p.annotationType === 'protein.alternativeName.fullName' ||
        p.annotationType === 'xref.GO'
    );
    expect(mockWarn).toHaveBeenCalledTimes(unknownPredictions.length);
    unknownPredictions.forEach((p) => {
      expect(mockWarn).toHaveBeenCalledWith(
        'Unknown UniFire annotation type encountered',
        {
          extra: {
            annotationType: p.annotationType,
            accession: unifireModelData.accession,
          },
        }
      );
    });
  });
});
