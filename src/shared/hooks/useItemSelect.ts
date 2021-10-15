import { Dispatch, useCallback, useState, SetStateAction } from 'react';

const useItemSelect = (): [
  selectedItems: string[],
  // helper function to be used most of the times
  setSelectedItemFromEvent: (event: MouseEvent | KeyboardEvent) => void,
  // escape hatch to use the state setter. Only use on controlled checkboxes!!!
  setSelectedItems: Dispatch<SetStateAction<string[]>>
] => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const setSelectedItemFromEvent = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement && event.target.dataset.id) {
        const { id } = event.target.dataset;
        const { checked } = event.target;
        setSelectedItems((selectedItems) =>
          checked
            ? [...selectedItems, id]
            : selectedItems.filter((item) => item !== id)
        );
      }
    },
    []
  );

  return [selectedItems, setSelectedItemFromEvent, setSelectedItems];
};

export default useItemSelect;
