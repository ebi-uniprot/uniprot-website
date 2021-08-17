import { Suspense, useState } from 'react';
import { Button, EditIcon, SlidingPanel } from 'franklin-sites';

import ErrorBoundary from '../error-component/ErrorBoundary';

import lazy from '../../utils/lazy';

const CustomiseTable = lazy(
  () =>
    import(
      /* webpackChunkName: "customise" */ '../customise-table/CustomiseTable'
    )
);

const CustomiseButton = () => {
  const [displayCustomisePanel, setDisplayCustomisePanel] = useState(false);

  return (
    <>
      {displayCustomisePanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            title="Customize Data"
            position="left"
            onClose={() => setDisplayCustomisePanel(false)}
          >
            <ErrorBoundary>
              <CustomiseTable onSave={() => setDisplayCustomisePanel(false)} />
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
        Customize data
      </Button>
    </>
  );
};

export default CustomiseButton;
