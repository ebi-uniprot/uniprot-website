import { renderHook, act } from '@testing-library/react-hooks';

import useItemSelect from '../useItemSelect';

describe('useItemSelect', () => {
  it('should return correct default selectedItems, handleItemSelection', () => {
    const { result } = renderHook(() => useItemSelect());
    expect(result.current[0]).toEqual([]);
    expect(typeof result.current[1]).toBe('function');
  });

  it('should return passed selectedItems', () => {
    const { result } = renderHook(() => useItemSelect(['id1']));
    expect(result.current[0]).toEqual(['id1']);
    expect(typeof result.current[1]).toBe('function');
  });

  it('should add and remove item', () => {
    const { result } = renderHook(() => useItemSelect());
    act(() => {
      result.current[1]('id1');
    });
    expect(result.current[0]).toEqual(['id1']);
    act(() => {
      result.current[1]('id1');
    });
    expect(result.current[0]).toEqual([]);
  });
});
