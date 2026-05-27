import * as logging from '../../../shared/utils/logging';
import {
  type Lineage,
  type TaxonomyDatum,
} from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import databaseInfoMaps from '../../../uniprotkb/utils/__tests__/__mocks__/databaseInfoMaps';
import unifireModelData from '../../__mocks__/unifireModelData';
import precomputedModelData from '../../__mocks__/uniparcPrecomputedModelData';
import { type UniParcPrecomputedModel } from '../../types/precomputed';
import buildSubEntryAnnotations, {
  buildSubEntryAnnotationDownload,
  getUnrenderedNameFields,
  shouldRequestUniFire,
  uniFireToDownloadModel,
  withOrganism,
} from '../subEntryAnnotations';

jest.mock('../../../shared/utils/logging', () => ({
  warn: jest.fn(),
  error: jest.fn(),
}));

const mockWarn = logging.warn as jest.MockedFunction<typeof logging.warn>;
const mockError = logging.error as jest.MockedFunction<typeof logging.error>;

describe('shouldRequestUniFire', () => {
  it('requests UniFire once precomputed has resolved with no data and the user opted in', () => {
    expect(
      shouldRequestUniFire({
        runUniFire: true,
        precomputedResolved: true,
        hasPrecomputed: false,
      })
    ).toBe(true);
  });

  it('does NOT request UniFire before the precomputed request has resolved', () => {
    // The whole point of the gating — UniFire must not fire while precomputed
    // is still in flight, or the preferred source would be bypassed.
    expect(
      shouldRequestUniFire({
        runUniFire: true,
        precomputedResolved: false,
        hasPrecomputed: false,
      })
    ).toBe(false);
  });

  it('does NOT request UniFire when precomputed data exists (precomputed wins)', () => {
    expect(
      shouldRequestUniFire({
        runUniFire: true,
        precomputedResolved: true,
        hasPrecomputed: true,
      })
    ).toBe(false);
  });

  it('does NOT request UniFire when the user has not opted in', () => {
    expect(
      shouldRequestUniFire({
        runUniFire: false,
        precomputedResolved: true,
        hasPrecomputed: false,
      })
    ).toBe(false);
  });
});

describe('withOrganism', () => {
  const apiModel = {
    primaryAccession: 'UPI000002A2F6-9606',
  } as UniProtkbAPIModel;

  const xrefOrganism: TaxonomyDatum = {
    taxonId: 9606,
    scientificName: 'Homo sapiens',
    lineage: [
      {
        taxonId: 2759,
        scientificName: 'Eukaryota',
        rank: 'no rank',
        hidden: false,
      },
      {
        taxonId: 33208,
        scientificName: 'Metazoa',
        rank: 'kingdom',
        hidden: false,
      },
      // A lineage node with no scientificName — must be filtered out.
      { taxonId: 9999, rank: 'no rank', hidden: true },
    ] as Lineage,
  };

  it('flattens the xref organism lineage to a string[] of scientific names', () => {
    expect(withOrganism(apiModel, xrefOrganism).organism?.lineage).toEqual([
      'Eukaryota',
      'Metazoa',
    ]);
  });

  it('preserves the other organism fields', () => {
    const { organism } = withOrganism(apiModel, xrefOrganism);
    expect(organism?.taxonId).toBe(9606);
    expect(organism?.scientificName).toBe('Homo sapiens');
  });

  it('yields an empty lineage when the xref organism has none', () => {
    expect(withOrganism(apiModel, { taxonId: 9606 }).organism?.lineage).toEqual(
      []
    );
  });

  it('returns the model untouched when there is no xref organism', () => {
    expect(withOrganism(apiModel, undefined)).toBe(apiModel);
  });
});

describe('buildSubEntryAnnotations', () => {
  beforeEach(() => {
    mockWarn.mockClear();
    mockError.mockClear();
  });

  it('returns undefined while databaseInfoMaps has not loaded (undefined)', () => {
    expect(
      buildSubEntryAnnotations({
        databaseInfoMaps: undefined,
        precomputed: precomputedModelData,
      })
    ).toBeUndefined();
  });

  it('returns undefined while databaseInfoMaps has not loaded (null)', () => {
    expect(
      buildSubEntryAnnotations({
        databaseInfoMaps: null,
        precomputed: precomputedModelData,
      })
    ).toBeUndefined();
  });

  it('returns undefined when neither source has data', () => {
    expect(buildSubEntryAnnotations({ databaseInfoMaps })).toBeUndefined();
  });

  // The caller only ever passes one source — `shouldRequestUniFire` stops the
  // UniFire fetch firing when precomputed data exists — so the two reachable
  // cases are precomputed-only and UniFire-only.
  it('builds annotations from the precomputed source', () => {
    const result = buildSubEntryAnnotations({
      databaseInfoMaps,
      precomputed: precomputedModelData,
      accession: 'UPI000002A2F6',
    });
    expect(result?.primaryAccession).toBe(
      precomputedModelData.primaryAccession
    );
  });

  it('builds annotations from UniFire when there is no precomputed data', () => {
    const result = buildSubEntryAnnotations({
      databaseInfoMaps,
      uniFire: unifireModelData,
      accession: 'UPI000002A2F6',
    });
    // UniFire's `UPI000002A2F6:9606` accession is normalised to the hyphenated
    // sub-entry form.
    expect(result?.primaryAccession).toBe('UPI000002A2F6-9606');
  });

  it('degrades to undefined and logs on a conversion failure', () => {
    const result = buildSubEntryAnnotations({
      databaseInfoMaps,
      // Missing `primaryAccession` — `precomputedToUniProtkbConverter` throws.
      precomputed: { entryType: 'AA' } as UniParcPrecomputedModel,
      accession: 'UPI-BROKEN',
    });
    expect(result).toBeUndefined();
    expect(mockError).toHaveBeenCalledWith(
      expect.stringContaining('Failed to build UniParc sub-entry annotations'),
      expect.objectContaining({
        extra: expect.objectContaining({
          accession: 'UPI-BROKEN',
          source: 'precomputed',
        }),
      })
    );
  });

  it('warns when precomputed keywords land in the generic Keywords section', () => {
    // A `Disease`-category keyword maps to a section the sub-entry does not
    // render on its own, so it falls back to the generic Keywords & GO section.
    buildSubEntryAnnotations({
      databaseInfoMaps,
      precomputed: {
        ...precomputedModelData,
        keywords: [
          ...(precomputedModelData.keywords ?? []),
          { id: 'KW-0225', name: 'Disease variant', category: 'Disease' },
        ],
      },
      accession: 'UPI000002A2F6',
    });
    expect(mockWarn).toHaveBeenCalledWith(
      expect.stringContaining('no dedicated sub-entry section'),
      expect.objectContaining({ extra: { accession: 'UPI000002A2F6' } })
    );
  });

  it('supplements the converted model with the xref organism and succeeds', () => {
    // The subcellular location viz requires organism.lineage as a string[].
    // This integration test verifies that xrefOrganism is correctly wired
    // through buildSubEntryAnnotations (precomputed path) without throwing.
    // The withOrganism unit tests above verify the lineage-flattening logic.
    const xrefOrganism: TaxonomyDatum = {
      taxonId: 9606,
      scientificName: 'Homo sapiens',
      lineage: [
        {
          taxonId: 2759,
          scientificName: 'Eukaryota',
          rank: 'no rank',
          hidden: false,
        },
        {
          taxonId: 33208,
          scientificName: 'Metazoa',
          rank: 'kingdom',
          hidden: false,
        },
      ] as Lineage,
    };
    const result = buildSubEntryAnnotations({
      databaseInfoMaps,
      precomputed: precomputedModelData,
      xrefOrganism,
      accession: 'UPI000002A2F6',
    });
    expect(result).toBeDefined();
    expect(result?.primaryAccession).toBeTruthy();
  });

  it('supplements the UniFire-converted model with the xref organism and succeeds', () => {
    const xrefOrganism: TaxonomyDatum = {
      taxonId: 9606,
      scientificName: 'Homo sapiens',
      lineage: [
        {
          taxonId: 2759,
          scientificName: 'Eukaryota',
          rank: 'no rank',
          hidden: false,
        },
      ] as Lineage,
    };
    const result = buildSubEntryAnnotations({
      databaseInfoMaps,
      uniFire: unifireModelData,
      xrefOrganism,
      accession: 'UPI000002A2F6',
    });
    expect(result).toBeDefined();
    expect(result?.primaryAccession).toBeTruthy();
  });

  it('does not emit the fallback-keyword warning for the UniFire branch', () => {
    buildSubEntryAnnotations({
      databaseInfoMaps,
      uniFire: unifireModelData,
      accession: 'UPI000002A2F6',
    });
    expect(mockWarn).not.toHaveBeenCalledWith(
      expect.stringContaining('no dedicated sub-entry section'),
      expect.anything()
    );
  });

  it('warns when precomputed populates a name field the sub-entry does not render', () => {
    // No corpus entry populates `submissionNames` today, but the type permits
    // it — the warning is the only thing standing between "rendered" and
    // "silently dropped" if that ever changes upstream.
    buildSubEntryAnnotations({
      databaseInfoMaps,
      precomputed: {
        ...precomputedModelData,
        proteinDescription: {
          ...precomputedModelData.proteinDescription,
          submissionNames: [
            {
              fullName: {
                value: 'Submitted name',
                evidences: [
                  { evidenceCode: 'ECO:0000256', source: 'ARBA', id: 'TEST' },
                ],
              },
            },
          ],
        },
      },
      accession: 'UPI000002A2F6',
    });
    expect(mockWarn).toHaveBeenCalledWith(
      expect.stringContaining(
        'Names & Taxonomy fields not rendered by the sub-entry'
      ),
      expect.objectContaining({ extra: { accession: 'UPI000002A2F6' } })
    );
  });

  it('does not emit the unrendered-name-fields warning for the UniFire branch', () => {
    // The UniFire converter cannot produce these fields, so the warning is
    // precomputed-only — the UniFire branch must stay quiet to avoid noise.
    buildSubEntryAnnotations({
      databaseInfoMaps,
      uniFire: unifireModelData,
      accession: 'UPI000002A2F6',
    });
    expect(mockWarn).not.toHaveBeenCalledWith(
      expect.stringContaining(
        'Names & Taxonomy fields not rendered by the sub-entry'
      ),
      expect.anything()
    );
  });
});

describe('getUnrenderedNameFields', () => {
  it('returns an empty list when annotations are undefined', () => {
    expect(getUnrenderedNameFields(undefined)).toEqual([]);
  });

  it('returns an empty list for the mock corpus (no unrendered fields populated)', () => {
    // Empirically the precomputed corpus does not populate any of the
    // unrendered fields — this assertion locks that in so a future mock change
    // would be visible in this test.
    const annotations = buildSubEntryAnnotations({
      databaseInfoMaps,
      precomputed: precomputedModelData,
      accession: 'UPI000002A2F6',
    });
    expect(getUnrenderedNameFields(annotations)).toEqual([]);
  });
});

describe('uniFireToDownloadModel', () => {
  it('drops the render-pipeline placeholders so the download is clean', () => {
    const model = uniFireToDownloadModel(unifireModelData);
    // `proteinExistence` / `uniProtkbId: ''` are only scaffolding for the
    // render pipeline — the download must mirror the precomputed shape.
    expect(Object.keys(model)).not.toContain('proteinExistence');
    expect(model.uniProtkbId).toBeNull();
  });

  it('keeps the transformed annotation payload', () => {
    const model = uniFireToDownloadModel(unifireModelData);
    expect(model.entryType).toBe('AA');
    expect(model.primaryAccession).toBe('UPI000002A2F6-9606');
    expect(Array.isArray(model.comments)).toBe(true);
  });
});

describe('buildSubEntryAnnotationDownload', () => {
  it('offers the precomputed annotation as an API URL download', () => {
    const result = buildSubEntryAnnotationDownload({
      hasPrecomputed: true,
      accession: 'UPI000002A2F6',
      taxId: 9606,
    });
    expect(result?.source).toBe('precomputed');
    if (result?.source === 'precomputed') {
      expect(result.apiURL).toContain('precomputed');
      expect(result.apiURL).toContain('UPI000002A2F6');
    }
  });

  it('offers the UniFire annotation as an on-the-fly JSON download', () => {
    const result = buildSubEntryAnnotationDownload({
      hasPrecomputed: false,
      uniFire: unifireModelData,
      accession: 'UPI000002A2F6',
      taxId: 9606,
    });
    expect(result?.source).toBe('unifire');
    if (result?.source === 'unifire') {
      expect(result.filename).toBe('UPI000002A2F6-9606-annotations.json');
      // The download model is the cleaned UniParcPrecomputedModel shape.
      expect(result.model.uniProtkbId).toBeNull();
    }
  });

  it('returns undefined when neither source is available', () => {
    expect(
      buildSubEntryAnnotationDownload({
        hasPrecomputed: false,
        accession: 'UPI000002A2F6',
        taxId: 9606,
      })
    ).toBeUndefined();
  });

  // Regression: the filename / API URL need the accession + taxId — without
  // them the descriptor must be withheld, not built with `undefined` segments.
  it('returns undefined when the accession or taxId is missing', () => {
    expect(
      buildSubEntryAnnotationDownload({ hasPrecomputed: true, taxId: 9606 })
    ).toBeUndefined();
    expect(
      buildSubEntryAnnotationDownload({
        hasPrecomputed: true,
        accession: 'UPI000002A2F6',
      })
    ).toBeUndefined();
  });

  it('returns undefined when the UniFire transform fails', () => {
    const result = buildSubEntryAnnotationDownload({
      hasPrecomputed: false,
      // No `predictions` array — uniFireToUniProtkbConverter throws.
      uniFire: { accession: 'UPI000002A2F6:9606' } as never,
      accession: 'UPI000002A2F6',
      taxId: 9606,
    });
    expect(result).toBeUndefined();
  });
});
