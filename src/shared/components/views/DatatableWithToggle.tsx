import { useState, useRef, useEffect, FC } from 'react';
import { Button } from 'franklin-sites';
import { useParams } from 'react-router-dom';

import useCustomElement from '../../hooks/useCustomElement';

import { gtagFn } from '../../utils/logging';

import './styles/datatable-toggle.scss';

const DatatableWithToggle: FC = ({ children }) => {
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
      gtagFn('event', 'feature viewer', {
        event_category: `datatable ${expandTable ? 'expanded' : 'collapsed'}`,
        event_label: params.accession,
      });
    }
    // If first render was previous render, then it's not the first anymore...
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    }
  }, [expandTable, params.accession]);

  if (datatableElement.defined) {
    return (
      <div className="datatable-with-toggle">
        {/* <datatableElement.name
          ref={tableRef}
          filter-scroll
          expandtable={expandTable ? '' : undefined}
        > */}
        {children}
        {/* </datatableElement.name> */}
        {/* TODO show button only when the content exceeds visible area of the table  
        {tableRef?.current?.rows.length > 7 && (
          
        )}
        */}
        <Button
          variant="primary"
          onClick={() => setExpandTable((current) => !current)}
          className="toggle-button"
        >
          {expandTable ? 'Collapse' : 'Expand'} table
        </Button>
      </div>
    );
  }

  return null;
};

export default DatatableWithToggle;
