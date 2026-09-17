import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './styles/zoom-hint.module.scss';

// How long the hint stays visible after the first wheel interaction.
const ZOOM_HINT_DURATION = 3000;

// Wraps its children and shows a "scroll to zoom" hint the very first time the
// user scrolls (wheels) over them, then never again.
const ZoomHint = ({ children }: { children: ReactNode }) => {
  const [showZoomHint, setShowZoomHint] = useState(false);
  const zoomHintShown = useRef(false);
  const zoomHintTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onWheel = useCallback(() => {
    if (zoomHintShown.current) {
      return;
    }
    zoomHintShown.current = true;
    setShowZoomHint(true);
    zoomHintTimeout.current = setTimeout(
      () => setShowZoomHint(false),
      ZOOM_HINT_DURATION
    );
  }, []);

  useEffect(
    () => () => {
      if (zoomHintTimeout.current) {
        clearTimeout(zoomHintTimeout.current);
      }
    },
    []
  );

  return (
    <div className={styles['zoom-hint-container']} onWheel={onWheel}>
      {children}
      {showZoomHint && (
        <div className={styles['zoom-hint']}>
          <span>Use [CTRL/CMD] + scroll to zoom</span>
        </div>
      )}
    </div>
  );
};

export default ZoomHint;
