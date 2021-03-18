import { Suspense, useState } from 'react';
import { Button, EditIcon } from 'franklin-sites';

import SlidingPanel, { Position } from '../layouts/SlidingPanel';

import lazy from '../../utils/lazy';

const CustomiseComponent = lazy(
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
            position={Position.left}
            yScrollable
            onClose={() => setDisplayCustomisePanel(false)}
          >
            <CustomiseComponent
              onSave={() => setDisplayCustomisePanel(false)}
            />
          </SlidingPanel>
        </Suspense>
      )}
      <Button
        variant="tertiary"
        onPointerOver={CustomiseComponent.preload}
        onFocus={CustomiseComponent.preload}
        onClick={() => setDisplayCustomisePanel(!displayCustomisePanel)}
      >
        <EditIcon />
        Customize data
      </Button>
    </>
  );
};

export default CustomiseButton;
