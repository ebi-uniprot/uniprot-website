import {
  useCallback,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useLocation } from 'react-router-dom';

const useItemSelect = (
  // optional loading flag, in case data is rendered in stale state
  loading?: boolean
): [
  selectedItems: string[],
  // helper function to be used most of the times
  setSelectedItemFromEvent: (event: MouseEvent | KeyboardEvent) => void,
  // escape hatch to use the state setter. Only use on controlled checkboxes!!!
  setSelectedItems: Dispatch<SetStateAction<string[]>>
] => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const location = useLocation();

  const setSelectedItemFromEvent = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement && event.target.dataset.id) {
        const { id } = event.target.dataset;
        const { checked } = event.target;
        setSelectedItems((selectedItems) => {
          const workingSet = new Set(selectedItems);
          workingSet[checked ? 'add' : 'delete'](id);
          return Array.from(workingSet);
        });
      }
    },
    []
  );

  // reset the array of selected entries whenever the location changes
  useEffect(() => {
    // (after a location change and) whenever the data is not loading anymore
    if (!loading) {
      setSelectedItems((selectedItems) => {
        // get all selected items in the DOM (rendered)
        const selectedInDOM = new Set(
          Array.from(
            document.querySelectorAll<HTMLInputElement>(
              'td > input[type="checkbox"]:checked'
            )
          ).map((checkbox) => checkbox.dataset.id)
        );

        // out of all the currently selected items, keep only the rendered ones
        return selectedItems.filter((selectedItem) =>
          selectedInDOM.has(selectedItem)
        );
      });
    }
    // we don't use location, but we need it to trigger an effect change
  }, [loading, location]);

  return [selectedItems, setSelectedItemFromEvent, setSelectedItems];
};

export default useItemSelect;
