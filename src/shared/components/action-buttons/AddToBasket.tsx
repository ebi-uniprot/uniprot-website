import React, { FC } from 'react';
// import { useDispatch } from 'react-redux';
import { BasketIcon } from 'franklin-sites';

type AddToBasketButtonProps = {
  selectedEntries: string[];
};

const AddToBasketButton: FC<AddToBasketButtonProps> = ({ selectedEntries }) => {
  // const dispatch = useDispatch();

  const n = selectedEntries.length;

  const disabled = !n;

  const title = n
    ? `Add ${n} entr${n === 1 ? 'y' : 'ies'} to the basket`
    : 'Select at least one entry to add to the basket';

  const handleClick = () => {
    console.log('handle add to basket');
    // dispatch(/* action to add entries to basket */);
  };

  return (
    <button
      type="button"
      className="button tertiary"
      title={title}
      disabled={disabled}
      onClick={handleClick}
    >
      <BasketIcon />
      Add
    </button>
  );
};

export default AddToBasketButton;
