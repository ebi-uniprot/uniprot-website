import { useEffect, useRef } from 'react';

import { type ColumnDescriptor } from '../../../../shared/hooks/useColumns';
import { showTooltip } from '../../../../shared/utils/tooltip';

/**
 * Show a column's `tooltip` when its header is hovered.
 *
 * Franklin's DataTable declares `tooltip` on its column type but never renders
 * it — the behaviour actually lives in `useColumns`, which the UniParc xref
 * table doesn't use (it builds its descriptors through
 * `getUniParcXRefsColumns` instead). This is that same listener, scoped to one
 * table: franklin stamps `data-column-name` on each `<th>`, so a single
 * delegated mouseover on a wrapper is enough to find the matching descriptor.
 *
 * Returns a ref to put on an element wrapping the table.
 */
const useColumnHeaderTooltips = <Datum>(columns: ColumnDescriptor<Datum>[]) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onHover = (event: MouseEvent) => {
      const eventTarget = event.target as HTMLElement;
      const { columnName } = eventTarget.dataset;
      if (!columnName) {
        return;
      }
      const info = columns.find(({ name }) => name === columnName);
      if (info?.tooltip && eventTarget.firstChild) {
        showTooltip(
          info.tooltip,
          eventTarget,
          eventTarget.firstChild as Element
        );
      }
    };
    const wrapper = wrapperRef.current;
    wrapper?.addEventListener('mouseover', onHover);
    return () => wrapper?.removeEventListener('mouseover', onHover);
  }, [columns]);

  return wrapperRef;
};

export default useColumnHeaderTooltips;
