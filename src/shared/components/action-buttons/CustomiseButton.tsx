import { FormEvent, Suspense, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Button, EditIcon, SlidingPanel } from 'franklin-sites';
import { frame } from 'timing-functions';

import ErrorBoundary from '../error-component/ErrorBoundary';

import useLocalStorage from '../../hooks/useLocalStorage';

import lazy from '../../utils/lazy';
import {
  PanelFormCloseReason,
  sendGtagEventPanelCustomiseColumnsClose,
  sendGtagEventPanelOpen,
} from '../../utils/gtagEvents';
import { nsToDefaultColumns } from '../../config/columns';
import { allEntryPages } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import styles from './styles/customise-button.module.scss';

const CustomiseTable = lazy(
  () =>
    import(
      /* webpackChunkName: "customise" */ '../customise-table/CustomiseTable'
    )
);

const CustomiseButton = ({ namespace }: { namespace: Namespace }) => {
  const [displayCustomisePanel, setDisplayCustomisePanel] = useState(false);
  const isEntryPage = Boolean(useRouteMatch(allEntryPages));
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
            title="Customize columns"
            position="left"
            onClose={handleClose}
            className={styles['customise-table-panel']}
          >
            <ErrorBoundary>
              <CustomiseTable
                isEntryPage={isEntryPage}
                namespace={namespace}
                columns={columns}
                onChange={setColumns}
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
