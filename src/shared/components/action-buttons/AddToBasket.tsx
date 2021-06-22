import { FC } from 'react';
import { BasketIcon, Button } from 'franklin-sites';
import { groupBy } from 'lodash-es';

import useBasket from '../../hooks/useBasket';

import accessionToNamespace from '../../utils/accessionToNamespace';

import { pluralise } from '../../utils/utils';
import { Namespace } from '../../types/namespaces';

type AddToBasketButtonProps = { selectedEntries: string[] };

const AddToBasketButton: FC<AddToBasketButtonProps> = ({ selectedEntries }) => {
  const [, setBasket] = useBasket();

  const n = selectedEntries.length;

  const disabled = !n;

  const title = n
    ? `Add ${n} ${pluralise('entry', n, 'entries')} to the basket`
    : 'Select at least one entry to add to the basket';

  const handleClick = () => {
    if (!selectedEntries.length) {
      return;
    }
    const grouped = groupBy(selectedEntries, accessionToNamespace);
    setBasket(
      (currentBasket) =>
        new Map([
          // current namespaces, untouched
          ...currentBasket,
          // namespaces to update
          ...Object.entries(grouped).map(
            ([ns, entries]) =>
              [
                ns as Namespace,
                // new Set, out of...
                new Set([
                  // ... the previous Set for this namespace and...
                  ...(currentBasket.get(ns as Namespace) || []),
                  // ... the new entries to add
                  ...entries,
                ]),
              ] as const
          ),
        ])
    );
  };

  return (
    <Button
      variant="tertiary"
      title={title}
      disabled={disabled}
      onClick={handleClick}
    >
      <BasketIcon />
      Add
    </Button>
  );
};

export default AddToBasketButton;
