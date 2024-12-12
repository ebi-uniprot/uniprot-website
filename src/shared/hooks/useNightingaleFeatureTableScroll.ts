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
      const expandButton =
        container?.parentElement?.querySelector<HTMLButtonElement>(
          `button[id="${tableId}-expand-button"]`
        );

      // Determine scroll positioning behavior
      let block: ScrollLogicalPosition = 'center';
      if (container && thead) {
        // Adjust container to account for the sticky header height
        container.style.scrollPaddingTop = `${thead.offsetHeight}px`;
        block = 'nearest';
      }

      // Check if we need to verify row visibility before scrolling
      const shouldCheckRowInView =
        expandButton?.textContent?.includes('Expand') && thead && container;

      if (shouldCheckRowInView) {
        const viewTop = container.scrollTop + thead.offsetHeight;
        const viewBottom = container.scrollTop + container.offsetHeight;
        const rowInView =
          viewTop <= row.offsetTop &&
          row.offsetTop + row.offsetHeight <= viewBottom;

        if (!rowInView) {
          row.scrollIntoView({ behavior: 'smooth', block });
        }
      } else {
        // If no conditions apply, just scroll the row into view
        row.scrollIntoView({ behavior: 'smooth', block });
      }
    },
    [getRowId, tableId]
  );
}

export default useNightingaleFeatureTableScroll;
