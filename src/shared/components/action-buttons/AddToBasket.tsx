import { FC } from 'react';
import { BasketIcon, Button } from 'franklin-sites';
import { ValueOf } from 'type-fest';

import useNS from '../../hooks/useNS';
import useBasket, { Basket, basketableNS } from '../../hooks/useBasket';

import { pluralise } from '../../utils/utils';

type AddToBasketButtonProps = {
  selectedEntries: string[];
};

const AddToBasketButton: FC<AddToBasketButtonProps> = ({ selectedEntries }) => {
  const ns = useNS();
  const [, setBasket] = useBasket();

  const n = selectedEntries.length;

  const disabled = !n;

  const title = n
    ? `Add ${n} ${pluralise('entry', n, 'entries')} to the basket`
    : 'Select at least one entry to add to the basket';

  const handleClick = () => {
    if (!(ns && basketableNS.has(ns))) {
      return;
    }
    setBasket((currentBasket) => {
      const key = ns as keyof Basket;
      const newSubBasket: ValueOf<Basket> = new Set([
        ...currentBasket[key],
        ...selectedEntries,
      ]);
      const newBasket = {
        ...currentBasket,
        [key]: newSubBasket,
      };
      return newBasket;
    });
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
