import {
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { schedule } from 'timing-functions';

import useSafeState from './useSafeState';

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
  const [selectedItems, setSelectedItems] = useSafeState<string[]>([]);
  const location = useLocation();

  // set of pending actions to process
  const liveSelectedItems = useRef(new Set<string>([]));
  const processingFlag = useRef(false);

  // process all pending actions in a debounced function
  // NOTE: check if this convoluted logic is still necessary whenever React 18
  // NOTE: is out with automatic batching
  const reflectState = useCallback(() => {
    processingFlag.current = false;
    setSelectedItems(Array.from(liveSelectedItems.current));
  }, [setSelectedItems]);

  const setSelectedItemFromEvent = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement && event.target.dataset.id) {
        const { id } = event.target.dataset;
        const { checked } = event.target;
        liveSelectedItems.current[checked ? 'add' : 'delete'](id);
        if (!processingFlag.current) {
          processingFlag.current = true;
          schedule().then(() => {
            reflectState();
          });
        }
      }
    },
    [reflectState]
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

        liveSelectedItems.current = new Set(
          selectedItems.filter((selectedItem) =>
            selectedInDOM.has(selectedItem)
          )
        );
        // out of all the currently selected items, keep only the rendered ones
        return Array.from(liveSelectedItems.current);
      });
    }
    // we don't use location, but we need it to trigger an effect change
  }, [loading, location, setSelectedItems]);

  return [selectedItems, setSelectedItemFromEvent, setSelectedItems];
};

export default useItemSelect;
