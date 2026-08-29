import { useEffect, useState } from 'react';

import { type ColumnDescriptor } from '../../../../shared/hooks/useColumns';
import { addTooltip } from '../../../../shared/utils/tooltip';

/**
 * Show a column's `tooltip` when its header is hovered or focused.
 *
 * Franklin's DataTable declares `tooltip` on its column type but never renders
 * it — the behaviour actually lives in `useColumns`, which the UniParc xref
 * table doesn't use (it builds its descriptors through `getUniParcXRefsColumns`
 * instead). Franklin does stamp `data-column-name` on each `<th>`, which is
 * enough to pair a descriptor with its header.
 *
 * `addTooltip` rather than a delegated `mouseover`, because it also binds
 * focus/blur and returns a teardown that dismisses an open tooltip — without
 * which one left open at navigation outlives the page it was anchored to. The
 * headers are given a tab stop so those focus handlers can be reached at all: a
 * `th` isn't focusable, and the tooltip is the only place a column's meaning is
 * written down.
 *
 * Returns a callback ref to put on an element wrapping the table.
 */
const useColumnHeaderTooltips = <Datum>(columns: ColumnDescriptor<Datum>[]) => {
  // State, not a ref: the wrapper mounts only once the table has loaded, so an
  // effect keyed on a ref would run while the loader is still on screen, find
  // nothing, and never be re-run — every re-render it could have used up is
  // spent before the element exists. Keyed on the node itself, it runs when the
  // wrapper actually appears, and again whenever the loader remounts it.
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null);

  // Which header carries which tooltip is all this needs, and `columns` is a
  // new array on every render — re-attaching each time would dismiss an open
  // tooltip whenever anything else about the table changed (another page
  // loading, an obsolete cross-reference resolving). Serialised so the effect
  // re-runs only when the tooltips themselves do.
  const tooltipsKey = JSON.stringify(
    columns
      .filter((column) => column.tooltip)
      .map((column) => [column.name, column.tooltip])
  );

  useEffect(() => {
    const pairs: Array<[string, string]> = JSON.parse(tooltipsKey);
    const cleanups = pairs.map(([name, tooltip]) => {
      const header = wrapper?.querySelector(`th[data-column-name="${name}"]`);
      if (!(header instanceof HTMLElement)) {
        return undefined;
      }
      header.tabIndex = 0;
      const removeTooltip = addTooltip(header, tooltip);
      return () => {
        removeTooltip();
        header.removeAttribute('tabindex');
      };
    });
    return () => {
      for (const cleanup of cleanups) {
        cleanup?.();
      }
    };
  }, [tooltipsKey, wrapper]);

  return setWrapper;
};

export default useColumnHeaderTooltips;
