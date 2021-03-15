import { useCallback, useState } from 'react';

const useItemSelect = (
  items: string[] = []
): [selectedItems: string[], handleSelectedItem: (id: string) => void] => {
  const [selectedItems, setSelectedItems] = useState(items);

  const handleEntrySelection = useCallback((rowId: string) => {
    setSelectedItems((selectedEntries) => {
      const filtered = selectedEntries.filter((id) => id !== rowId);
      return filtered.length === selectedEntries.length
        ? [...selectedEntries, rowId]
        : filtered;
    });
  }, []);

  return [selectedItems, handleEntrySelection];
};

export default useItemSelect;
