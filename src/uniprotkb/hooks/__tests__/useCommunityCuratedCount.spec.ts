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
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      headers: {},
    });

    const { result } = renderHook(() => useCommunityCuratedCount('P05067'));

    expect(result.current).toBe(0);
  });

  // A failed request carries the headers of its error response, which hold no
  // count
  it('should return 0 when the request failed', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      status: 500,
      headers: { 'content-type': 'text/html' },
      error: new Error('nope'),
    });

    const { result } = renderHook(() => useCommunityCuratedCount('P05067'));

    expect(result.current).toBe(0);
  });

  /* Anything the endpoint answers a count on is a count: this one is a HEAD to
  an external site whose exact status is not ours to predict, and the button it
  feeds used to disappear whenever we guessed at it. */
  it('should return the count whatever the status it came on', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      status: 203,
      headers: { 'x-total-results': '1' },
    });

    const { result } = renderHook(() => useCommunityCuratedCount('Q9QZ05'));

    expect(result.current).toBe(1);
  });

  it('should return 0 rather than NaN when the count is not a number', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      headers: { 'x-total-results': 'unknown' },
    });

    const { result } = renderHook(() => useCommunityCuratedCount('P05067'));

    expect(result.current).toBe(0);
  });

  it('should not request anything without an accession', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false });

    renderHook(() => useCommunityCuratedCount(undefined));

    expect(useDataApi).toHaveBeenCalledWith(null, { method: 'HEAD' });
  });
});
