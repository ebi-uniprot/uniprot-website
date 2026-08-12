import { renderHook } from '@testing-library/react';

import useDataApi from '../../../shared/hooks/useDataApi';
import useCommunityCuratedCount from '../useCommunityCuratedCount';

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

    expect(result.current).toBe(3);
  });

  it('should return 0 when there are no submissions', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      headers: { 'x-total-results': '0' },
    });

    const { result } = renderHook(() => useCommunityCuratedCount('P05067'));

    expect(result.current).toBe(0);
  });

  it('should return 0 when the header is missing', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, headers: {} });

    const { result } = renderHook(() => useCommunityCuratedCount('P05067'));

    expect(result.current).toBe(0);
  });

  it('should not request anything without an accession', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false });

    renderHook(() => useCommunityCuratedCount(undefined));

    expect(useDataApi).toHaveBeenCalledWith(null, { method: 'HEAD' });
  });
});
