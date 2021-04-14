import { renderHook } from '@testing-library/react-hooks';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { LocationToPath, Location } from '../../../app/config/urls';
import useInitialFormParameters from '../useInitialFormParameters';

import defaultFormValues from '../../align/config/AlignFormData';

describe('useInitialFormParameters', () => {
  const renderHookWithHistory = (path?: string, state?: unknown) => {
    const history = createMemoryHistory();
    if (path && state) {
      history.push(path, state);
    }
    return renderHook(() => useInitialFormParameters(defaultFormValues), {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>,
    });
  };
  it('should return defaultFormValues if nothing in history state', () => {
    const { result } = renderHookWithHistory();
    expect(result.current).toEqual(defaultFormValues);
  });
  it('should return defaultFormValues including sequence from history state', () => {
    const sequence = 'ABCDEF';
    const { result } = renderHookWithHistory(LocationToPath[Location.Align], {
      parameters: { sequence },
    });
    expect(result.current).toEqual({
      ...defaultFormValues,
      Sequence: { ...defaultFormValues.Sequence, selected: sequence },
    });
  });
});
