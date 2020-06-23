import React, { FC } from 'react';
// import { useDispatch } from 'react-redux';
import { BasketIcon } from 'franklin-sites';

type AddToBasketButtonProps = {
  selectedEntries: string[];
};

const AddToBasketButton: FC<AddToBasketButtonProps> = ({ selectedEntries }) => {
  // const dispatch = useDispatch();

  const disabled = !selectedEntries.length;

  const handleClick = () => {
    console.log('handle add to basket');
    // dispatch(/* action to add entries to basket */);
  };

  return (
    <button
      type="button"
      className="button tertiary"
      disabled={disabled}
      onClick={handleClick}
    >
      <BasketIcon />
      Add
    </button>
  );
};

export default AddToBasketButton;
