/**
 * @jest-environment node
 */
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import useDataApi from '../useDataApi';
import useDataApiWithStale from '../useDataApiWithStale';

const url = '/some/path';
const url2 = '/some/other/path';
const mock = new MockAdapter(axios);

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({ useDispatch: () => mockDispatch }));

afterEach(() => {
  mock.reset();
  mockDispatch.mockReset();
});

afterAll(() => {
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

    expect(result.current).toEqual({ loading: true, url });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      progress: 1,
      url,
      data: 'some data',
      status: 200,
    });
  });

  test('no network', async () => {
    mock.onGet(url).networkError();
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true, url });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      url,
      error: new Error('Network Error'),
    });
  });

  test('timeout', async () => {
    mock.onGet(url).timeout();
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true, url });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      url,
      error: new Error('timeout of 0ms exceeded'),
    });
  });

  test('400', async () => {
    const message = '??? does not exist';
    mock.onGet(url).reply(400, { messages: [message] });
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true, url });

    await waitForNextUpdate();

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        content: message,
        format: 'POP_UP',
        level: 'failure',
        id: 0,
      },
      type: 'ADD_MESSAGE',
    });

    expect(result.current).toEqual({
      error: new Error('Request failed with status code 400'),
      loading: false,
      url,
      status: 400,
    });
  });

  test('404', async () => {
    mock.onGet(url).reply(404);
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true, url });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      progress: 1,
      url,
      status: 404,
    });
  });

  test('cancellation', async () => {
    mock.onGet(url).reply(200, 'some data');
    const { result, unmount } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true, url });

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

    expect(result.current).toEqual({ loading: true, url });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      progress: 1,
      url,
      data: 'some data',
      status: 200,
    });

    rerender({ url: url2 });

    expect(result.current).toEqual({ loading: true, url: url2 });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      progress: 1,
      url: url2,
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

    expect(result.current).toEqual({ loading: true, url });

    rerender({ url: url2 });

    expect(result.current).toEqual({ loading: true, url: url2 });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      progress: 1,
      url: url2,
      data: 'some other data',
      status: 200,
    });
  });

  test('detect redirect', async () => {
    mock.onGet(url).reply(200, 'some data');
    mock.onGet(url2).reply(() => axios.get(url));

    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url2));

    expect(result.current).toEqual({ loading: true, url: url2 });

    await waitForNextUpdate();
    expect(result.current).toEqual({
      loading: false,
      progress: 1,
      url: url2,
      data: 'some data',
      status: 200,
      redirectedTo: url,
    });
  });
});

describe('useDataApiWithStale hook', () => {
  test('change of URL', async () => {
    mock.onGet(url).reply(200, 'some data');
    mock.onGet(url2).reply(200, 'some other data');
    const { result, waitForNextUpdate, rerender } = renderHook(
      (props) => useDataApiWithStale(props.url),
      { initialProps: { url } }
    );

    expect(result.current).toEqual({ loading: true, url });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      progress: 1,
      url,
      data: 'some data',
      status: 200,
    });

    rerender({ url: url2 });

    expect(result.current).toEqual({
      loading: true,
      url: url2,
      data: 'some data',
      isStale: true,
    });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      progress: 1,
      url: url2,
      data: 'some other data',
      status: 200,
    });
  });
});
