import { FC } from 'react';
import { BasketIcon, Button } from 'franklin-sites';
import { groupBy } from 'lodash-es';

import useBasket from '../../hooks/useBasket';

import accessionToNamespace from '../../utils/accessionToNamespace';

import { pluralise } from '../../utils/utils';
import { Namespace } from '../../types/namespaces';

type AddToBasketButtonProps = { selectedEntries: string | string[] };

const AddToBasketButton: FC<AddToBasketButtonProps> = ({ selectedEntries }) => {
  const [basket, setBasket] = useBasket();

  const isSingleEntry = !Array.isArray(selectedEntries);

  const accessions = Array.isArray(selectedEntries)
    ? selectedEntries
    : [selectedEntries];

  const n = accessions.length;

  const disabled = !n;

  const remove =
    isSingleEntry &&
    basket.get(accessionToNamespace(accessions[0]))?.has(accessions[0]);

  let title = 'Select at least one entry to add to the basket';
  if (remove) {
    title = 'Remove this entry from the basket';
  } else if (n) {
    title = `Add ${n} ${pluralise('entry', n, 'entries')} to the basket`;
  }

  const addToBasket = () => {
    if (!accessions.length) {
      return;
    }
    const grouped = groupBy(accessions, accessionToNamespace);
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

  const removeFromBasket = () => {
    const ns = accessionToNamespace(accessions[0]);
    if (!ns) {
      return;
    }
    setBasket((currentBasket) => {
      const newSet = new Set(currentBasket.get(ns));
      newSet.delete(accessions[0]);
      return new Map([
        // current namespaces, untouched
        ...currentBasket,
        // namespace to update
        [ns, newSet],
      ]);
    });
  };

  return (
    <Button
      variant="tertiary"
      title={title}
      disabled={disabled}
      onClick={remove ? removeFromBasket : addToBasket}
    >
      <BasketIcon />
      {remove ? 'Remove' : 'Add'}
    </Button>
  );
};

export default AddToBasketButton;
