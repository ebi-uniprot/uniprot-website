import { debounce } from 'lodash-es';
import {
  Dispatch,
  useCallback,
  useState,
  SetStateAction,
  useRef,
  useMemo,
  useEffect,
} from 'react';

const useItemSelect = (): [
  selectedItems: string[],
  // helper function to be used most of the times
  setSelectedItemFromEvent: (event: MouseEvent | KeyboardEvent) => void,
  // escape hatch to use the state setter. Only use on controlled checkboxes!!!
  setSelectedItems: Dispatch<SetStateAction<string[]>>
] => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // set of pending actions to process
  const actions = useRef(new Set<{ item: string; action: 'add' | 'delete' }>());

  // process all pending actions in a debounced function
  // NOTE: check if this convoluted logic is still necessary whenever React 18
  // NOTE: is out with automatic batching
  const consumeActions = useMemo(
    () =>
      debounce(
        () => {
          if (!actions.current.size) {
            return; // no action to process
          }
          setSelectedItems((selectedItems) => {
            const workingSet = new Set(selectedItems);
            for (const { item, action } of actions.current) {
              workingSet[action](item);
            }
            actions.current.clear();
            return Array.from(workingSet);
          });
        },
        0,
        { trailing: true }
      ),
    []
  );

  const setSelectedItemFromEvent = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement && event.target.dataset.id) {
        const { id } = event.target.dataset;
        const { checked } = event.target;
        actions.current.add({ item: id, action: checked ? 'add' : 'delete' });
        consumeActions();
      }
    },
    [consumeActions]
  );

  // on unmount, cancel processing pending actions
  useEffect(() => consumeActions.cancel, []);

  return [selectedItems, setSelectedItemFromEvent, setSelectedItems];
};

export default useItemSelect;
