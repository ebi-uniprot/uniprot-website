import { type Virtualizer } from '@tanstack/react-virtual';
import { type RefObject, useCallback } from 'react';

function useNightingaleFeatureTableScroll<T>(
  getRowId: (feature: T) => string,
  tableId: string,
  // The ref (not the instance) is taken so the callback reads the latest
  // virtualizer at execution time. The instance is set inside a child effect
  // and isn't observable to the parent on the same render.
  virtualizerRef?: RefObject<Virtualizer<HTMLDivElement, Element> | null>,
  data?: T[] | null
) {
  return useCallback(
    (feature: T) => {
      const rowId = getRowId(feature);
      const rowSelector = `tr[data-id="${rowId}"]`;
      const tableSelector = `table[id="${tableId}"]`;
      const row = document.querySelector<HTMLElement>(rowSelector);
      const table = document.querySelector<HTMLElement>(tableSelector);

      if (!table) {
        return;
      }

      if (row) {
        const thead = table.firstElementChild as HTMLElement | null;
        const container = table.parentElement;

        let block: ScrollLogicalPosition = 'center';
        if (container && thead) {
          // Offset the sticky-header height so 'nearest' lands the row below it
          container.style.scrollPaddingTop = `${thead.offsetHeight}px`;
          block = 'nearest';
        }

        row.scrollIntoView({ behavior: 'smooth', block });
        return;
      }

      // Row isn't currently in the DOM (virtualized off-screen): jump by index.
      const virtualizer = virtualizerRef?.current;
      if (virtualizer && data) {
        const idx = data.findIndex((d) => getRowId(d) === rowId);
        if (idx >= 0) {
          virtualizer.scrollToIndex(idx, { align: 'center' });
        }
      }
    },
    [getRowId, tableId, virtualizerRef, data]
  );
}

export default useNightingaleFeatureTableScroll;
