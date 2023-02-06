import { FormEvent, Suspense, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Button, EditIcon, SlidingPanel } from 'franklin-sites';
import { frame } from 'timing-functions';

import ErrorBoundary from '../error-component/ErrorBoundary';

import lazy from '../../utils/lazy';

import { Namespace } from '../../types/namespaces';

import styles from './styles/customise-button.module.scss';
import { allEntryPages } from '../../../app/config/urls';
import { nsToDefaultColumns } from '../../config/columns';
import useLocalStorage from '../../hooks/useLocalStorage';
import { gtagFn } from '../../utils/logging';

const CustomiseTable = lazy(
  () =>
    import(
      /* webpackChunkName: "customise" */ '../customise-table/CustomiseTable'
    )
);

/*
| Reason  | User clicked               |
|---------|----------------------------|
| outside | outside the panel          |
| button  | top right close (x) button |
| cancel  | cancel                     |
| submit  | save                       |
*/
type Reason = 'outside' | 'button' | 'cancel' | 'submit';

// Log the way in which users are closing the customise table panel
const logEvent = (reason: Reason) => {
  gtagFn('event', 'Column Select Close', {
    event_category: reason,
  });
};

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

  const close = () => setDisplayCustomisePanel(false);

  const save = () => {
    setLocalStorageColumns(columns);
    // Have to delay closing otherwise sometimes it doesn't save
    frame().then(close);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logEvent('submit');
    save();
  };

  const handleClose = (reason: 'outside' | 'button' | 'cancel') => {
    if (reason === 'outside') {
      save();
    } else {
      // If user closes but doesn't save, resync component state with local storage state
      setColumns(localStorageColumns);
    }
    logEvent(reason);
    close();
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setColumns(defaultColumns);
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
                onCancel={handleClose}
                onChange={setColumns}
                onReset={handleReset}
                onSubmit={handleSubmit}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
      <Button
        variant="tertiary"
        onPointerOver={CustomiseTable.preload}
        onFocus={CustomiseTable.preload}
        onClick={() => setDisplayCustomisePanel((value) => !value)}
      >
        <EditIcon />
        Customize columns
      </Button>
    </>
  );
};

export default CustomiseButton;
