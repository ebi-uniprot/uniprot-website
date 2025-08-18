import { Button, EditIcon, SlidingPanel } from 'franklin-sites';
import { FormEvent, Suspense, useEffect, useState } from 'react';
import { useLocation, useMatch } from 'react-router';
import { frame } from 'timing-functions';

import { nsToDefaultColumns } from '../../config/columns';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Namespace } from '../../types/namespaces';
import {
  PanelFormCloseReason,
  sendGtagEventPanelCustomiseColumnsClose,
  sendGtagEventPanelOpen,
} from '../../utils/gtagEvents';
import lazy from '../../utils/lazy';
import ErrorBoundary from '../error-component/ErrorBoundary';
import styles from './styles/customise-button.module.scss';

const CustomiseTable = lazy(
  () =>
    import(
      /* webpackChunkName: "customise" */ '../customise-table/CustomiseTable'
    )
);

const CustomiseButton = ({ namespace }: { namespace: Namespace }) => {
  const [displayCustomisePanel, setDisplayCustomisePanel] = useState(false);
  const isEntryPage = Boolean(useMatch('/:namespace/:accession'));
  const { pathname } = useLocation();
  const defaultColumns = nsToDefaultColumns(namespace, isEntryPage);
  const [localStorageColumns, setLocalStorageColumns] = useLocalStorage(
    `table columns for ${namespace}${
      isEntryPage ? ' entry page' : ''
    }` as const,
    defaultColumns
  );
  const [columns, setColumns] = useState(localStorageColumns);

  useEffect(() => {
    setColumns(localStorageColumns);
  }, [localStorageColumns]);

  const close = () => displayCustomisePanel && setDisplayCustomisePanel(false);

  const save = () => {
    setLocalStorageColumns(columns);
    // Have to delay closing otherwise sometimes it doesn't save
    frame().then(close);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendGtagEventPanelCustomiseColumnsClose('submit', columns);
    save();
  };

  const handleClose = (reason: PanelFormCloseReason) => {
    if (reason === 'outside') {
      save();
    } else {
      // If user closes but doesn't save, resync component state with local storage state
      setColumns(localStorageColumns);
    }
    sendGtagEventPanelCustomiseColumnsClose(reason, columns);
    close();
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setColumns(defaultColumns);
  };

  const handleCancel = () => {
    handleClose('cancel');
  };

  return (
    <>
      {displayCustomisePanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            title={<span data-article-id="customize">Customize columns</span>}
            position="left"
            onClose={handleClose}
            className={styles['customise-table-panel']}
            pathname={pathname}
          >
            <ErrorBoundary>
              <CustomiseTable
                isEntryPage={isEntryPage}
                namespace={namespace}
                columns={columns}
                onColumnChange={setColumns}
                onReset={handleReset}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
      <Button
        variant="tertiary"
        onPointerOver={CustomiseTable.preload}
        onFocus={CustomiseTable.preload}
        onClick={() =>
          setDisplayCustomisePanel((value) => {
            if (!value) {
              sendGtagEventPanelOpen('customise_columns');
            } else {
              // Presumably this won't happen as the panel covers the open/close button
              // but just in case
              sendGtagEventPanelCustomiseColumnsClose('toggle', columns);
            }
            return !value;
          })
        }
      >
        <EditIcon />
        Customize columns
      </Button>
    </>
  );
};

export default CustomiseButton;
