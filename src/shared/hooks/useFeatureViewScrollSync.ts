import { useEffect, useRef } from 'react';
import tableStyles from '../components/table/styles/table.module.scss';

const useFeatureViewScrollSync = (tableId: string) => {
  const firstRow = useRef<HTMLElement | null>(null);
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

    const observer = new MutationObserver(() => {
      console.log(`tr.${tableStyles['mark-border']}`);
      const markedRow = table.querySelector(
        `tr.${tableStyles['mark-border']}`
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

    console.log(table);
    observer.observe(table, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, [tableId]);
};

export default useFeatureViewScrollSync;
