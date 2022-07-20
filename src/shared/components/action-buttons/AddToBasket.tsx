import { Dispatch, SetStateAction } from 'react';
import { BasketIcon, Button } from 'franklin-sites';
import { groupBy } from 'lodash-es';

import useBasket from '../../hooks/useBasket';

import accessionToNamespace from '../../utils/accessionToNamespace';
import { fromCleanMapper } from '../../utils/getIdKeyForNamespace';

import { pluralise } from '../../utils/utils';
import { Namespace } from '../../types/namespaces';

import helper from '../../styles/helper.module.scss';

type AddToBasketButtonProps = {
  selectedEntries: string | string[];
  setSelectedEntries?: Dispatch<SetStateAction<string[]>>;
  remove?: boolean;
};

const AddToBasketButton = ({
  selectedEntries,
  setSelectedEntries,
  remove,
}: AddToBasketButtonProps) => {
  const [basket, setBasket] = useBasket();

  const isSingleEntry = !Array.isArray(selectedEntries);

  const accessions = Array.from(
    new Set(
      (Array.isArray(selectedEntries)
        ? selectedEntries
        : [selectedEntries]
      ).map(fromCleanMapper)
    )
  );

  const n = accessions.length;

  const disabled = !n;

  const finalRemove =
    remove ||
    (isSingleEntry &&
      basket.get(accessionToNamespace(accessions[0]))?.has(accessions[0]));

  let title = `Select at least one entry to ${
    finalRemove ? 'remove from' : 'add to'
  } the basket`;
  if (n) {
    title = `${finalRemove ? 'Remove' : 'Add'} ${n} ${pluralise(
      'entry',
      n,
      'entries'
    )} ${finalRemove ? 'from' : 'to'} the basket`;
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
      for (const accession of accessions) {
        newSet.delete(accession);
      }

      return new Map([
        // current namespaces, untouched
        ...currentBasket,
        // namespace to update
        [ns, newSet],
      ]);
    });

    setSelectedEntries?.((selectedEntries) =>
      selectedEntries.filter((entry) => !accessions.includes(entry))
    );
  };

  return (
    <Button
      variant="tertiary"
      title={title}
      disabled={disabled}
      onClick={finalRemove ? removeFromBasket : addToBasket}
      className={helper['no-small']}
    >
      <BasketIcon />
      {finalRemove ? 'Remove' : 'Add'}
    </Button>
  );
};

export default AddToBasketButton;
