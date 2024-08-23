import { waitFor } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';

import getCustomRenderHook from '../../__test-helpers__/customRenderHook';

import useItemSelect from '../useItemSelect';

describe('useItemSelect', () => {
  const customRenderHook = getCustomRenderHook(() => useItemSelect());

  it('should return correct default selectedItems, setSelectedItemFromEvent', () => {
    const { result } = customRenderHook();
    expect(result.current[0]).toEqual([]);
    expect(typeof result.current[1]).toBe('function');
  });

  it('should add and remove item', async () => {
    const { result } = customRenderHook();
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
    await waitFor(() => expect(result.current[0]).toEqual(['id1']));
    checkbox.checked = false;
    act(() => {
      result.current[1]({
        ...new MouseEvent('click'),
        target: checkbox,
      });
    });
    await waitFor(() => expect(result.current[0]).toEqual([]));
  });
});
