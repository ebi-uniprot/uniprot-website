import { renderHook, waitFor } from '@testing-library/react';

import useDataApi from '../../../../../shared/hooks/useDataApi';
import {
  type UniParcXRef,
  XRefsInternalDatabasesEnum,
} from '../../../../adapters/uniParcConverter';
import useObsoleteXRefStatuses from '../useObsoleteXRefStatuses';

jest.mock('../../../../../shared/hooks/useDataApi');

const mockUseDataApi = useDataApi as jest.Mock;

const obsoleteTrEMBL = (id: string): UniParcXRef => ({
  id,
  database: XRefsInternalDatabasesEnum.UNREVIEWED,
  active: false,
});

const inactive = (primaryAccession: string, inactiveReasonType: string) => ({
  primaryAccession,
  entryType: 'Inactive',
  inactiveReason: { inactiveReasonType },
});

// Answer only for the accessions the URL actually asks about, so a test can
// tell what a given batch was allowed to resolve.
const mockUniProtKB = (entries: Record<string, object>) => {
  mockUseDataApi.mockImplementation((url?: string | null) => {
    if (!url) {
      return { loading: false };
    }
    const query =
      new URL(url, 'http://localhost').searchParams.get('query') || '';
    const asked = Array.from(
      query.matchAll(/accession:(\S+)/g),
      ([, id]) => id
    );
    return {
      loading: false,
      data: {
        results: asked.filter((id) => id in entries).map((id) => entries[id]),
      },
    };
  });
};

const searchUrls = () =>
  mockUseDataApi.mock.calls
    .map(([url]) => url as string | null | undefined)
    .filter((url) => url?.includes('/uniprotkb/search'));

const accessionsAskedFor = (url: string) =>
  Array.from(
    (new URL(url, 'http://localhost').searchParams.get('query') || '').matchAll(
      /accession:(\S+)/g
    ),
    ([, id]) => id
  );

beforeEach(() => {
  jest.resetAllMocks();
  mockUniProtKB({});
});

describe('useObsoleteXRefStatuses', () => {
  it('asks UniProtKB only about the obsolete TrEMBL cross-references', async () => {
    mockUniProtKB({
      Q76QK2: inactive('Q76QK2', 'DEMERGED'),
      Q76ZT7: inactive('Q76ZT7', 'DELETED'),
    });

    const { result } = renderHook(() =>
      useObsoleteXRefStatuses([
        obsoleteTrEMBL('Q76ZT7'),
        obsoleteTrEMBL('Q76QK2'),
        // Still active, so nothing to resolve
        { ...obsoleteTrEMBL('Q0GNZ6'), active: true },
        // Reviewed entries link to their history without a lookup
        {
          id: 'P12345',
          database: XRefsInternalDatabasesEnum.REVIEWED,
          active: false,
        },
        // Not a UniProtKB cross-reference at all
        { id: 'AAB12345', database: 'EMBL', active: false },
      ])
    );

    const [url] = searchUrls();
    expect(url).toBeDefined();
    const { searchParams } = new URL(url as string, 'http://localhost');
    // Sorted, so scrolling back and forth reuses the same URL
    expect(searchParams.get('query')).toBe(
      'accession:Q76QK2 OR accession:Q76ZT7'
    );
    // Without this the endpoint would silently cap the response at its default 25
    expect(searchParams.get('size')).toBe('2');
    expect(searchParams.get('fields')).toBe('accession');
    // Facets on this query would be paid for and thrown away
    expect(searchParams.has('facets')).toBe(false);

    await waitFor(() =>
      expect(result.current).toEqual(
        new Map([
          ['Q76QK2', 'merged'],
          ['Q76ZT7', 'deleted'],
        ])
      )
    );
  });

  it('makes no request when nothing needs resolving', () => {
    renderHook(() =>
      useObsoleteXRefStatuses([{ ...obsoleteTrEMBL('Q0GNZ6'), active: true }])
    );

    expect(searchUrls()).toHaveLength(0);
  });

  it('reads an entry UniProtKB still has as active, and an absent one as unresolved', async () => {
    mockUniProtKB({
      // The xref `active` flag lags behind UniProtKB, so this happens in real data
      Q0GNZ6: {
        primaryAccession: 'Q0GNZ6',
        entryType: 'UniProtKB unreviewed (TrEMBL)',
      },
    });

    const { result } = renderHook(() =>
      useObsoleteXRefStatuses([
        obsoleteTrEMBL('Q0GNZ6'),
        obsoleteTrEMBL('Q99999'),
      ])
    );

    await waitFor(() =>
      expect(result.current).toEqual(new Map([['Q0GNZ6', 'active']]))
    );
    // Absent from the response means "no such accession", not "alive again"
    expect(result.current.has('Q99999')).toBe(false);
  });

  // Each loaded page adds obsolete accessions; re-deriving the map from the
  // latest response alone would blank out rows that had already resolved.
  it('keeps resolved statuses when a new page adds accessions', async () => {
    mockUniProtKB({
      Q76QK2: inactive('Q76QK2', 'MERGED'),
      Q76ZT7: inactive('Q76ZT7', 'DELETED'),
    });

    const { result, rerender } = renderHook(
      ({ xrefs }: { xrefs: UniParcXRef[] }) => useObsoleteXRefStatuses(xrefs),
      { initialProps: { xrefs: [obsoleteTrEMBL('Q76QK2')] } }
    );

    await waitFor(() =>
      expect(result.current).toEqual(new Map([['Q76QK2', 'merged']]))
    );

    rerender({ xrefs: [obsoleteTrEMBL('Q76QK2'), obsoleteTrEMBL('Q76ZT7')] });

    await waitFor(() =>
      expect(result.current).toEqual(
        new Map([
          ['Q76QK2', 'merged'],
          ['Q76ZT7', 'deleted'],
        ])
      )
    );
    // The already-resolved accession is not asked about a second time
    expect(
      searchUrls().map((url) => accessionsAskedFor(url as string))
    ).toEqual([['Q76QK2'], ['Q76ZT7']]);
  });

  // The search endpoint rejects more than 100 OR clauses, so the rest have to
  // wait for a following batch rather than evict what already resolved.
  it('resolves more accessions than fit in one query, a batch at a time', async () => {
    const ids = Array.from(
      { length: 150 },
      (_, i) => `Q${`${i}`.padStart(5, '0')}`
    );
    mockUniProtKB(
      Object.fromEntries(ids.map((id) => [id, inactive(id, 'DELETED')]))
    );

    const { result } = renderHook(() =>
      useObsoleteXRefStatuses(ids.map(obsoleteTrEMBL))
    );

    await waitFor(() => expect(result.current.size).toBe(150));
    const batches = searchUrls().map((url) =>
      accessionsAskedFor(url as string)
    );
    expect(batches.map((batch) => batch.length)).toEqual([100, 50]);
    expect(batches.flat().sort()).toEqual([...ids].sort());
  });
});
