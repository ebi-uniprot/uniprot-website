import { Suspense, useState } from 'react';
import { Button, EditIcon } from 'franklin-sites';

import SlidingPanel from '../layouts/SlidingPanel';

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
            position="left"
            yScrollable
            onClose={() => setDisplayCustomisePanel(false)}
          >
            <CustomiseTable onSave={() => setDisplayCustomisePanel(false)} />
          </SlidingPanel>
        </Suspense>
      )}
      <Button
        variant="tertiary"
        onPointerOver={CustomiseTable.preload}
        onFocus={CustomiseTable.preload}
        onClick={() => setDisplayCustomisePanel(!displayCustomisePanel)}
      >
        <EditIcon />
        Customize data
      </Button>
    </>
  );
};

export default CustomiseButton;
