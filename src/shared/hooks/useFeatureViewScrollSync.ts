import { useEffect, useRef } from 'react';

import tableStyles from '../components/table/styles/table.module.scss';

type ObserverControls = [() => void, () => void];

const useFeatureViewScrollSync = (tableId: string): ObserverControls => {
  // CSS class names used for marking rows and backgrounds.
  const MARK_BORDER = tableStyles['mark-border'];
  const MARK_BACKGROUND = tableStyles['mark-background'];

  // Reference to keep track of the row that was scrolled into view.
  const firstRow = useRef<HTMLElement | null>(null);

  // A ref used to disable scroll syncing. For example, when the user clicks a navigation button,
  // we disable auto-scrolling to avoid conflicting scroll behavior.
  const disabledRef = useRef(false);

  useEffect(() => {
    // Build a selector to find the table with the given id.
    const tableSelector = `table[id="${tableId}"]`;
    const table = document.querySelector<HTMLElement>(tableSelector);
    if (!table) {
      return;
    }

    // Get the container element (assumed to be the table's parent)
    // and the table header element (first child of the table).
    const container = table.parentElement;
    const thead = table.firstElementChild as HTMLElement | null;
    if (!container || !thead) {
      return;
    }

    // Flag used to debounce scroll actions so that scrolling occurs only once per relevant change.
    let didScroll = false;

    // Create a MutationObserver to monitor DOM changes within the table.
    const observer = new MutationObserver((mutations) => {
      // If scroll syncing is currently disabled, exit early.
      if (disabledRef.current) {
        return;
      }

      // Loop through each mutation record.
      for (const mutation of mutations) {
        // Only act on attribute changes related to the 'class' attribute.
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const target = mutation.target as HTMLElement;

          // If the class hasn't effectively changed, ignore this mutation.
          if (mutation.oldValue === target.getAttribute('class')) {
            continue;
          }

          // Retrieve the old and new class lists.
          const oldValue = mutation.oldValue || '';
          const newValue = target.getAttribute('class') || '';
          const oldClasses = oldValue.split(/\s+/).filter(Boolean);
          const newClasses = newValue.split(/\s+/).filter(Boolean);

          // Check if the MARK_BORDER class has been added or removed.
          const oldHasMarkBorder = oldClasses.includes(MARK_BORDER);
          const newHasMarkBorder = target.classList.contains(MARK_BORDER);
          if (oldHasMarkBorder !== newHasMarkBorder) {
            didScroll = true;
            break;
          }

          // Define a helper to remove the MARK_BACKGROUND class from a list of classes.
          const filterOutBackground = (classes: string[]) =>
            classes.filter((c) => c !== MARK_BACKGROUND).join(' ');

          // Compare the class strings (ignoring MARK_BACKGROUND) to detect significant changes.
          if (
            filterOutBackground(oldClasses) !== filterOutBackground(newClasses)
          ) {
            didScroll = true;
            break;
          }
        }
      }

      // If no changes were significant, exit without scrolling.
      if (!didScroll) {
        return;
      }
      // Reset the debounce flag for future mutations.
      didScroll = false;

      // Find the first table row that has the MARK_BORDER class.
      const markedRow = table.querySelector(
        `tr.${MARK_BORDER}`
      ) as HTMLElement | null;
      if (markedRow) {
        // If the row is already the one we scrolled to previously, do nothing.
        if (firstRow.current === markedRow) {
          return;
        }
        // Update the reference to the current marked row.
        firstRow.current = markedRow;

        // Calculate the offset needed to scroll the container so that the marked row is aligned
        // just below the table header. This takes into account:
        // - The vertical positions of the container and row (via getBoundingClientRect).
        // - The current scroll position of the container.
        // - The height of the table header.
        const containerRect = container.getBoundingClientRect();
        const rowRect = markedRow.getBoundingClientRect();
        const offset =
          rowRect.top - // Row's top position relative to the viewport
          containerRect.top + // Container's top position relative to the viewport
          container.scrollTop - // Current vertical scroll of the container
          thead.offsetHeight; // Height of the table header

        // Smoothly scroll the container to bring the marked row into view.
        container.scrollTo({
          top: offset,
          behavior: 'smooth',
        });
      }
    });

    // Start observing the table for changes:
    // - childList: changes to the table's immediate children.
    // - subtree: any changes within the table's descendant elements.
    // - attributes: changes to element attributes.
    // - attributeFilter: only observe changes to the 'class' attribute.
    // - attributeOldValue: record the previous value of the attribute.
    observer.observe(table, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true,
    });

    // Cleanup function: disconnect the observer when the component unmounts or dependencies change.
    return () => {
      observer.disconnect();
    };
  }, [MARK_BACKGROUND, MARK_BORDER, tableId]);

  // Return two control functions:
  // 1. A function to disable scroll syncing (e.g., when manually navigating).
  // 2. A function to re-enable scroll syncing.
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
