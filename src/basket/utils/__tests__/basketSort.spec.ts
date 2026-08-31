import { type APIModel } from '../../../shared/types/apiModel';
import { Namespace } from '../../../shared/types/namespaces';
import { UniParcColumn } from '../../../uniparc/config/UniParcColumnConfiguration';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import { SortDirection } from '../../../uniprotkb/types/resultsTypes';
import { UniRefColumn } from '../../../uniref/config/UniRefColumnConfiguration';
import { sortBasketAccessions } from '../basketSort';

const uniProtkbResults = [
  {
    primaryAccession: 'P00002',
    uniProtkbId: 'ZZZZZ_HUMAN',
    organism: { taxonId: 9606, scientificName: 'Homo sapiens' },
  },
  {
    primaryAccession: 'P00001',
    uniProtkbId: 'AAAAA_MOUSE',
    organism: { taxonId: 10090, scientificName: 'Mus musculus' },
  },
] as unknown as APIModel[];

describe('sortBasketAccessions', () => {
  it('sorts UniProtKB entries by accession ascending and descending', () => {
    const accessions = ['P00002', 'P00001'];
    expect(
      sortBasketAccessions(uniProtkbResults, Namespace.uniprotkb, accessions, {
        column: UniProtKBColumn.accession,
        direction: SortDirection.ascend,
      })
    ).toEqual(['P00001', 'P00002']);
    expect(
      sortBasketAccessions(uniProtkbResults, Namespace.uniprotkb, accessions, {
        column: UniProtKBColumn.accession,
        direction: SortDirection.descend,
      })
    ).toEqual(['P00002', 'P00001']);
  });

  it('sorts UniProtKB entries by entry name (id)', () => {
    expect(
      sortBasketAccessions(
        uniProtkbResults,
        Namespace.uniprotkb,
        ['P00002', 'P00001'],
        { column: UniProtKBColumn.id, direction: SortDirection.ascend }
      )
    ).toEqual(['P00001', 'P00002']);
  });

  it('sorts UniProtKB entries by organism name', () => {
    expect(
      sortBasketAccessions(
        uniProtkbResults,
        Namespace.uniprotkb,
        ['P00002', 'P00001'],
        {
          column: UniProtKBColumn.organismName,
          direction: SortDirection.ascend,
        }
      )
    ).toEqual(['P00002', 'P00001']); // Homo sapiens < Mus musculus
  });

  it('sorts UniRef entries by id, name and organism', () => {
    const results = [
      {
        id: 'UniRef90_B',
        name: 'Cluster Zeta',
        organisms: [{ taxonId: 2, scientificName: 'Zebra' }],
      },
      {
        id: 'UniRef90_A',
        name: 'Cluster Alpha',
        organisms: [{ taxonId: 1, scientificName: 'Ant' }],
      },
    ] as unknown as APIModel[];
    const accessions = ['UniRef90_B', 'UniRef90_A'];
    expect(
      sortBasketAccessions(results, Namespace.uniref, accessions, {
        column: UniRefColumn.id,
        direction: SortDirection.ascend,
      })
    ).toEqual(['UniRef90_A', 'UniRef90_B']);
    expect(
      sortBasketAccessions(results, Namespace.uniref, accessions, {
        column: UniRefColumn.name,
        direction: SortDirection.ascend,
      })
    ).toEqual(['UniRef90_A', 'UniRef90_B']);
    expect(
      sortBasketAccessions(results, Namespace.uniref, accessions, {
        column: UniRefColumn.organism,
        direction: SortDirection.ascend,
      })
    ).toEqual(['UniRef90_A', 'UniRef90_B']);
  });

  it('sorts UniParc entries by upi, organism and UniProtKB accession', () => {
    const results = [
      {
        uniParcId: 'UPI0000000002',
        organisms: [{ taxonId: 2, scientificName: 'Zebra' }],
        uniProtKBAccessions: ['Q00002'],
      },
      {
        uniParcId: 'UPI0000000001',
        organisms: [{ taxonId: 1, scientificName: 'Ant' }],
        uniProtKBAccessions: ['Q00001'],
      },
    ] as unknown as APIModel[];
    const accessions = ['UPI0000000002', 'UPI0000000001'];
    expect(
      sortBasketAccessions(results, Namespace.uniparc, accessions, {
        column: UniParcColumn.upi,
        direction: SortDirection.ascend,
      })
    ).toEqual(['UPI0000000001', 'UPI0000000002']);
    expect(
      sortBasketAccessions(results, Namespace.uniparc, accessions, {
        column: UniParcColumn.organism,
        direction: SortDirection.ascend,
      })
    ).toEqual(['UPI0000000001', 'UPI0000000002']);
    expect(
      sortBasketAccessions(results, Namespace.uniparc, accessions, {
        column: UniParcColumn.accession,
        direction: SortDirection.ascend,
      })
    ).toEqual(['UPI0000000001', 'UPI0000000002']);
  });

  it('appends basket accessions missing from the loaded results (no data loss)', () => {
    // "P99999" is in the basket but not returned in the results (e.g. obsolete)
    const accessions = ['P00002', 'P99999', 'P00001'];
    expect(
      sortBasketAccessions(uniProtkbResults, Namespace.uniprotkb, accessions, {
        column: UniProtKBColumn.accession,
        direction: SortDirection.ascend,
      })
    ).toEqual(['P00001', 'P00002', 'P99999']);
  });

  it('returns the accessions unchanged when there is nothing to sort', () => {
    const accessions = ['P00002', 'P00001'];
    // No loaded results
    expect(
      sortBasketAccessions([], Namespace.uniprotkb, accessions, {
        column: UniProtKBColumn.accession,
        direction: SortDirection.ascend,
      })
    ).toBe(accessions);
    // Column without an accessor
    expect(
      sortBasketAccessions(uniProtkbResults, Namespace.uniprotkb, accessions, {
        column: UniProtKBColumn.proteinName,
        direction: SortDirection.ascend,
      })
    ).toBe(accessions);
  });
});
