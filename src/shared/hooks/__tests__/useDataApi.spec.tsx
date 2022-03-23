/**
 * @jest-environment node
 */
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import useDataApi from '../useDataApi';
import useDataApiWithStale from '../useDataApiWithStale';
import { MessagesDispatchContext } from '../../contexts/Messages';

const url = '/some/path';
const url2 = '/some/other/path';
const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  mock.restore();
});

describe('useDataApi hook', () => {
  it('should handle no URL', async () => {
    const { result } = renderHook(() => useDataApi());

    expect(result.current).toEqual({ loading: false });
  });

  it('should return no error', async () => {
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

  it('should return no network error', async () => {
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

  it('should return timeout error', async () => {
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

  it('should return 400', async () => {
    const message = '??? does not exist';
    mock.onGet(url).reply(400, { messages: [message] });
    const mockDispatch = jest.fn();
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url), {
      wrapper: ({ children }) => (
        <MessagesDispatchContext.Provider value={mockDispatch}>
          {children}
        </MessagesDispatchContext.Provider>
      ),
    });

    expect(result.current).toEqual({ loading: true, url });

    await waitForNextUpdate();

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        content: message,
        format: 'POP_UP',
        level: 'failure',
        id: message,
        displayTime: 5_000,
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

  it('should return 404', async () => {
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

  it('should handle cancellation', async () => {
    mock.onGet(url).reply(200, 'some data');
    const { result, unmount } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true, url });

    unmount();
    // not sure how to test cancellation, but at least make sure there's no
    // error when we cancel before getting data
  });

  it('should handle change of URL', async () => {
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

  it('should handle change of URL without waiting', async () => {
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

  it('should detect redirect', async () => {
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
  it('should change URL', async () => {
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

  it('should return SyntaxError with invalid json from a 200 response', async () => {
    mock
      .onGet(url)
      .reply(200, '{"key" : "value",,', { 'Content-Type': 'application/json' });
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true, url });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      error: new SyntaxError('Unexpected token , in JSON at position 17'),
      loading: false,
      url,
    });
  });
});
