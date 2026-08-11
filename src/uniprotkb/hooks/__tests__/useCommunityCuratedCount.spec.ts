import { renderHook } from '@testing-library/react';

import useDataApi from '../../../shared/hooks/useDataApi';
import useCommunityCuratedCount, {
  useUniProtCommunityCuratedCount,
} from '../useCommunityCuratedCount';

jest.mock('../../../shared/hooks/useDataApi');

describe('useCommunityCuratedCount', () => {
  it('should query the community curation endpoint with HEAD', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });

    renderHook(() => useCommunityCuratedCount('P05067'));

    expect(useDataApi).toHaveBeenCalledWith(
      expect.stringContaining('bbsub_query?accession=P05067'),
      { method: 'HEAD' }
    );
  });

  it('should return the number of submissions', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      headers: { 'x-total-results': '3' },
    });

    const { result } = renderHook(() => useCommunityCuratedCount('P05067'));

    expect(result.current.count).toBe(3);
  });

  it('should return 0 when there are no submissions', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      headers: { 'x-total-results': '0' },
    });

    const { result } = renderHook(() => useCommunityCuratedCount('P05067'));

    expect(result.current.count).toBe(0);
  });

  it('should return 0 when the header is missing', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, headers: {} });

    const { result } = renderHook(() => useCommunityCuratedCount('P05067'));

    expect(result.current.count).toBe(0);
  });
});

describe('useUniProtCommunityCuratedCount', () => {
  it('should query our own publications endpoint for the community facet only', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });

    renderHook(() => useUniProtCommunityCuratedCount('P05067'));

    expect(useDataApi).toHaveBeenCalledWith(
      expect.stringContaining(
        'P05067/publications?facetFilter=%28types%3A%220%22%29&size=0'
      )
    );
  });

  it('should return the number of community references', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      headers: { 'x-total-results': '11' },
    });

    const { result } = renderHook(() =>
      useUniProtCommunityCuratedCount('P05067')
    );

    expect(result.current.count).toBe(11);
  });
});
