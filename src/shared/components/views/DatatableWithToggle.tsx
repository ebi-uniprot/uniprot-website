import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  ReactNode,
  useCallback,
} from 'react';
import { Button } from 'franklin-sites';
import { useParams } from 'react-router-dom';

import useCustomElement from '../../hooks/useCustomElement';

import { sendGtagEventFeatureDataTableViewClick } from '../../utils/gtagEvents';

import './styles/datatable-toggle.scss';

const DatatableWithToggle = ({ children }: { children: ReactNode }) => {
  const [showButton, setShowButton] = useState(true);
  const [expandTable, setExpandTable] = useState(false);

  const tableRef = useRef<HTMLElement>(null);
  const firstRenderRef = useRef(true);

  const params = useParams<{ accession: string }>();

  const datatableElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  // On expand/collapse change
  useEffect(() => {
    // except on first render
    if (!firstRenderRef.current) {
      // Scroll table back into view when collapsing
      if (!expandTable) {
        tableRef.current?.parentElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      sendGtagEventFeatureDataTableViewClick(
        params.accession,
        expandTable ? 'expanded' : 'collapsed'
      );
    }
    // If first render was previous render, then it's not the first anymore...
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    }
  }, [expandTable, params.accession]);

  const sizeCheck = useCallback(() => {
    setShowButton(
      tableRef.current?.shadowRoot?.firstElementChild?.scrollHeight !==
        tableRef.current?.shadowRoot?.firstElementChild?.clientHeight
    );
  }, []);

  // eslint-disable-next-line consistent-return
  useLayoutEffect(() => {
    if (datatableElement.defined && tableRef.current) {
      const mo = new MutationObserver(sizeCheck);
      mo.observe(tableRef.current, {
        childList: true,
        // Allows to update when classes are applied to hide some rows
        attributes: true,
        attributeFilter: ['class'],
        subtree: true,
      });
      return () => mo.disconnect();
    }
  }, [datatableElement.defined, sizeCheck]);

  if (datatableElement.defined) {
    return (
      <div className="datatable-with-toggle">
        <datatableElement.name
          ref={tableRef}
          filter-scroll
          expandtable={expandTable ? '' : undefined}
        >
          {children}
        </datatableElement.name>
        {(showButton || expandTable) && (
          <Button
            variant="primary"
            onClick={() => setExpandTable((current) => !current)}
            className="toggle-button"
          >
            {expandTable ? 'Collapse' : 'Expand'} table
          </Button>
        )}
      </div>
    );
  }

  return null;
};

export default DatatableWithToggle;
