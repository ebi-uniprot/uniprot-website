import { memo } from 'react';
import { LongNumber } from 'franklin-sites';

import { pluralise } from '../utils/utils';

const ItemCount = memo<{ selected: number; loaded: number }>(
  ({ selected, loaded }) =>
    selected ? (
      <span>
        <LongNumber>{selected}</LongNumber> {pluralise('row', selected)}{' '}
        selected
        {selected !== loaded ? (
          <>
            {' '}
            out of <LongNumber>{loaded}</LongNumber>
          </>
        ) : null}
      </span>
    ) : null
);

export default ItemCount;
