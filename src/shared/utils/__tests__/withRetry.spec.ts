import { AxiosError, AxiosHeaders, CanceledError } from 'axios';

import withRetry, { isSafeMethod } from '../withRetry';

const responseError = (status: number, headers: Record<string, string> = {}) =>
  new AxiosError(
    `Request failed with status code ${status}`,
    String(status),
    undefined,
    undefined,
    {
      status,
      statusText: '',
      data: undefined,
      headers: new AxiosHeaders(headers),
      config: { headers: new AxiosHeaders() },
    }
  );

describe('isSafeMethod', () => {
  it.each([undefined, 'GET', 'get', 'HEAD', 'OPTIONS'])(
    'allows %s to be replayed',
    (method) => {
      expect(isSafeMethod(method)).toBe(true);
    }
  );

  it.each(['POST', 'post', 'PUT', 'PATCH', 'DELETE'])(
    'refuses to replay %s',
    (method) => {
      expect(isSafeMethod(method)).toBe(false);
    }
  );
});

describe('withRetry', () => {
  let setTimeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    setTimeoutSpy = jest.spyOn(window, 'setTimeout');
  });

  afterEach(() => {
    // Before handing the timers back, or the spy restores over the real ones
    setTimeoutSpy.mockRestore();
    jest.useRealTimers();
  });

  // The backoffs withRetry asked for. Asserting on these rather than on
  // elapsed wall-clock time states the contract exactly instead of
  // approximately, and doesn't make the suite sit through its own backoff.
  const scheduledDelays = (): number[] =>
    setTimeoutSpy.mock.calls.map(([, delay]) => delay);

  // Longer than every backoff withRetry can schedule, so this always runs the
  // retries to completion. Nothing else here schedules a timer.
  const flushBackoffs = () => jest.advanceTimersByTimeAsync(60_000);

  it('does not call again when the first attempt succeeds', async () => {
    const attempt = jest.fn().mockResolvedValue('data');

    await expect(withRetry(attempt)).resolves.toBe('data');
    expect(attempt).toHaveBeenCalledTimes(1);
    expect(scheduledDelays()).toHaveLength(0);
  });

  it.each([408, 425, 429, 500, 502, 503, 504])(
    'retries a %s',
    async (status) => {
      const attempt = jest
        .fn()
        .mockRejectedValueOnce(responseError(status))
        .mockResolvedValue('data');

      const retried = withRetry(attempt);
      await flushBackoffs();

      await expect(retried).resolves.toBe('data');
      expect(attempt).toHaveBeenCalledTimes(2);
    }
  );

  it('retries a network error, which has no status', async () => {
    const attempt = jest
      .fn()
      .mockRejectedValueOnce(new AxiosError('Network Error'))
      .mockResolvedValue('data');

    const retried = withRetry(attempt);
    await flushBackoffs();

    await expect(retried).resolves.toBe('data');
    expect(attempt).toHaveBeenCalledTimes(2);
  });

  it.each([400, 401, 403, 404, 410])(
    'does not retry a %s -- that is an answer, not a failure',
    async (status) => {
      const error = responseError(status);
      const attempt = jest.fn().mockRejectedValue(error);

      await expect(withRetry(attempt)).rejects.toBe(error);
      expect(attempt).toHaveBeenCalledTimes(1);
    }
  );

  it('does not retry a cancellation', async () => {
    const controller = new AbortController();
    controller.abort();
    const error = new CanceledError('cancelled');
    const attempt = jest.fn().mockRejectedValue(error);

    await expect(
      withRetry(attempt, { signal: controller.signal })
    ).rejects.toBe(error);
    expect(attempt).toHaveBeenCalledTimes(1);
  });

  it('does not retry a SyntaxError, which means a VPN interstitial', async () => {
    const error = new SyntaxError('Unexpected token');
    const attempt = jest.fn().mockRejectedValue(error);

    await expect(withRetry(attempt)).rejects.toBe(error);
    expect(attempt).toHaveBeenCalledTimes(1);
  });

  it('does not retry an error that is not a failed request at all', async () => {
    // A bug in our own code is not something the API can answer differently
    const error = new TypeError('x is not a function');
    const attempt = jest.fn().mockRejectedValue(error);

    await expect(withRetry(attempt)).rejects.toBe(error);
    expect(attempt).toHaveBeenCalledTimes(1);
  });

  it('gives up after two retries and rejects with the original error', async () => {
    const error = responseError(503);
    const attempt = jest.fn().mockRejectedValue(error);

    const settled = expect(withRetry(attempt)).rejects.toBe(error);
    await flushBackoffs();
    await settled;

    expect(attempt).toHaveBeenCalledTimes(3);
  });

  it('reports each replay through onRetry, once per attempt', async () => {
    const onRetry = jest.fn();
    const attempt = jest.fn().mockRejectedValue(responseError(503));

    const settled = expect(
      withRetry(attempt, { onRetry })
    ).rejects.toBeDefined();
    await flushBackoffs();
    await settled;

    // Three attempts, but only the two that got another go are marked
    expect(attempt).toHaveBeenCalledTimes(3);
    expect(onRetry).toHaveBeenCalledTimes(2);
  });

  it('does not report a retry when there was none', async () => {
    const onRetry = jest.fn();
    const attempt = jest.fn().mockRejectedValue(responseError(404));

    await expect(withRetry(attempt, { onRetry })).rejects.toBeDefined();
    expect(onRetry).not.toHaveBeenCalled();
  });

  it('spreads retries out rather than firing them in lockstep', async () => {
    // Every client fails at the same moment during an outage, so a fixed
    // backoff would send one synchronised wave per retry
    const retried = Array.from({ length: 12 }, () =>
      withRetry(
        jest
          .fn()
          .mockRejectedValueOnce(responseError(503))
          .mockResolvedValue('data')
      )
    );
    await flushBackoffs();
    await Promise.all(retried);

    const delays = scheduledDelays();
    expect(delays).toHaveLength(12);
    // Equal jitter: a floor of half the window, and the whole window as ceiling
    for (const delay of delays) {
      expect(delay).toBeGreaterThanOrEqual(150);
      expect(delay).toBeLessThan(300);
    }
    // The whole point: they must not all land on the same millisecond
    expect(new Set(delays).size).toBeGreaterThan(1);
  });

  it('waits at least as long as a short Retry-After asks', async () => {
    const attempt = jest
      .fn()
      .mockRejectedValueOnce(responseError(429, { 'retry-after': '1' }))
      .mockResolvedValue('data');

    const retried = withRetry(attempt);
    await flushBackoffs();

    await expect(retried).resolves.toBe('data');
    expect(attempt).toHaveBeenCalledTimes(2);
    expect(scheduledDelays()).toHaveLength(1);
    expect(scheduledDelays()[0]).toBeGreaterThanOrEqual(1_000);
  });

  it('gives up rather than ignoring a long Retry-After', async () => {
    const error = responseError(429, { 'retry-after': '120' });
    const attempt = jest.fn().mockRejectedValue(error);

    await expect(withRetry(attempt)).rejects.toBe(error);
    // Waiting two minutes is not an option, and neither is hammering past it
    expect(attempt).toHaveBeenCalledTimes(1);
    expect(scheduledDelays()).toHaveLength(0);
  });

  it('ignores an unparseable Retry-After and backs off normally', async () => {
    const attempt = jest
      .fn()
      .mockRejectedValueOnce(responseError(503, { 'retry-after': 'soon' }))
      .mockResolvedValue('data');

    const retried = withRetry(attempt);
    await flushBackoffs();

    await expect(retried).resolves.toBe('data');
    expect(attempt).toHaveBeenCalledTimes(2);
    expect(scheduledDelays()[0]).toBeLessThan(300);
  });

  it('does not replay a request the caller marked unsafe to replay', async () => {
    const error = responseError(503);
    const attempt = jest.fn().mockRejectedValue(error);

    await expect(withRetry(attempt, { enabled: false })).rejects.toBe(error);
    expect(attempt).toHaveBeenCalledTimes(1);
  });

  it('stops when cancelled during the backoff', async () => {
    const controller = new AbortController();
    const error = responseError(503);
    const onRetry = jest.fn();
    const attempt = jest.fn().mockImplementation(() => {
      controller.abort();
      return Promise.reject(error);
    });

    const settled = expect(
      withRetry(attempt, { signal: controller.signal, onRetry })
    ).rejects.toBe(error);
    await flushBackoffs();
    await settled;

    expect(attempt).toHaveBeenCalledTimes(1);
    // Neither a timer left running for a request nobody is waiting for, nor a
    // reported retry that never happened
    expect(scheduledDelays()).toHaveLength(0);
    expect(onRetry).not.toHaveBeenCalled();
  });
});
