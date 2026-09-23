import { type ReactNode, useCallback, useId } from 'react';

import { addTooltip } from '../../../shared/utils/tooltip';
import styles from './styles/column-header-label.module.scss';

type ColumnHeaderLabelProps = {
  tooltip?: string;
  children: ReactNode;
};

/**
 * A column header's label, explained by its `tooltip` on hover or focus.
 *
 * Franklin's DataTable declares `tooltip` on its column type but never renders
 * it (the behaviour lives in `useColumns`, which the UniParc xref table doesn't
 * use). It does render `label` as-is inside the `<th>`, so the behaviour goes
 * on the label instead. The label is a real `<button>`, as in `Toggletip`: a
 * `th` isn't focusable, the tooltip is the only place a column's meaning is
 * written down, and a button is focusable and named from its content without
 * needing `tabindex` on a non-interactive element.
 *
 * The tooltip itself is a `div` in `document.body` that only exists while it
 * is showing, so it can't be what `aria-describedby` points at. The label is
 * instead described by a `hidden` copy of the text: unlike a visually-hidden
 * one it isn't folded into the column's accessible name (and so read out on
 * the header and every cell under it), but it is still a valid description.
 */
const ColumnHeaderLabel = ({ tooltip, children }: ColumnHeaderLabelProps) => {
  const id = useId();

  // Ref callback returning its own cleanup: React attaches the tooltip when
  // the label mounts, and detaches/re-attaches it whenever `tooltip` changes
  const ref = useCallback(
    (label: HTMLElement | null) =>
      label && tooltip ? addTooltip(label, tooltip) : undefined,
    [tooltip]
  );

  if (!tooltip) {
    return children;
  }

  return (
    <>
      <button
        type="button"
        ref={ref}
        className={styles.trigger}
        aria-describedby={id}
      >
        {children}
      </button>
      {/* Column tooltips are plain sentences; `addTooltip` is what renders
          the (sanitised) markup version of them */}
      <span id={id} hidden>
        {tooltip}
      </span>
    </>
  );
};

export default ColumnHeaderLabel;
