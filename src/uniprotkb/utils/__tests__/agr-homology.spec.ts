// agr-homology-utils.test.ts

import * as logging from '../../../shared/utils/logging';
import { AgrOrthologsResult } from '../../types/agrOrthologs';
import { AgrParalogsResult } from '../../types/agrParalogs';
import {
  getTaxonQuery,
  getXrefAndTaxonQuery,
  getXrefQuery,
} from '../agr-homology';

describe('getTaxonQuery', () => {
  it('returns a taxonomy query when CURIE has digits', () => {
    expect(getTaxonQuery('NCBITaxon:9606')).toBe('(taxonomy_id:9606)');
    expect(getTaxonQuery('ncbitaxon:1234')).toBe('(taxonomy_id:1234)');
  });

  it('returns null when CURIE has no numeric ID', () => {
    expect(getTaxonQuery('NCBITaxon:')).toBeNull();
    expect(getTaxonQuery('FOO:9606')).toBeNull();
    expect(getTaxonQuery('not-a-curie')).toBeNull();
  });
});

describe('getXrefQuery', () => {
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    errorSpy = jest.spyOn(logging, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    errorSpy.mockRestore();
  });

  it('builds the correct xref query for known prefixes', () => {
    expect(getXrefQuery('MGI:88059')).toBe('(xref:mgi-88059)');
    expect(getXrefQuery('Xenbase:XB-GENE-479154')).toBe(
      '(xref:xenbase-XB-GENE-479154)'
    );
    expect(getXrefQuery('FB:FBgn0000108')).toBe('(xref:flybase-FBgn0000108)');
    expect(getXrefQuery('ZFIN:ZDB-GENE-000616-13')).toBe(
      '(xref:zfin-ZDB-GENE-000616-13)'
    );
  });

  it('returns null and logs if prefix is unknown', () => {
    const result = getXrefQuery('UNKNOWN:1234');
    expect(result).toBeNull();
    expect(errorSpy).toHaveBeenCalledWith(
      'No query prefix found for AGR primaryExternalId: UNKNOWN:1234'
    );
  });

  it('does not log for IDs with empty token array (split always returns array)', () => {
    errorSpy.mockClear();
    expect(getXrefQuery('MGI')).toBe('(xref:mgi-)');
    expect(errorSpy).not.toHaveBeenCalled();
  });
});

describe('getXrefAndTaxonQuery', () => {
  type Gene =
    | AgrOrthologsResult['geneToGeneOrthologyGenerated']['objectGene']
    | AgrParalogsResult['geneToGeneParalogy']['objectGene'];

  const makeGene = (curie: string, primaryExternalId: string) =>
    ({
      taxon: { curie },
      primaryExternalId,
    }) as Gene;

  it('combines taxon and xref when both are valid', () => {
    const gene = makeGene('NCBITaxon:9999', 'HGNC:620');
    expect(getXrefAndTaxonQuery(gene)).toBe(
      '(taxonomy_id:9999) AND (xref:hgnc-620)'
    );
  });

  it('returns null if taxon query is null', () => {
    const gene = makeGene('BADCURIE', 'MGI:88059');
    expect(getXrefAndTaxonQuery(gene)).toBeNull();
  });

  it('returns null if xref query is null', () => {
    const gene = makeGene('NCBITaxon:1010', 'UNKNOWN:1');
    expect(getXrefAndTaxonQuery(gene)).toBeNull();
  });

  it('returns null if both parts are invalid', () => {
    const gene = makeGene('foo', 'bar');
    expect(getXrefAndTaxonQuery(gene)).toBeNull();
  });
});
