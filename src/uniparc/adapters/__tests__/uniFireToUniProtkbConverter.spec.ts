import * as logging from '../../../shared/utils/logging';
import {
  type CatalyticActivityComment,
  type CofactorComment,
  type FreeTextComment,
  type SubcellularLocationComment,
} from '../../../uniprotkb/types/commentTypes';
import unifireModelData from '../../__mocks__/unifireModelData';
import uniFireToUniProtkbConverter, {
  isValidUniFireModel,
} from '../uniFireToUniProtkbConverter';
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

describe('uniFireToUniProtkbConverter', () => {
  let result: ReturnType<typeof uniFireToUniProtkbConverter>;

  beforeEach(() => {
    mockWarn.mockClear();
    mockError.mockClear();
    mockConstructPredictionEvidences.mockClear();
    result = uniFireToUniProtkbConverter(unifireModelData);
  });

  describe('fixed fields', () => {
    it('should set entryType to AA', () => {
      expect(result.entryType).toBe('AA');
    });

    it('should set uniProtkbId to an empty-string placeholder', () => {
      expect(result.uniProtkbId).toBe('');
    });

    it('should set proteinExistence to an empty-string placeholder', () => {
      expect(result.proteinExistence).toBe('');
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

    it('should emit each subcellular location prediction as a structured comment', () => {
      // SUBCELLULAR LOCATION is a structured comment type: one comment per
      // prediction, each carrying a `subcellularLocations` entry (not a
      // consolidated FreeTextComment).
      const subCellComments = (result.comments ?? []).filter(
        (c) => c.commentType === 'SUBCELLULAR LOCATION'
      ) as SubcellularLocationComment[];
      const subcellularPredictions = unifireModelData.predictions.filter(
        (p) => p.annotationType === 'comment.subcellular_location'
      );
      expect(subCellComments).toHaveLength(subcellularPredictions.length);
      expect(subCellComments[0].subcellularLocations?.[0].location.value).toBe(
        subcellularPredictions[0].annotationValue
      );
    });

    it('should emit COFACTOR predictions as structured cofactor comments', () => {
      const testResult = uniFireToUniProtkbConverter({
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00000001'],
            annotationType: 'comment.cofactor',
            annotationValue: 'Zn(2+)',
          },
        ],
      });
      const cofactor = (testResult.comments ?? []).find(
        (c) => c.commentType === 'COFACTOR'
      ) as CofactorComment | undefined;
      expect(cofactor?.cofactors?.[0].name).toBe('Zn(2+)');
      expect(cofactor?.cofactors?.[0].evidences).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00000001' },
      ]);
    });

    it('should emit CATALYTIC ACTIVITY predictions as structured reaction comments', () => {
      const testResult = uniFireToUniProtkbConverter({
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00000001'],
            annotationType: 'comment.catalytic_activity',
            annotationValue: 'ATP + H2O = ADP + phosphate',
          },
        ],
      });
      const catalytic = (testResult.comments ?? []).find(
        (c) => c.commentType === 'CATALYTIC ACTIVITY'
      ) as CatalyticActivityComment | undefined;
      expect(catalytic?.reaction?.name).toBe('ATP + H2O = ADP + phosphate');
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
      const testResult = uniFireToUniProtkbConverter(dataWithMissingPositions);
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
      const testResult = uniFireToUniProtkbConverter(dataWithDuplicates);
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
      const testResult = uniFireToUniProtkbConverter(data);
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
      const testResult = uniFireToUniProtkbConverter(data);
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
      const testResult = uniFireToUniProtkbConverter(data);
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
      uniFireToUniProtkbConverter(data);
      expect(mockWarn).not.toHaveBeenCalled();
    });

    it('should drop ecNumbers and warn when no recommendedName.fullName is present', () => {
      // No corpus entry has an ecNumber without a fullName, so dropping them
      // with a warning is preferred over emitting a synthetic empty fullName.
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
      const testResult = uniFireToUniProtkbConverter(data);
      expect(testResult.proteinDescription).toBeUndefined();
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining(
          'Dropping protein.recommendedName.ecNumber / .shortName predictions'
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

  describe('protein short names & alternativeName EC numbers', () => {
    it('should attach protein.recommendedName.shortName to recommendedName.shortNames', () => {
      const testResult = uniFireToUniProtkbConverter({
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021782'],
            annotationType: 'protein.recommendedName.fullName',
            annotationValue: 'Cellular tumor antigen p53',
          },
          {
            evidence: ['ARBA00021784'],
            annotationType: 'protein.recommendedName.shortName',
            annotationValue: 'p53',
          },
        ],
      });
      const shortNames =
        testResult.proteinDescription?.recommendedName?.shortNames ?? [];
      expect(shortNames.map((s) => s.value)).toEqual(['p53']);
      expect(shortNames[0].evidences).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00021784' },
      ]);
    });

    it('should attach alternativeName short names and EC numbers to an alternative name', () => {
      const testResult = uniFireToUniProtkbConverter({
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021782'],
            annotationType: 'protein.alternativeName.fullName',
            annotationValue: 'Antigen NY-CO-13',
          },
          {
            evidence: ['ARBA00021784'],
            annotationType: 'protein.alternativeName.shortName',
            annotationValue: 'NYCO13',
          },
          {
            evidence: ['ARBA00011923'],
            annotationType: 'protein.alternativeName.ecNumber',
            annotationValue: '2.1.1.57',
          },
        ],
      });
      const alt = testResult.proteinDescription?.alternativeNames?.[0];
      expect(alt?.fullName.value).toBe('Antigen NY-CO-13');
      expect(alt?.shortNames?.map((s) => s.value)).toEqual(['NYCO13']);
      expect(alt?.ecNumbers?.map((e) => e.value)).toEqual(['2.1.1.57']);
    });

    it('should drop recommendedName short names and warn when no recommendedName.fullName is present', () => {
      mockWarn.mockClear();
      const testResult = uniFireToUniProtkbConverter({
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021784'],
            annotationType: 'protein.recommendedName.shortName',
            annotationValue: 'p53',
          },
        ],
      });
      expect(testResult.proteinDescription).toBeUndefined();
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining('no recommendedName.fullName'),
        expect.objectContaining({
          extra: expect.objectContaining({ droppedShortNames: 1 }),
        })
      );
    });

    it('should drop alternativeName short names / EC numbers and warn when no alternativeName.fullName is present', () => {
      mockWarn.mockClear();
      const testResult = uniFireToUniProtkbConverter({
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021784'],
            annotationType: 'protein.alternativeName.shortName',
            annotationValue: 'NYCO13',
          },
          {
            evidence: ['ARBA00011923'],
            annotationType: 'protein.alternativeName.ecNumber',
            annotationValue: '2.1.1.57',
          },
        ],
      });
      expect(testResult.proteinDescription).toBeUndefined();
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining('no alternativeName.fullName'),
        expect.objectContaining({
          extra: expect.objectContaining({
            droppedShortNames: 1,
            droppedEcNumbers: 1,
          }),
        })
      );
    });
  });

  describe('gene.name.* → genes[]', () => {
    it('should map gene.name.primary predictions to genes[].geneName', () => {
      const testResult = uniFireToUniProtkbConverter({
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021782'],
            annotationType: 'gene.name.primary',
            annotationValue: 'TP53',
          },
        ],
      });
      expect(testResult.genes?.[0].geneName?.value).toBe('TP53');
      expect(testResult.genes?.[0].geneName?.evidences).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00021782' },
      ]);
    });

    it('should attach gene.name.synonym predictions to genes[].synonyms', () => {
      const testResult = uniFireToUniProtkbConverter({
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021782'],
            annotationType: 'gene.name.primary',
            annotationValue: 'TP53',
          },
          {
            evidence: ['ARBA00021783'],
            annotationType: 'gene.name.synonym',
            annotationValue: 'P53',
          },
        ],
      });
      expect(testResult.genes?.[0].geneName?.value).toBe('TP53');
      expect(testResult.genes?.[0].synonyms?.map((s) => s.value)).toEqual([
        'P53',
      ]);
    });

    it('should emit a synonym-only gene entry when no primary name is predicted', () => {
      const testResult = uniFireToUniProtkbConverter({
        accession: 'UPI000000TEST:9606',
        predictions: [
          {
            evidence: ['ARBA00021783'],
            annotationType: 'gene.name.synonym',
            annotationValue: 'P53',
          },
        ],
      });
      expect(testResult.genes).toHaveLength(1);
      expect(testResult.genes?.[0].geneName).toBeUndefined();
      expect(testResult.genes?.[0].synonyms?.[0].value).toBe('P53');
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
      // Free-text types consolidate to one comment; structured types
      // (SUBCELLULAR LOCATION) emit one comment per prediction.
      const subcellularCount = unifireModelData.predictions.filter(
        (p) => p.annotationType === 'comment.subcellular_location'
      ).length;
      expect(countByCommentType?.FUNCTION).toBe(1);
      expect(countByCommentType?.SIMILARITY).toBe(1);
      expect(countByCommentType?.['SUBCELLULAR LOCATION']).toBe(
        subcellularCount
      );
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
      const testResult = uniFireToUniProtkbConverter(dataWithOnlyKeywords);
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

      const testResult = uniFireToUniProtkbConverter(dataWithUnknown);

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
        uniFireToUniProtkbConverter({ accession: 123 } as never)
      ).toThrow('Invalid UniFireModel input');
      expect(mockError).toHaveBeenCalledWith(
        expect.stringContaining('Invalid UniFireModel input')
      );
    });

    it('should throw when predictions is not an array', () => {
      expect(() =>
        uniFireToUniProtkbConverter({
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
    it('should emit one structured comment per SUBCELLULAR LOCATION prediction, preserving order', () => {
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
      const testResult = uniFireToUniProtkbConverter(data);
      const sl = (testResult.comments ?? []).filter(
        (c) => c.commentType === 'SUBCELLULAR LOCATION'
      ) as SubcellularLocationComment[];
      expect(sl).toHaveLength(3);
      expect(sl.map((c) => c.subcellularLocations?.[0].location.value)).toEqual(
        ['Cell membrane', 'Cytoplasm', 'Nucleus']
      );
    });

    it('should carry evidences on each structured subcellular location comment', () => {
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
      const testResult = uniFireToUniProtkbConverter(data);
      const sl = (testResult.comments ?? []).filter(
        (c) => c.commentType === 'SUBCELLULAR LOCATION'
      ) as SubcellularLocationComment[];
      expect(sl[0].subcellularLocations?.[0].location.evidences).toEqual([
        { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'ARBA00000001' },
      ]);
      expect(sl[1].subcellularLocations?.[0].location.evidences).toEqual([
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
      const testResult = uniFireToUniProtkbConverter(data);
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
      const testResult = uniFireToUniProtkbConverter(data);
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
      const out = uniFireToUniProtkbConverter(buildSingleKeyword(evidenceId));
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

      const testResult = uniFireToUniProtkbConverter(data);

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
