import { useCallback, useEffect, useRef } from 'react';
import { rangeTimed } from '../utils/nightingale';

type AnimationController = {
  cancelled: boolean;
};

export function useAnimateRange(setRange: (range: [number, number]) => void) {
  const animationRef = useRef<AnimationController | null>(null);

  const animateRange = useCallback(
    async (startRange: [number, number], targetRange: [number, number]) => {
      // Cancel any previous animation if running
      if (animationRef.current) {
        animationRef.current.cancelled = true;
      }
      const currentAnimation: AnimationController = { cancelled: false };
      animationRef.current = currentAnimation;

      for await (const r of rangeTimed(startRange, targetRange)) {
        if (!currentAnimation.cancelled) {
          setRange(r);
        }
      }
    },
    [setRange]
  );

  // Cancel any running animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.cancelled = true;
      }
    };
  }, []);

  return animateRange;
}
