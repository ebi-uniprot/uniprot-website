import { renderHook } from '@testing-library/react-hooks';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import queryString from 'query-string';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { LocationToPath, Location } from '../../../app/config/urls';
import useInitialFormParameters from '../useInitialFormParameters';

import defaultFormValues from '../../align/config/AlignFormData';
import accessionsData from '../../../uniprotkb/components/entry/__tests__/__mocks__/accessionsData.json';

describe('useInitialFormParameters', () => {
  const customRenderHook = (path?: string, state?: unknown) => {
    const history = createMemoryHistory();
    if (path) {
      history.push(path, state);
    }
    return renderHook(() => useInitialFormParameters(defaultFormValues), {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>,
    });
  };

  it('should return defaultFormValues if nothing in history state or url parameters', () => {
    const { result } = customRenderHook();
    expect(result.current.initialFormValues).toEqual(defaultFormValues);
    expect(result.current.loading).toEqual(false);
  });

  it('should return defaultFormValues including sequence from history state and nothing in url parameters', () => {
    const sequence = 'ABCDEF';
    const { result } = customRenderHook(LocationToPath[Location.Align], {
      parameters: { sequence },
    });
    expect(result.current.initialFormValues).toEqual({
      ...defaultFormValues,
      Sequence: { ...defaultFormValues.Sequence, selected: sequence },
    });
    expect(result.current.loading).toEqual(false);
  });

  it('should load the sequence corresponding to the ID passed in URL parameters', async () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.onGet(/\/uniprotkb\/accessions/).reply(200, accessionsData);
    const { result, waitForNextUpdate } = customRenderHook(
      `${LocationToPath[Location.Blast]}?${queryString.stringify({
        ids: 'P05067[1-10]',
      })}`
    );
    await waitForNextUpdate();
    expect(result.current.initialFormValues).toEqual({
      ...defaultFormValues,
      Sequence: { fieldName: 'sequence', selected: '>\nMLPGLALLLL' },
    });
    expect(result.current.loading).toBe(false);
  });
});
