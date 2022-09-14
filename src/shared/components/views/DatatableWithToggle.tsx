import { useState, useRef } from 'react';
import { Button } from 'franklin-sites';

import useCustomElement from '../../hooks/useCustomElement';

import './styles/datatable-toggle.scss';

const DatatableWithToggle = ({ table }: { table: JSX.Element }) => {
  const [tableState, setTableState] = useState('Expand');
  const tableRef = useRef(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const datatableElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const toggleTableState = () => {
    const tableEl = tableRef?.current;
    if (tableEl) {
      if (tableState === 'Expand') {
        tableEl.expandTable = true;
        setTableState('Collapse');
      } else {
        tableEl.expandTable = false;
        tableContainerRef?.current?.scrollIntoView({
          behaviour: 'smooth',
          block: 'start',
        }); // block:'center' doesn't work, behaves very differently when the table is so long on expansion
        setTableState('Expand');
      }
    }
  };

  if (datatableElement.defined) {
    return (
      <div ref={tableContainerRef} className="datatable-with-toggle">
        <datatableElement.name ref={tableRef} filter-scroll>
          {table}
        </datatableElement.name>
        {/* TODO show button only when the content exceeds visible area of the table  
        {tableRef?.current?.rows.length > 7 && (
          
        )}
        */}
        <Button
          variant="primary"
          onClick={() => toggleTableState()}
          className="toggle-button"
        >
          {tableState} table
        </Button>
      </div>
    );
  }
  return null;
};

export default DatatableWithToggle;
