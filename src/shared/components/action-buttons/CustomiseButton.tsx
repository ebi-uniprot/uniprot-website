import { Suspense, useState, FC } from 'react';
import { Button, EditIcon } from 'franklin-sites';

import SlidingPanel, { Position } from '../layouts/SlidingPanel';

import lazy from '../../utils/lazy';

import { Column } from '../../config/columns';

const CustomiseComponent = lazy(
  () =>
    import(
      /* webpackChunkName: "customise" */ '../customise-table/CustomiseTable'
    )
);

type CustomiseButtonProps = {
  tableColumns: Column[];
  onTableColumnsChange: (columns: Column[]) => void;
};

const CustomiseButton: FC<CustomiseButtonProps> = ({
  tableColumns,
  onTableColumnsChange,
}) => {
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
              selectedColumns={tableColumns}
              onSave={(columns) => {
                onTableColumnsChange(columns);
                setDisplayCustomisePanel(false);
              }}
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
