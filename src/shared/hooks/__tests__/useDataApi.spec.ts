/**
 * @jest-environment node
 */
import { renderHook, cleanup } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import useDataApi from '../useDataApi';

const url = '/some/path';
const url2 = '/some/other/path';
let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  cleanup();
  mock.restore();
});

describe('useDataApi hook', () => {
  test('no URL', async () => {
    const { result } = renderHook(() => useDataApi());

    expect(result.current).toEqual({ loading: false });
  });

  test('no error', async () => {
    mock.onGet(url).reply(200, 'some data');
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      data: 'some data',
      status: 200,
    });
  });

  test('no network', async () => {
    mock.onGet(url).networkError();
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      error: new Error('Network Error'),
    });
  });

  test('timeout', async () => {
    mock.onGet(url).timeout();
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      error: new Error('timeout of 0ms exceeded'),
    });
  });

  test('404', async () => {
    mock.onGet(url).reply(404);
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      status: 404,
      error: new Error('Request failed with status code 404'),
    });
  });

  test('cancellation', async () => {
    mock.onGet(url).reply(200, 'some data');
    const { result, unmount } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true });

    unmount();
    // not sure how to test cancellation, but at least make sure there's no
    // error when we cancel before getting data
  });

  test('change of URL', async () => {
    mock.onGet(url).reply(200, 'some data');
    mock.onGet(url2).reply(200, 'some other data');
    const { result, waitForNextUpdate, rerender } = renderHook(
      (props) => useDataApi(props.url),
      { initialProps: { url } }
    );

    expect(result.current).toEqual({ loading: true });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      data: 'some data',
      status: 200,
    });

    rerender({ url: url2 });

    expect(result.current).toEqual({ loading: true });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      data: 'some other data',
      status: 200,
    });
  });

  test('change of URL without waiting', async () => {
    mock.onGet(url).reply(200, 'some data');
    mock.onGet(url2).reply(200, 'some other data');
    const { result, waitForNextUpdate, rerender } = renderHook(
      (props) => useDataApi(props.url),
      { initialProps: { url } }
    );

    expect(result.current).toEqual({ loading: true });

    rerender({ url: url2 });

    expect(result.current).toEqual({ loading: true });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      data: 'some other data',
      status: 200,
    });
  });

  test('detect redirect', async () => {
    mock.onGet(url).reply(200, 'some data');
    mock.onGet(url2).reply(() => axios.get(url));

    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url2));

    expect(result.current).toEqual({ loading: true });

    await waitForNextUpdate();
    expect(result.current).toEqual({
      loading: false,
      data: 'some data',
      status: 200,
      redirectedTo: url,
    });
  });
});
