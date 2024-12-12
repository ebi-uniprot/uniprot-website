import { useCallback } from 'react';

function useNightingaleFeatureTableScroll<T>(
  getRowId: (feature: T) => string,
  tableId: string
) {
  return useCallback(
    (feature: T) => {
      // Select elements based on the feature and tableId
      const rowSelector = `tr[data-id="${getRowId(feature)}"]`;
      const tableSelector = `table[id="${tableId}"]`;
      const row = document.querySelector<HTMLElement>(rowSelector);
      const table = document.querySelector<HTMLElement>(tableSelector);

      if (!row || !table) {
        return; // If we don't have a target row or table, bail early
      }

      // Identify table parts and related elements
      const thead = table.firstElementChild as HTMLElement | null;
      const container = table.parentElement;

      // Determine scroll positioning behavior: use nearest if we can offset
      // for the sticky header height, otherwise fallback to center
      let block: ScrollLogicalPosition = 'center';
      if (container && thead) {
        // Adjust container to account for the sticky header height
        container.style.scrollPaddingTop = `${thead.offsetHeight}px`;
        block = 'nearest';
      }

      row.scrollIntoView({ behavior: 'smooth', block });
    },
    [getRowId, tableId]
  );
}

export default useNightingaleFeatureTableScroll;
