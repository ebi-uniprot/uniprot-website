import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import useItemSelect from '../useItemSelect';

describe('useItemSelect', () => {
  it('should return correct default selectedItems, setSelectedItemFromEvent', () => {
    const { result } = renderHook(() => useItemSelect());
    expect(result.current[0]).toEqual([]);
    expect(typeof result.current[1]).toBe('function');
  });

  it('should add and remove item', async () => {
    const { result } = renderHook(() => useItemSelect());
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.id = 'id1';
    checkbox.checked = true;
    act(() => {
      result.current[1]({
        ...new MouseEvent('click'),
        target: checkbox,
      });
    });
    await act(() => waitFor(() => expect(result.current[0]).toEqual(['id1'])));
    checkbox.checked = false;
    act(() => {
      result.current[1]({
        ...new MouseEvent('click'),
        target: checkbox,
      });
    });
    await act(() => waitFor(() => expect(result.current[0]).toEqual([])));
  });
});
