import { type APIModel } from '../../../shared/types/apiModel';
import { Namespace } from '../../../shared/types/namespaces';
import { UniParcColumn } from '../../../uniparc/config/UniParcColumnConfiguration';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import { SortDirection } from '../../../uniprotkb/types/resultsTypes';
import { UniRefColumn } from '../../../uniref/config/UniRefColumnConfiguration';
import {
  basketSortValueGetters,
  getBasketSortFields,
  sortBasketAccessions,
} from '../basketSort';

// Builds the `getSortValue` callback the basket views pass in, from a plain
// map of entries keyed by the id they are stored under
const valueGetter = (
  namespace: Namespace,
  column: string,
  entries: Record<string, APIModel>
) => {
  const getValue = basketSortValueGetters[namespace]?.[column];
  return (accession: string) => {
    const entry = entries[accession.split('[')[0]];
    return getValue && entry ? getValue(entry) : undefined;
  };
};

const uniProtkbEntries = {
  P00002: {
    primaryAccession: 'P00002',
    uniProtkbId: 'ZZZZZ_HUMAN',
    organism: { taxonId: 9606, scientificName: 'Homo sapiens' },
  },
  P00001: {
    primaryAccession: 'P00001',
    uniProtkbId: 'AAAAA_MOUSE',
    organism: { taxonId: 10090, scientificName: 'Mus musculus' },
  },
} as unknown as Record<string, APIModel>;

describe('getBasketSortFields', () => {
  it('lists the columns to request sort values for', () => {
    expect(getBasketSortFields(Namespace.uniprotkb)).toEqual([
      'accession',
      'id',
      'organism_name',
    ]);
    expect(getBasketSortFields(Namespace.uniref)).toEqual([
      'id',
      'name',
      'organism',
    ]);
    expect(getBasketSortFields(Namespace.uniparc)).toEqual([
      'upi',
      'organism',
      'accession',
    ]);
    expect(getBasketSortFields(Namespace.proteomes)).toEqual([]);
  });
});

describe('sortBasketAccessions', () => {
  it('sorts UniProtKB entries by accession ascending and descending', () => {
    const accessions = ['P00002', 'P00001'];
    const getValue = valueGetter(
      Namespace.uniprotkb,
      UniProtKBColumn.accession,
      uniProtkbEntries
    );
    expect(
      sortBasketAccessions(
        accessions,
        {
          column: UniProtKBColumn.accession,
          direction: SortDirection.ascend,
        },
        getValue
      )
    ).toEqual(['P00001', 'P00002']);
    expect(
      sortBasketAccessions(
        accessions,
        {
          column: UniProtKBColumn.accession,
          direction: SortDirection.descend,
        },
        getValue
      )
    ).toEqual(['P00002', 'P00001']);
  });

  it('sorts UniProtKB entries by entry name (id)', () => {
    expect(
      sortBasketAccessions(
        ['P00002', 'P00001'],
        { column: UniProtKBColumn.id, direction: SortDirection.ascend },
        valueGetter(Namespace.uniprotkb, UniProtKBColumn.id, uniProtkbEntries)
      )
    ).toEqual(['P00001', 'P00002']);
  });

  it('sorts UniProtKB entries by organism name', () => {
    expect(
      sortBasketAccessions(
        ['P00002', 'P00001'],
        {
          column: UniProtKBColumn.organismName,
          direction: SortDirection.ascend,
        },
        valueGetter(
          Namespace.uniprotkb,
          UniProtKBColumn.organismName,
          uniProtkbEntries
        )
      )
      // Homo sapiens < Mus musculus
    ).toEqual(['P00002', 'P00001']);
  });

  it('keeps subset accessions with the entry they point at', () => {
    expect(
      sortBasketAccessions(
        ['P00002[1-100]', 'P00001'],
        {
          column: UniProtKBColumn.organismName,
          direction: SortDirection.ascend,
        },
        valueGetter(
          Namespace.uniprotkb,
          UniProtKBColumn.organismName,
          uniProtkbEntries
        )
      )
    ).toEqual(['P00002[1-100]', 'P00001']);
  });

  it('sorts UniRef entries by id, name and organism', () => {
    const entries = Object.fromEntries(
      [
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
      ].map((entry) => [entry.id, entry])
    ) as unknown as Record<string, APIModel>;
    const accessions = ['UniRef90_B', 'UniRef90_A'];
    for (const column of [
      UniRefColumn.id,
      UniRefColumn.name,
      UniRefColumn.organism,
    ]) {
      expect(
        sortBasketAccessions(
          accessions,
          { column, direction: SortDirection.ascend },
          valueGetter(Namespace.uniref, column, entries)
        )
      ).toEqual(['UniRef90_A', 'UniRef90_B']);
    }
  });

  it('sorts UniParc entries by upi, organism and UniProtKB accession', () => {
    const entries = {
      UPI0000000002: {
        uniParcId: 'UPI0000000002',
        organisms: [{ taxonId: 2, scientificName: 'Zebra' }],
        uniProtKBAccessions: ['Q00002'],
      },
      UPI0000000001: {
        uniParcId: 'UPI0000000001',
        organisms: [{ taxonId: 1, scientificName: 'Ant' }],
        uniProtKBAccessions: ['Q00001'],
      },
    } as unknown as Record<string, APIModel>;
    const accessions = ['UPI0000000002', 'UPI0000000001'];
    for (const column of [
      UniParcColumn.upi,
      UniParcColumn.organism,
      UniParcColumn.accession,
    ]) {
      expect(
        sortBasketAccessions(
          accessions,
          { column, direction: SortDirection.ascend },
          valueGetter(Namespace.uniparc, column, entries)
        )
      ).toEqual(['UPI0000000001', 'UPI0000000002']);
    }
  });

  it('appends basket accessions with no sort value (no data loss)', () => {
    // "P99999" is in the basket but has no entry (e.g. obsolete)
    expect(
      sortBasketAccessions(
        ['P00002', 'P99999', 'P00001'],
        {
          column: UniProtKBColumn.accession,
          direction: SortDirection.ascend,
        },
        valueGetter(
          Namespace.uniprotkb,
          UniProtKBColumn.accession,
          uniProtkbEntries
        )
      )
    ).toEqual(['P00001', 'P00002', 'P99999']);
  });

  it('returns the accessions unchanged when nothing has a sort value', () => {
    const accessions = ['P00002', 'P00001'];
    // Column without an accessor
    expect(
      sortBasketAccessions(
        accessions,
        {
          column: UniProtKBColumn.proteinName,
          direction: SortDirection.ascend,
        },
        valueGetter(
          Namespace.uniprotkb,
          UniProtKBColumn.proteinName,
          uniProtkbEntries
        )
      )
    ).toEqual(accessions);
  });
});
