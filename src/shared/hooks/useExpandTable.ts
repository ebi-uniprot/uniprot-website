import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import { sendGtagEventFeatureDataTableViewClick } from '../utils/gtagEvents';

const useExpandTable = (
  expandable?: boolean
): [
  containerRef: React.RefObject<HTMLDivElement>,
  expandTable: boolean | null,
  setExpandTable: React.Dispatch<React.SetStateAction<boolean | null>>,
  showButton: boolean
] => {
  const [showButton, setShowButton] = useState(Boolean(expandable));
  const [expandTable, setExpandTable] = useState<boolean | null>(null);
  const params = useParams<{ accession?: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRenderRef = useRef(true);
  // On expand/collapse change
  useEffect(() => {
    // except on first render or when always expanded
    if (expandable && !firstRenderRef.current) {
      // Scroll table back into view when collapsing
      if (expandTable === false) {
        containerRef.current?.parentElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      sendGtagEventFeatureDataTableViewClick(
        params.accession || '',
        expandTable ? 'expanded' : 'collapsed'
      );
    }
    // If first render was previous render, then it's not the first anymore...
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    }
  }, [expandable, expandTable, params.accession]);

  // Only show expand button if expandable=true and there is more content that the container
  // eslint-disable-next-line consistent-return
  useLayoutEffect(() => {
    if (expandable && containerRef.current) {
      const mo = new MutationObserver(() => {
        setShowButton(
          expandTable ||
            (containerRef.current !== null &&
              containerRef.current.scrollHeight >
                containerRef.current.clientHeight)
        );
      });
      mo.observe(containerRef.current, {
        childList: true,
        // Allows to update when classes are applied to hide some rows
        attributes: true,
        attributeFilter: ['class'],
        subtree: true,
      });
      return () => mo.disconnect();
    }
  }, [expandTable, expandable]);

  return [containerRef, expandTable, setExpandTable, showButton];
};

export default useExpandTable;
