import customRender from '../../../__test-helpers__/customRender';
import ServiceUnavailable from '../ServiceUnavailable';

describe('ServiceUnavailablePage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(<ServiceUnavailable />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('auto-reload', () => {
    let setTimeoutSpy: jest.SpyInstance;

    beforeEach(() => {
      setTimeoutSpy = jest.spyOn(window, 'setTimeout');
    });

    afterEach(() => {
      setTimeoutSpy.mockRestore();
    });

    // Anything shorter is React or franklin scheduling, not our backoff
    const scheduledReloadDelays = () =>
      setTimeoutSpy.mock.calls
        .map(([, delay]) => delay)
        .filter(
          (delay): delay is number =>
            typeof delay === 'number' && delay >= 1_000
        );

    it('spreads the reload out instead of reloading every client at once', () => {
      for (let i = 0; i < 12; i += 1) {
        customRender(<ServiceUnavailable />);
      }

      const delays = scheduledReloadDelays();
      expect(delays).toHaveLength(12);
      // Never sooner than the delay it used to always wait, never past double
      for (const delay of delays) {
        expect(delay).toBeGreaterThanOrEqual(5_000);
        expect(delay).toBeLessThan(10_000);
      }
      // The whole point: they must not all land on the same millisecond
      expect(new Set(delays).size).toBeGreaterThan(1);
    });

    it('schedules nothing when reloading is suppressed', () => {
      customRender(<ServiceUnavailable noReload />);

      expect(scheduledReloadDelays()).toHaveLength(0);
    });
  });
});
