import { useMemo, useSyncExternalStore } from 'react';

const isSupported = typeof window !== 'undefined' && 'matchMedia' in window;

const useMatchMedia = (query: string, defaultMatch = false) => {
  const store = useMemo(() => {
    const getServerSnapshot = () => defaultMatch;
    if (!isSupported) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        subscribe: (_: () => void) => () => {},
        getSnapshot: () => defaultMatch,
        getServerSnapshot,
      };
    }
    const mediaQueryList = window.matchMedia(query);

    const subscribe = (callback: () => void) => {
      mediaQueryList.addEventListener('change', callback);
      return () => {
        mediaQueryList.removeEventListener('change', callback);
      };
    };
    const getSnapshot = () => mediaQueryList.matches;

    return {
      subscribe,
      getSnapshot,
      getServerSnapshot,
    };
  }, [query, defaultMatch]);

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
};

export default useMatchMedia;

// Specific cases that need to be reused throughout the codebase

// Reduced motion
export const useReducedMotion = () =>
  useMatchMedia(
    /** NOTE: This query means that an unsupported browser will default to this
     * returning a false value of false (as in "please give me animations"). Maybe
     * we should turn it around and have unsupported default to "reduce"?
     */
    '(prefers-reduced-motion: reduce)'
  );

// Small screen (as defined in Franklin)
export const useSmallScreen = () =>
  useMatchMedia('only screen and (max-width: 640px)');

// Medium screen (as defined in Franklin)
export const useMediumScreen = () =>
  useMatchMedia('only screen and (max-width: 1024px)');

// Between Franklin's small (640px) and medium (1024px). Used by SidebarLayout's
// opt-in `collapseSidebarEarly` (entry page) to free up horizontal space for
// the sticky compact bar a bit before Franklin's medium kicks in. TODO: if
// Franklin ever formalizes a "small-medium" tier, switch to that.
export const useEarlySidebarCollapseScreen = () =>
  useMatchMedia('only screen and (max-width: 768px)');

// Above Franklin's medium (1024px). Used by the entry page's sticky tools bar
// to switch from the collapsed "Menu" dropdown back to the expanded button
// row. Tuned by inspection — a bit before the buttons start crowding the
// title/AI toggle. TODO: if Franklin ever formalizes a "large" tier, switch
// to that.
export const useEntryToolsExpandedScreen = () =>
  useMatchMedia('only screen and (min-width: 1350px)');

// Independent of (and narrower than) the tools-expanded breakpoint. Used by
// the entry page's sticky compact bar to drop labels to their bare essentials
// ("AI" instead of "AI Annotations") when title + toggle + Menu no longer
// share the bar comfortably. Tuned by inspection — the compact bar is most
// cramped just above the sidebar-collapse breakpoint, where the sidebar is
// still claiming horizontal real estate but the viewport itself is narrow.
// TODO: if Franklin ever formalizes a tier in this range, switch to that.
export const useEntryHeaderCrampedScreen = () =>
  useMatchMedia('only screen and (max-width: 850px)');
