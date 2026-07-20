import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory, type MemoryHistory } from 'history';
import { type RefObject } from 'react';
import { Router } from 'react-router-dom';

import { ScrollableContainerContext } from '../../contexts/ScrollableContainer';
import { useReducedMotion } from '../../hooks/useMatchMedia';
import EntryTabLink from '../EntryTabLink';

jest.mock('../../hooks/useMatchMedia', () => ({
  ...jest.requireActual('../../hooks/useMatchMedia'),
  useReducedMotion: jest.fn(() => false),
}));

const useReducedMotionMock = useReducedMotion as jest.Mock;

type SetupOptions = {
  route?: string;
  to: string;
  provideScrollContainer?: boolean;
};

const setup = ({
  route = '/u/x/entry',
  to,
  provideScrollContainer = true,
}: SetupOptions) => {
  const scrollTo = jest.fn();
  const ref = {
    current: { scrollTo } as unknown as HTMLElement,
  } as RefObject<HTMLElement | null>;
  const history: MemoryHistory = createMemoryHistory({
    initialEntries: [route],
  });
  const link = <EntryTabLink to={to}>Tab Label</EntryTabLink>;
  const rendered = render(
    <Router history={history}>
      {provideScrollContainer ? (
        <ScrollableContainerContext.Provider value={ref}>
          {link}
        </ScrollableContainerContext.Provider>
      ) : (
        link
      )}
    </Router>
  );
  return { ...rendered, scrollTo, history };
};

describe('EntryTabLink', () => {
  beforeEach(() => {
    useReducedMotionMock.mockReturnValue(false);
  });

  it('scrolls the container to the top when clicking the active-tab link', () => {
    const { getByText, scrollTo, history } = setup({
      route: '/u/x/entry',
      to: '/u/x/entry',
    });
    fireEvent.click(getByText('Tab Label'));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    // preventDefault means no navigation
    expect(history.location.pathname).toBe('/u/x/entry');
  });

  it('honours prefers-reduced-motion by switching to behavior:auto', () => {
    useReducedMotionMock.mockReturnValue(true);
    const { getByText, scrollTo } = setup({
      route: '/u/x/entry',
      to: '/u/x/entry',
    });
    fireEvent.click(getByText('Tab Label'));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });

  it('flows through to <Link> for a non-active tab (no scroll, navigation happens)', () => {
    const { getByText, scrollTo, history } = setup({
      route: '/u/x/entry',
      to: '/u/x/variants',
    });
    fireEvent.click(getByText('Tab Label'));
    expect(scrollTo).not.toHaveBeenCalled();
    expect(history.location.pathname).toBe('/u/x/variants');
  });

  it('matches the active tab including hash (eg. isoform deep links)', () => {
    const { getByText, scrollTo } = setup({
      route: '/u/x/entry',
      to: '/u/x/entry',
    });
    // current location has no hash; pathname matches `to` exactly
    fireEvent.click(getByText('Tab Label'));
    expect(scrollTo).toHaveBeenCalled();
  });

  it.each([
    ['metaKey', { metaKey: true }],
    ['ctrlKey', { ctrlKey: true }],
    ['shiftKey', { shiftKey: true }],
    ['altKey', { altKey: true }],
    ['middle-click (button=1)', { button: 1 }],
  ])('does not intercept %s clicks', (_label, eventInit) => {
    const { getByText, scrollTo } = setup({
      route: '/u/x/entry',
      to: '/u/x/entry',
    });
    fireEvent.click(getByText('Tab Label'), eventInit);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('is a no-op when no scroll container is provided via context', () => {
    const history = createMemoryHistory({ initialEntries: ['/u/x/entry'] });
    const { getByText } = render(
      <Router history={history}>
        <EntryTabLink to="/u/x/entry">Tab Label</EntryTabLink>
      </Router>
    );
    expect(() => fireEvent.click(getByText('Tab Label'))).not.toThrow();
    expect(history.location.pathname).toBe('/u/x/entry');
  });
});
