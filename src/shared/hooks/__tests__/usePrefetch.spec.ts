import { getByTestId } from '@testing-library/react';
import { renderHook } from '@testing-library/react';

import './__mocks__/relListSupportMock';

import usePrefetch from '../usePrefetch';

const url = '/some/path';
const url2 = '/some/other/path';

describe('usePrefetch hook', () => {
  test('no URL', async () => {
    renderHook(() => usePrefetch());

    const link = getByTestId(document.head, 'prefetch');
    expect(link.getAttribute('href')).toBeFalsy();
  });

  test('basic case', async () => {
    renderHook(() => usePrefetch(url));

    const link = getByTestId(document.head, 'prefetch');
    expect(link.getAttribute('rel')).toBe('prefetch');
    expect(link.getAttribute('href')).toBe(url);
  });

  test('change of URL', async () => {
    const { rerender } = renderHook((props) => usePrefetch(props.url), {
      initialProps: { url },
    });

    const link = getByTestId(document.head, 'prefetch');
    expect(link.getAttribute('rel')).toBe('prefetch');
    expect(link.getAttribute('href')).toBe(url);

    rerender({ url: url2 });

    const link2 = getByTestId(document.head, 'prefetch');
    expect(link2).toBe(link);
    expect(link.getAttribute('href')).toBe(url2);
  });
});
