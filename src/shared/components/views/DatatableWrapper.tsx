import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  HTMLAttributes,
} from 'react';
import { Button } from 'franklin-sites';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import useCustomElement from '../../hooks/useCustomElement';

import { sendGtagEventFeatureDataTableViewClick } from '../../utils/gtagEvents';

import './styles/datatable-wrapper.scss';

type Props = {
  alwaysExpanded?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const DatatableWrapper = ({
  alwaysExpanded,
  children,
  className,
  ...props
}: Props) => {
  const [showButton, setShowButton] = useState(!alwaysExpanded);
  const [expandTable, setExpandTable] = useState(false);

  const tableRef = useRef<HTMLElement>(null);
  const firstRenderRef = useRef(true);

  const params = useParams<{ accession?: string }>();

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
    // except on first render or when always expanded
    if (!alwaysExpanded && !firstRenderRef.current) {
      // Scroll table back into view when collapsing
      if (!expandTable) {
        tableRef.current?.parentElement?.scrollIntoView({
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
  }, [alwaysExpanded, expandTable, params.accession]);

  // eslint-disable-next-line consistent-return
  useLayoutEffect(() => {
    if (!alwaysExpanded && datatableElement.defined && tableRef.current) {
      const mo = new MutationObserver(() => {
        setShowButton(
          tableRef.current?.shadowRoot?.firstElementChild?.scrollHeight !==
            tableRef.current?.shadowRoot?.firstElementChild?.clientHeight
        );
      });
      mo.observe(tableRef.current, {
        childList: true,
        // Allows to update when classes are applied to hide some rows
        attributes: true,
        attributeFilter: ['class'],
        subtree: true,
      });
      return () => mo.disconnect();
    }
  }, [alwaysExpanded, datatableElement.defined]);

  // if (datatableElement.defined) {
  //   return (
  //     <div className={cn('datatable-wrapper', className)} {...props}>
  //       <datatableElement.name
  //         ref={tableRef}
  //         filter-scroll
  //         expandtable={alwaysExpanded || expandTable ? '' : undefined}
  //       >
  //         {children}
  //       </datatableElement.name>
  //       {(showButton || expandTable) && (
  //         <Button
  //           variant="primary"
  //           onClick={() => setExpandTable((current) => !current)}
  //           className="toggle-button"
  //         >
  //           {expandTable ? 'Collapse' : 'Expand'} table
  //         </Button>
  //       )}
  //     </div>
  //   );
  // }
  return (
    <div className={cn('datatable-wrapper', className)} {...props}>
      {children}
    </div>
  );

  return null;
};

export default DatatableWrapper;
