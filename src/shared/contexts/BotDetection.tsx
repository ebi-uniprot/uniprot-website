import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

const pointerEvents = [
  'mousemove',
  'mouseenter',
  'pointermove',
  'pointerdown',
  'pointerover',
] as const;

// NOTE: consider tracking scroll-related events, see:
// https://github.com/ebi-uniprot/uniprot-website/pull/924#issuecomment-3890303014

export type BotDetectionStatus = 'undetermined' | 'human'; // | 'supected-bot', or other statuses...

export const BotDetectionContext =
  createContext<BotDetectionStatus>('undetermined');

const areSuspiciousCoordinates = (x?: number, y?: number) => {
  // either x or y is zero, or really low value
  if (!x || !y || x < 10 || y < 10) {
    return true;
  }

  // either x or y is a binary round number (e.g. 16, 32, etc)
  // e.g. 16 is 10000, 15 is 01111, so 16 & 15 is 00000
  // eslint-disable-next-line no-bitwise
  if ((x & (x - 1)) === 0 || (y & (y - 1)) === 0) {
    return true;
  }

  // either x or y is set to a suspiciously round number
  // consistent use of 100px is suspicious, but 102 and 103 look more natural
  return !(x % 10) || !(y % 10);
};

const getMeanAndVariationCoefficient = (array: number[]) => {
  const mean = array.reduce((a, b) => a + b, 0) / array.length;
  const standardDeviation =
    Math.sqrt(
      array.map((item) => Math.pow(item - mean, 2)).reduce((a, b) => a + b, 0)
    ) / array.length;
  const variationCoefficient = standardDeviation / mean;
  return [mean, variationCoefficient];
};

const focusEvents: number[] = [];

export const BotDetectionProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<BotDetectionStatus>(
    (sessionStorage.getItem('bot-detection') as BotDetectionStatus) ||
      'undetermined'
  );

  const pointerHandler = useCallback<EventListener>((event: Event) => {
    const { x, y } = event as MouseEvent | PointerEvent;
    // Could implement more complex checks here
    if (!areSuspiciousCoordinates(x, y)) {
      sessionStorage.setItem('bot-detection', 'human');
      setStatus('human');
    }
  }, []);

  const focusHandler = useCallback<EventListener>((event: Event) => {
    const { timeStamp } = event;
    focusEvents.push(timeStamp);
    if (focusEvents.length <= 2) {
      return;
    }
    const focusEventDiffs = focusEvents
      // Skip the first one, it might be autofocus on page
      .slice(1)
      .map((focusEvent, index) => focusEvent - focusEvents[index - 1])
      // Remove first diff, as it will be NaN
      .splice(1);
    const [mean, variationCoefficient] =
      getMeanAndVariationCoefficient(focusEventDiffs);
    if (mean > 200 && variationCoefficient > 0.1) {
      sessionStorage.setItem('bot-detection', 'human');
      setStatus('human');
    }
  }, []);

  useEffect(() => {
    if (status === 'human') {
      for (const event of pointerEvents) {
        document.documentElement.removeEventListener(event, pointerHandler);
      }
      document.documentElement.removeEventListener('focus', focusHandler, {
        capture: true,
      });
    } else {
      for (const event of pointerEvents) {
        document.documentElement.addEventListener(event, pointerHandler, {
          // perf optimisation: we "promise" to not use event.preventDefault,
          // so the browser allows it to become non-blocking
          passive: true,
        });
      }
      document.documentElement.addEventListener(
        'focus',
        focusHandler,
        // Focus events require capture to be able to be seen from the document
        { capture: true, passive: true }
      );
    }

    return () => {
      for (const event of pointerEvents) {
        document.documentElement.removeEventListener(event, pointerHandler);
      }
      document.documentElement.removeEventListener('focus', focusHandler, {
        capture: true,
      });
    };
  }, [status, pointerHandler, focusHandler]);

  return (
    <BotDetectionContext.Provider value={status}>
      {children}
    </BotDetectionContext.Provider>
  );
};
