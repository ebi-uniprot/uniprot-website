import { useEffect, useRef } from 'react';

import tableStyles from '../components/table/styles/table.module.scss';

type ObserverControls = [() => void, () => void];

const useFeatureViewScrollSync = (tableId: string): ObserverControls => {
  const MARK_BORDER = tableStyles['mark-border'];
  const MARK_BACKGROUND = tableStyles['mark-background'];

  const firstRow = useRef<HTMLElement | null>(null);

  // In the case of a user clicking the navigate-to-feature button,
  //  we don't want the table to move at all so use this ref to
  // enable/disable the hook.
  const disabledRef = useRef(false);

  useEffect(() => {
    const tableSelector = `table[id="${tableId}"]`;
    const table = document.querySelector<HTMLElement>(tableSelector);
    if (!table) {
      return;
    }
    const container = table.parentElement;
    const thead = table.firstElementChild as HTMLElement | null;
    if (!container || !thead) {
      return;
    }

    // Debounce flag so we scroll only once per callback.
    let didScroll = false;

    const observer = new MutationObserver((mutations) => {
      if (disabledRef.current) {
        return;
      }

      // Ignore mutation changes regarding highlighting to ensure it's only
      // mark-bordered changes that cause the table to scroll.
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const target = mutation.target as HTMLElement;

          if (mutation.oldValue === target.getAttribute('class')) {
            continue;
          }

          const oldValue = mutation.oldValue || '';
          const newValue = target.getAttribute('class') || '';
          const oldClasses = oldValue.split(/\s+/).filter(Boolean);
          const oldHasMarkBorder = oldClasses.includes(MARK_BORDER);
          const newHasMarkBorder = target.classList.contains(MARK_BORDER);

          if (oldHasMarkBorder !== newHasMarkBorder) {
            didScroll = true;
            break;
          }

          // Compare filtered class strings (ignoring mark-background).
          const filterOutBackground = (classes: string[]) =>
            classes.filter((c) => c !== MARK_BACKGROUND).join(' ');
          const newClasses = newValue.split(/\s+/).filter(Boolean);
          if (
            filterOutBackground(oldClasses) !== filterOutBackground(newClasses)
          ) {
            didScroll = true;
            break;
          }
        }
      }

      if (!didScroll) {
        return;
      }
      didScroll = false;

      const markedRow = table.querySelector(
        `tr.${MARK_BORDER}`
      ) as HTMLElement | null;
      if (markedRow) {
        if (firstRow.current === markedRow) {
          return;
        }
        firstRow.current = markedRow;
        const containerRect = container.getBoundingClientRect();
        const rowRect = markedRow.getBoundingClientRect();
        const offset =
          rowRect.top -
          containerRect.top +
          container.scrollTop -
          thead.offsetHeight;
        container.scrollTo({
          top: offset,
          behavior: 'smooth',
        });
      }
    });

    observer.observe(table, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [MARK_BACKGROUND, MARK_BORDER, tableId]);

  return [
    () => {
      disabledRef.current = true;
    },
    () => {
      disabledRef.current = false;
    },
  ];
};

export default useFeatureViewScrollSync;
