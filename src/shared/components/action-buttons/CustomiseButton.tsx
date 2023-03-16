import {
  FormEvent,
  Suspense,
  useState,
  ComponentProps,
  useEffect,
} from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Button, EditIcon, SlidingPanel } from 'franklin-sites';
import { frame } from 'timing-functions';

import ErrorBoundary from '../error-component/ErrorBoundary';

import useLocalStorage from '../../hooks/useLocalStorage';

import lazy from '../../utils/lazy';
import { gtagFn } from '../../utils/logging';
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

/*
| Reason     | User action                |
|------------|----------------------------|
| button     | top right close (x) button |
| outside    | clicked outside the panel  |
| navigation | navigated away             |
| escape     | pressed escape key         |
| cancel     | pressed cancel button      |
| submit     | pressed save button        |
*/
type SlidingPanelReason =
  | Parameters<
      Exclude<ComponentProps<typeof SlidingPanel>['onClose'], undefined>
    >[0];
type FormReason = 'cancel' | 'submit';
type Reason = SlidingPanelReason | FormReason;

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
    logEvent('submit');
    save();
  };

  const handleClose = (reason: Reason) => {
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
        onClick={() => setDisplayCustomisePanel((value) => !value)}
      >
        <EditIcon />
        Customize columns
      </Button>
    </>
  );
};

export default CustomiseButton;
