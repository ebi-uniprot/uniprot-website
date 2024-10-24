import { RefObject, useCallback } from 'react';
import { ZoomIn, ZoomOut, ZoomToSequence } from 'franklin-sites';
import NightingaleNavigation from '@nightingale-elements/nightingale-navigation';

import styles from './styles/nightingale-zoom-tool.module.scss';

export type ZoomOperations = 'zoom-in' | 'zoom-out' | 'zoom-in-seq';

// Icons and icon size TBD once designed.
export const iconSize = 19;

type Props = {
  nightingaleNavigationRef: RefObject<NightingaleNavigation> | null;
  length: number;
};

const NightingaleZoomTool = ({ nightingaleNavigationRef, length }: Props) => {
  const handleZoom = useCallback(
    (operation: ZoomOperations) => {
      if (!nightingaleNavigationRef?.current) {
        return;
      }
      // Following logic is lifted from ProtvistaZoomTool
      const scaleFactor = length / 5;
      const { 'display-end': displayEnd, 'display-start': displayStart } =
        nightingaleNavigationRef.current;
      if (
        typeof displayEnd === 'undefined' ||
        typeof displayStart === 'undefined'
      ) {
        return;
      }
      let k = 0;
      if (operation === 'zoom-in') {
        k = scaleFactor;
      } else if (operation === 'zoom-out') {
        k = -scaleFactor;
      } else if (operation === 'zoom-in-seq') {
        k = displayEnd - displayStart - 29;
      }
      const newEnd = displayEnd - k;
      let newStart = displayStart;
      // if we've reached the end when zooming out, remove from start
      if (newEnd > length) {
        newStart -= newEnd - length;
      }
      if (displayStart < newEnd) {
        nightingaleNavigationRef.current.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              'display-start': Math.max(1, newStart).toString(),
              'display-end': Math.min(newEnd, length).toString(),
            },
            bubbles: true,
            cancelable: true,
          })
        );
      }
    },
    [nightingaleNavigationRef, length]
  );
  return (
    <div className={styles['nightingale-zoom-tool']}>
      <span
        className={styles['nightingale-button-content']}
        onClick={() => handleZoom?.('zoom-out')}
        aria-hidden="true"
      >
        <ZoomOut height={iconSize} />
      </span>
      <span
        className={styles['nightingale-button-content']}
        onClick={() => handleZoom?.('zoom-in')}
        aria-hidden="true"
      >
        <ZoomIn height={iconSize} />
      </span>
      <span
        className={styles['nightingale-button-content']}
        onClick={() => handleZoom?.('zoom-in-seq')}
        aria-hidden="true"
      >
        <ZoomToSequence height={iconSize} />
      </span>
    </div>
  );
};

export default NightingaleZoomTool;
