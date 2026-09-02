import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import usePrecomputedProteomeCount from '../usePrecomputedProteomeCount';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  mock.restore();
});

describe('usePrecomputedProteomeCount', () => {
  const upId = 'UP000005640';
  const url = `/<testing>/api/uniprotkb/precomputed/proteome/${upId}?size=0`;

  it('returns count when HEAD request succeeds with x-total-results header', async () => {
    mock.onHead(url).reply(200, undefined, { 'x-total-results': '13794' });

    const { result } = renderHook(() => usePrecomputedProteomeCount(upId));

    expect(result.current).toBe(0);

    await waitFor(() => {
      expect(result.current).toBe(13794);
    });
  });

  it('returns 0 when HEAD request returns 404', async () => {
    mock.onHead(url).reply(404);

    const { result } = renderHook(() => usePrecomputedProteomeCount(upId));

    expect(result.current).toBe(0);

    await waitFor(() => {
      expect(mock.history.head.length).toBe(1);
    });
    expect(result.current).toBe(0);
  });

  it('returns 0 when x-total-results header is missing', async () => {
    mock.onHead(url).reply(200, undefined, {});

    const { result } = renderHook(() => usePrecomputedProteomeCount(upId));

    expect(result.current).toBe(0);

    await waitFor(() => {
      expect(mock.history.head.length).toBe(1);
    });
    expect(result.current).toBe(0);
  });

  it('returns 0 when x-total-results header is non-numeric', async () => {
    mock.onHead(url).reply(200, undefined, { 'x-total-results': 'invalid' });

    const { result } = renderHook(() => usePrecomputedProteomeCount(upId));

    expect(result.current).toBe(0);

    await waitFor(() => {
      expect(mock.history.head.length).toBe(1);
    });
    expect(result.current).toBe(0);
  });

  it('does not send a request when upId is undefined', () => {
    const { result } = renderHook(() => usePrecomputedProteomeCount(undefined));

    expect(result.current).toBe(0);
    expect(mock.history.head).toHaveLength(0);
  });
});
