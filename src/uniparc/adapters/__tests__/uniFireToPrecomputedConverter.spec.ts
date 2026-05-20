import * as logging from '../../../shared/utils/logging';
import { type FreeTextComment } from '../../../uniprotkb/types/commentTypes';
import unifireModelData from '../../__mocks__/unifireModelData';
import uniFireToPrecomputedConverter, {
  isValidUniFireModel,
} from '../uniFireToPrecomputedConverter';
import * as uniParcSubEntryConverter from '../uniParcSubEntryConverter';

jest.mock('../../../shared/utils/logging', () => ({
  warn: jest.fn(),
  error: jest.fn(),
}));

// Wrap constructPredictionEvidences in a jest.fn that delegates to the real
// implementation, so a single test can force it to throw and exercise the
// converter's per-prediction try/catch.
jest.mock('../uniParcSubEntryConverter', () => {
  const actual = jest.requireActual('../uniParcSubEntryConverter');
  return {
    ...actual,
    constructPredictionEvidences: jest.fn(actual.constructPredictionEvidences),
  };
});

const mockWarn = logging.warn as jest.MockedFunction<typeof logging.warn>;
const mockError = logging.error as jest.MockedFunction<typeof logging.error>;
const mockConstructPredictionEvidences =
  uniParcSubEntryConverter.constructPredictionEvidences as jest.MockedFunction<
    typeof uniParcSubEntryConverter.constructPredictionEvidences
  >;

describe('uniFireToPrecomputedConverter', () => {
  let result: ReturnType<typeof uniFireToPrecomputedConverter>;

  beforeEach(() => {
    mockWarn.mockClear();
    mockError.mockClear();
    mockConstructPredictionEvidences.mockClear();
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

    it('should consolidate all subcellular location predictions into a single free-text comment', () => {
      // UniFire-derived SUBCELLULAR LOCATION emerges from the converter as a
      // FreeTextComment (texts[]) even though the union type would normally
      // narrow to the structured SubcellularLocationComment for that
      // commentType. See renderer-spec.md §2.2.
      const subCellComments = (result.comments ?? []).filter(
        (c) => c.commentType === 'SUBCELLULAR LOCATION'
      ) as unknown as FreeTextComment[];
      const subcellularPredictions = unifireModelData.predictions.filter(
        (p) => p.annotationType === 'comment.subcellular_location'
      );
      // Step 4 consolidation: many UniFire predictions → one comment with
      // a `texts[]` of length N.
      expect(subCellComments).toHaveLength(1);
      expect(subCellComments[0].texts).toHaveLength(
        subcellularPredictions.length
      );
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

    it('should skip features without start/end positions', () => {
      const dataWithMissingPositions = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['UR000976770'],
            annotationType: 'feature.DISULFID',
            // no start or end
          },
          {
            evidence: ['UR000976770'],
            annotationType: 'feature.DISULFID',
            start: 10,
            end: 20,
          },
        ],
      };
      const testResult = uniFireToPrecomputedConverter(
        dataWithMissingPositions
      );
      expect(testResult.features).toHaveLength(1);
      expect(testResult.features?.[0].location.start.value).toBe(10);
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
      const dataWithDuplicates = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021782'],
            annotationType: 'protein.recommendedName.fullName',
            annotationValue: 'First name',
          },
          {
            evidence: ['ARBA00099999'],
            annotationType: 'protein.recommendedName.fullName',
            annotationValue: 'Second name (should be ignored)',
          },
        ],
      };
      const testResult = uniFireToPrecomputedConverter(dataWithDuplicates);
      expect(
        testResult.proteinDescription?.recommendedName?.fullName.value
      ).toBe('First name');
    });
  });

  describe('protein.recommendedName.ecNumber → proteinDescription.recommendedName.ecNumbers', () => {
    it('should attach a single ecNumber as a ValueWithEvidence under recommendedName.ecNumbers', () => {
      const data = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021782'],
            annotationType: 'protein.recommendedName.fullName',
            annotationValue: 'A protein',
          },
          {
            evidence: ['ARBA00011923'],
            annotationType: 'protein.recommendedName.ecNumber',
            annotationValue: '2.1.1.57',
          },
        ],
      };
      const testResult = uniFireToPrecomputedConverter(data);
      const ecs =
        testResult.proteinDescription?.recommendedName?.ecNumbers ?? [];
      expect(ecs).toHaveLength(1);
      expect(ecs[0].value).toBe('2.1.1.57');
      expect(ecs[0].evidences).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00011923' },
      ]);
    });

    it('should accumulate multiple ecNumber predictions in declaration order', () => {
      const data = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021782'],
            annotationType: 'protein.recommendedName.fullName',
            annotationValue: 'A multi-EC protein',
          },
          {
            evidence: ['ARBA00011923'],
            annotationType: 'protein.recommendedName.ecNumber',
            annotationValue: '2.1.1.57',
          },
          {
            evidence: ['ARBA00099999'],
            annotationType: 'protein.recommendedName.ecNumber',
            annotationValue: '3.4.5.6',
          },
        ],
      };
      const testResult = uniFireToPrecomputedConverter(data);
      const ecs =
        testResult.proteinDescription?.recommendedName?.ecNumbers ?? [];
      expect(ecs).toHaveLength(2);
      expect(ecs.map((e) => e.value)).toEqual(['2.1.1.57', '3.4.5.6']);
    });

    it('should round-trip mixed ARBA*/UR* evidence through constructPredictionEvidences', () => {
      const data = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021782'],
            annotationType: 'protein.recommendedName.fullName',
            annotationValue: 'Cap-specific mRNA methyltransferase',
          },
          {
            evidence: ['ARBA00011923', 'UR000001535'],
            annotationType: 'protein.recommendedName.ecNumber',
            annotationValue: '2.1.1.57',
          },
        ],
      };
      const testResult = uniFireToPrecomputedConverter(data);
      const ec = testResult.proteinDescription?.recommendedName?.ecNumbers?.[0];
      expect(ec?.evidences).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00011923' },
        { evidenceCode: 'ECO:0000256', source: 'UniRule', id: 'UR000001535' },
      ]);
    });

    it('should not warn for protein.recommendedName.ecNumber when paired with a fullName', () => {
      const data = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021782'],
            annotationType: 'protein.recommendedName.fullName',
            annotationValue: 'A protein',
          },
          {
            evidence: ['ARBA00011923', 'UR000001535'],
            annotationType: 'protein.recommendedName.ecNumber',
            annotationValue: '2.1.1.57',
          },
        ],
      };
      mockWarn.mockClear();
      uniFireToPrecomputedConverter(data);
      expect(mockWarn).not.toHaveBeenCalled();
    });

    it('should drop ecNumbers and warn when no recommendedName.fullName is present', () => {
      // Option (b) from the audit: corpus shows zero entries with ecNumber but
      // no fullName, so we drop the ecNumbers and log a warning rather than
      // emit a synthetic empty fullName.
      const data = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00011923'],
            annotationType: 'protein.recommendedName.ecNumber',
            annotationValue: '2.1.1.57',
          },
        ],
      };
      mockWarn.mockClear();
      const testResult = uniFireToPrecomputedConverter(data);
      expect(testResult.proteinDescription).toBeUndefined();
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining(
          'Dropping protein.recommendedName.ecNumber predictions'
        ),
        expect.objectContaining({
          extra: expect.objectContaining({
            accession: 'UPI000000TEST:9606',
            droppedEcNumbers: 1,
          }),
        })
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
    it('should compute countByCommentType from consolidated comments', () => {
      const { countByCommentType } = result.extraAttributes ?? {};
      // After Step 4 consolidation each commentType yields one comment
      // object, regardless of how many predictions sourced it.
      expect(countByCommentType?.FUNCTION).toBe(1);
      expect(countByCommentType?.SIMILARITY).toBe(1);
      expect(countByCommentType?.['SUBCELLULAR LOCATION']).toBe(1);
    });

    it('should compute countByFeatureType', () => {
      const { countByFeatureType } = result.extraAttributes ?? {};
      expect(countByFeatureType?.['Disulfide bond']).toBe(5);
      expect(countByFeatureType?.Region).toBe(2);
    });

    it('should not include extraAttributes when there are no comments or features', () => {
      const dataWithOnlyKeywords = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00023087'],
            annotationType: 'keyword',
            annotationValue: 'Amyloid',
          },
        ],
      };
      const testResult = uniFireToPrecomputedConverter(dataWithOnlyKeywords);
      expect(testResult.extraAttributes).toBeUndefined();
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
    it('should throw and log error on invalid input', () => {
      expect(() =>
        uniFireToPrecomputedConverter({ accession: 123 } as never)
      ).toThrow('Invalid UniFireModel input');
      expect(mockError).toHaveBeenCalledWith(
        expect.stringContaining('Invalid UniFireModel input')
      );
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

    it('should return false when evidence contains non-string items', () => {
      expect(
        isValidUniFireModel({
          accession: 'test',
          predictions: [
            {
              annotationType: 'keyword',
              annotationValue: 'Test',
              evidence: [null, 42],
            },
          ],
        })
      ).toBe(false);
    });
  });

  describe('free-text comment consolidation', () => {
    it('should merge multiple SUBCELLULAR LOCATION predictions into one comment, preserving order', () => {
      const data = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00000001'],
            annotationType: 'comment.subcellular_location',
            annotationValue: 'Cell membrane',
          },
          {
            evidence: ['ARBA00000002'],
            annotationType: 'comment.subcellular_location',
            annotationValue: 'Cytoplasm',
          },
          {
            evidence: ['UR000000003'],
            annotationType: 'comment.subcellular_location',
            annotationValue: 'Nucleus',
          },
        ],
      };
      const testResult = uniFireToPrecomputedConverter(data);
      const sl = (testResult.comments ?? []).filter(
        (c) => c.commentType === 'SUBCELLULAR LOCATION'
      ) as unknown as FreeTextComment[];
      expect(sl).toHaveLength(1);
      expect(sl[0].texts?.map((t) => t.value)).toEqual([
        'Cell membrane',
        'Cytoplasm',
        'Nucleus',
      ]);
    });

    it('should preserve evidences on each consolidated text entry', () => {
      const data = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00000001'],
            annotationType: 'comment.subcellular_location',
            annotationValue: 'Cell membrane',
          },
          {
            evidence: ['UR000000003', 'ARBA00000999'],
            annotationType: 'comment.subcellular_location',
            annotationValue: 'Nucleus',
          },
        ],
      };
      const testResult = uniFireToPrecomputedConverter(data);
      const sl = (testResult.comments ?? []).filter(
        (c) => c.commentType === 'SUBCELLULAR LOCATION'
      ) as unknown as FreeTextComment[];
      expect(sl[0].texts?.[0].evidences).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00000001' },
      ]);
      expect(sl[0].texts?.[1].evidences).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'UniRule', id: 'UR000000003' },
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00000999' },
      ]);
    });

    it('should consolidate independently per commentType', () => {
      const data = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00000001'],
            annotationType: 'comment.function',
            annotationValue: 'Function A',
          },
          {
            evidence: ['ARBA00000002'],
            annotationType: 'comment.function',
            annotationValue: 'Function B',
          },
          {
            evidence: ['ARBA00000003'],
            annotationType: 'comment.similarity',
            annotationValue: 'Belongs to family X',
          },
        ],
      };
      const testResult = uniFireToPrecomputedConverter(data);
      const fn = (testResult.comments ?? []).filter(
        (c) => c.commentType === 'FUNCTION'
      ) as FreeTextComment[];
      const sim = (testResult.comments ?? []).filter(
        (c) => c.commentType === 'SIMILARITY'
      ) as FreeTextComment[];
      expect(fn).toHaveLength(1);
      expect(fn[0].texts?.map((t) => t.value)).toEqual([
        'Function A',
        'Function B',
      ]);
      expect(sim).toHaveLength(1);
      expect(sim[0].texts?.map((t) => t.value)).toEqual([
        'Belongs to family X',
      ]);
      expect(testResult.extraAttributes?.countByCommentType?.FUNCTION).toBe(1);
      expect(testResult.extraAttributes?.countByCommentType?.SIMILARITY).toBe(
        1
      );
    });

    it('should leave a single-prediction commentType as a one-element texts array', () => {
      const data = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00000001'],
            annotationType: 'comment.function',
            annotationValue: 'Single function',
          },
        ],
      };
      const testResult = uniFireToPrecomputedConverter(data);
      const fn = (testResult.comments ?? []).filter(
        (c) => c.commentType === 'FUNCTION'
      ) as FreeTextComment[];
      expect(fn).toHaveLength(1);
      expect(fn[0].texts).toHaveLength(1);
      expect(fn[0].texts?.[0].value).toBe('Single function');
    });
  });

  describe('evidence source-prefix table', () => {
    // Exercises constructPredictionEvidences indirectly through the converter.
    // Each evidence ID's leading characters select the human-readable source
    // label. Unknown prefixes default to 'UniRule' and emit logging.warn.
    const buildSingleKeyword = (evidenceId: string) => ({
      accession: 'UPI000000TEST:9606',
      predictions: [
        {
          evidence: [evidenceId],
          annotationType: 'keyword',
          annotationValue: 'Test',
        },
      ],
    });

    const sourceOf = (evidenceId: string): string | undefined => {
      mockWarn.mockClear();
      const out = uniFireToPrecomputedConverter(buildSingleKeyword(evidenceId));
      return out.keywords?.[0].evidences?.[0].source;
    };

    it('should map ARBA* ids to source "ARBA"', () => {
      expect(sourceOf('ARBA00012345')).toBe('ARBA');
      expect(mockWarn).not.toHaveBeenCalled();
    });

    it('should map UR* ids to source "UniRule"', () => {
      expect(sourceOf('UR000976770')).toBe('UniRule');
      expect(mockWarn).not.toHaveBeenCalled();
    });

    it('should map RU* ids to source "RuleBase"', () => {
      expect(sourceOf('RU000123')).toBe('RuleBase');
      expect(mockWarn).not.toHaveBeenCalled();
    });

    it('should map PIRNR* ids to source "PIRNR"', () => {
      expect(sourceOf('PIRNR003726')).toBe('PIRNR');
      expect(mockWarn).not.toHaveBeenCalled();
    });

    it('should map PRU* ids to source "PROSITE-ProRule"', () => {
      expect(sourceOf('PRU01217')).toBe('PROSITE-ProRule');
      expect(mockWarn).not.toHaveBeenCalled();
    });

    it('should default unknown prefixes to "UniRule" and emit logging.warn', () => {
      expect(sourceOf('ZZZ99999')).toBe('UniRule');
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining('Unknown UniFire evidence ID prefix'),
        expect.objectContaining({ extra: { id: 'ZZZ99999' } })
      );
    });
  });

  describe('partial failure handling', () => {
    it('should skip a prediction whose transformation throws and keep the rest', () => {
      // Validation already rejects malformed input, so the in-loop try/catch
      // is only reachable when a dependency throws unexpectedly. Force the
      // first constructPredictionEvidences call to throw to simulate that.
      mockConstructPredictionEvidences.mockImplementationOnce(() => {
        throw new Error('boom');
      });
      const data = {
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00000001'],
            annotationType: 'keyword',
            annotationValue: 'WillFail',
          },
          {
            evidence: ['ARBA00000002'],
            annotationType: 'keyword',
            annotationValue: 'WillSucceed',
          },
        ],
      };

      const testResult = uniFireToPrecomputedConverter(data);

      // The throwing prediction is skipped; the next one still transforms.
      expect(testResult.keywords).toHaveLength(1);
      expect(testResult.keywords?.[0].name).toBe('WillSucceed');
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining('Failed to transform UniFire prediction'),
        expect.objectContaining({
          extra: expect.objectContaining({
            annotationType: 'keyword',
            accession: 'UPI000000TEST:9606',
          }),
        })
      );
    });
  });
});
