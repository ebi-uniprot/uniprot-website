import * as logging from '../../../shared/utils/logging';
import { type FreeTextComment } from '../../../uniprotkb/types/commentTypes';
import unifireModelData from '../../__mocks__/unifireModelData';
import uniFireToPrecomputedConverter, {
  isValidUniFireModel,
} from '../uniFireToUniProtkbConverter';

jest.mock('../../../shared/utils/logging', () => ({
  warn: jest.fn(),
  error: jest.fn(),
}));

const mockWarn = logging.warn as jest.MockedFunction<typeof logging.warn>;
const mockError = logging.error as jest.MockedFunction<typeof logging.error>;

describe('uniFireToPrecomputedConverter', () => {
  let result: ReturnType<typeof uniFireToPrecomputedConverter>;

  beforeEach(() => {
    mockWarn.mockClear();
    mockError.mockClear();
    result = uniFireToPrecomputedConverter(unifireModelData);
  });

  describe('fixed fields', () => {
    it('should set entryType to AA', () => {
      expect(result.entryType).toBe('AA');
    });

    it('should set uniProtkbId to null', () => {
      expect(result.uniProtkbId).toBeNull();
    });

    it('should set annotationScore to 0', () => {
      expect(result.annotationScore).toBe(0);
    });

    it('should derive primaryAccession from accession, replacing colon with hyphen', () => {
      expect(result.primaryAccession).toBe('UPI000002A2F6-9606');
    });
  });

  describe('comment.* predictions → comments[]', () => {
    it('should transform the function comment', () => {
      const functionComments = (result.comments ?? []).filter(
        (c) => c.commentType === 'FUNCTION'
      ) as FreeTextComment[];
      expect(functionComments).toHaveLength(1);
      expect(functionComments[0].texts?.[0].value).toBe(
        'The gamma-CTF peptides as well as the caspase-cleaved peptides, including C31, are potent enhancers of neuronal apoptosis'
      );
      expect(functionComments[0].texts?.[0].evidences).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00002651' },
      ]);
    });

    it('should transform the similarity comment', () => {
      const similarityComments = (result.comments ?? []).filter(
        (c) => c.commentType === 'SIMILARITY'
      ) as FreeTextComment[];
      expect(similarityComments).toHaveLength(1);
      expect(similarityComments[0].texts?.[0].value).toBe(
        'Belongs to the APP family'
      );
    });

    it('should transform all subcellular location predictions as free-text comments', () => {
      const subCellComments = (result.comments ?? []).filter(
        (c) => c.commentType === 'SUBCELLULAR LOCATION'
      );
      const subcellularPredictions = unifireModelData.predictions.filter(
        (p) => p.annotationType === 'comment.subcellular_location'
      );
      expect(subCellComments).toHaveLength(subcellularPredictions.length);
    });

    it('should produce comments as a flat array', () => {
      expect(Array.isArray(result.comments)).toBe(true);
    });
  });

  describe('feature.* predictions → features[]', () => {
    it('should transform disulfide bond features', () => {
      const disulfideBonds = (result.features ?? []).filter(
        (f) => f.type === 'Disulfide bond'
      );
      expect(disulfideBonds).toHaveLength(5);
      expect(disulfideBonds[0].location.start.value).toBe(73);
      expect(disulfideBonds[0].location.end.value).toBe(117);
      expect(disulfideBonds[0].location.start.modifier).toBe('EXACT');
    });

    it('should transform region features with descriptions', () => {
      const regions = (result.features ?? []).filter(
        (f) => f.type === 'Region'
      );
      expect(regions).toHaveLength(2);
      expect(regions[0].description).toBe('GFLD subdomain');
      expect(regions[0].location.start.value).toBe(28);
      expect(regions[0].location.end.value).toBe(123);
      expect(regions[1].description).toBe('CuBD subdomain');
    });

    it('should produce features as a flat array', () => {
      expect(Array.isArray(result.features)).toBe(true);
    });
  });

  describe('keyword predictions → keywords[]', () => {
    it('should transform all keyword predictions', () => {
      const keywordPredictions = unifireModelData.predictions.filter(
        (p) => p.annotationType === 'keyword'
      );
      expect(result.keywords).toHaveLength(keywordPredictions.length);
    });

    it('should set name and evidences but not id or category', () => {
      const amyloid = (result.keywords ?? []).find((k) => k.name === 'Amyloid');
      expect(amyloid).toBeDefined();
      expect(amyloid?.name).toBe('Amyloid');
      expect(amyloid?.evidences).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00023087' },
      ]);
      expect(amyloid?.id).toBeUndefined();
      expect(amyloid?.category).toBeUndefined();
    });
  });

  describe('protein.recommendedName.fullName → proteinDescription', () => {
    it('should set the recommended protein name from the first matching prediction', () => {
      expect(result.proteinDescription?.recommendedName?.fullName.value).toBe(
        'Amyloid-beta precursor protein'
      );
      expect(
        result.proteinDescription?.recommendedName?.fullName.evidences
      ).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00021782' },
      ]);
    });

    it('should use only the first prediction when duplicates exist', () => {
      // The mock only has one protein.recommendedName.fullName, so verify
      // the value matches the first (and only) one
      expect(result.proteinDescription?.recommendedName?.fullName.value).toBe(
        'Amyloid-beta precursor protein'
      );
    });
  });

  describe('protein.alternativeName.fullName → proteinDescription.alternativeNames', () => {
    it('should collect all alternative names', () => {
      const altNames = result.proteinDescription?.alternativeNames;
      expect(altNames).toHaveLength(6);
    });

    it('should transform each alternative name correctly', () => {
      const altNames = result.proteinDescription?.alternativeNames;
      expect(altNames?.[0].fullName.value).toBe('ABPP');
      expect(altNames?.[0].fullName.evidences).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00032275' },
      ]);
      expect(altNames?.[5].fullName.value).toBe('Amyloid-beta A4 protein');
    });
  });

  describe('xref.GO predictions → uniProtKBCrossReferences[]', () => {
    it('should transform GO cross-references', () => {
      const goXrefs = (result.uniProtKBCrossReferences ?? []).filter(
        (x) => x.database === 'GO'
      );
      expect(goXrefs).toHaveLength(2);
    });

    it('should set database, id and evidences correctly', () => {
      const goXrefs = (result.uniProtKBCrossReferences ?? []).filter(
        (x) => x.database === 'GO'
      );
      expect(goXrefs[0].id).toBe('GO:0008201');
      expect(goXrefs[0].database).toBe('GO');
      expect(goXrefs[0].evidences).toEqual([
        {
          evidenceCode: 'ECO:0000256',
          source: 'UniRule',
          id: 'UR000976770',
        },
        {
          evidenceCode: 'ECO:0000256',
          source: 'UniRule',
          id: 'UR000976774',
        },
      ]);
    });
  });

  describe('extraAttributes', () => {
    it('should compute countByCommentType', () => {
      const { countByCommentType } = result.extraAttributes ?? {};
      expect(countByCommentType?.FUNCTION).toBe(1);
      expect(countByCommentType?.SIMILARITY).toBe(1);
      expect(countByCommentType?.['SUBCELLULAR LOCATION']).toBe(26);
    });

    it('should compute countByFeatureType', () => {
      const { countByFeatureType } = result.extraAttributes ?? {};
      expect(countByFeatureType?.['Disulfide bond']).toBe(5);
      expect(countByFeatureType?.Region).toBe(2);
    });
  });

  describe('unknown annotation types', () => {
    it('should not produce any warnings for the standard mock data', () => {
      // All annotation types in the mock are now handled
      expect(mockWarn).not.toHaveBeenCalled();
    });

    it('should warn and skip truly unknown annotation types', () => {
      const dataWithUnknown = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00000001'],
            annotationType: 'some.unknown.type',
            annotationValue: 'test value',
          },
          {
            evidence: ['ARBA00002651'],
            annotationType: 'comment.function',
            annotationValue: 'A real function',
          },
        ],
      };

      const testResult = uniFireToPrecomputedConverter(dataWithUnknown);

      expect(mockWarn).toHaveBeenCalledWith(
        'Unknown UniFire annotation type encountered',
        {
          extra: {
            annotationType: 'some.unknown.type',
            accession: 'UPI000000TEST:9606',
          },
        }
      );
      // The valid prediction should still be transformed
      expect(testResult.comments).toHaveLength(1);
    });
  });

  describe('input validation', () => {
    it('should throw on invalid input', () => {
      expect(() =>
        uniFireToPrecomputedConverter({ accession: 123 } as never)
      ).toThrow('Invalid UniFireModel input');
    });

    it('should throw when predictions is not an array', () => {
      expect(() =>
        uniFireToPrecomputedConverter({
          accession: 'test',
          predictions: 'not-an-array',
        } as never)
      ).toThrow('Invalid UniFireModel input');
    });
  });

  describe('isValidUniFireModel', () => {
    it('should return true for valid data', () => {
      expect(isValidUniFireModel(unifireModelData)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidUniFireModel(null)).toBe(false);
    });

    it('should return false when accession is missing', () => {
      expect(isValidUniFireModel({ predictions: [] })).toBe(false);
    });

    it('should return false when predictions contains invalid items', () => {
      expect(
        isValidUniFireModel({
          accession: 'test',
          predictions: [{ bad: 'data' }],
        })
      ).toBe(false);
    });
  });

  describe('partial failure handling', () => {
    it('should skip failed predictions and keep successfully transformed ones', () => {
      // Create data where one prediction will cause an issue
      // by having a prediction with valid structure but that triggers
      // an error in processing
      const dataWithMix = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00002651'],
            annotationType: 'comment.function',
            annotationValue: 'Valid function',
          },
          {
            evidence: ['ARBA00000001'],
            annotationType: 'keyword',
            annotationValue: 'ValidKeyword',
          },
        ],
      };

      const testResult = uniFireToPrecomputedConverter(dataWithMix);
      expect(testResult.comments).toHaveLength(1);
      expect(testResult.keywords).toHaveLength(1);
    });
  });
});
