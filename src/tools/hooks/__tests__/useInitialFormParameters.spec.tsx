import { renderHook } from '@testing-library/react-hooks';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import queryString from 'query-string';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { LocationToPath, Location } from '../../../app/config/urls';
import useInitialFormParameters, {
  FormValues,
} from '../useInitialFormParameters';

import defaultAlignFormValues from '../../align/config/AlignFormData';
import defaultPeptideSearchFormValues from '../../peptide-search/config/PeptideSearchFormData';
import accessionsData from '../../../uniprotkb/components/entry/__tests__/__mocks__/accessionsData.json';

function customRenderHook<Fields extends string>(
  defaultFormValues: Readonly<FormValues<Fields>>,
  path?: string,
  state?: unknown
) {
  const history = createMemoryHistory();
  if (path) {
    history.push(path, state);
  }
  return renderHook(() => useInitialFormParameters(defaultFormValues), {
    wrapper: ({ children }) => <Router history={history}>{children}</Router>,
  });
}

describe('useInitialFormParameters: Align', () => {
  it('should return defaultAlignFormValues if nothing in history state or url parameters', () => {
    const { result } = customRenderHook(defaultAlignFormValues);
    expect(result.current.initialFormValues).toEqual(defaultAlignFormValues);
    expect(result.current.loading).toEqual(false);
  });

  it('should return defaultAlignFormValues and sequence from history state and nothing in url parameters', () => {
    const sequence = 'ABCDEF';
    const { result } = customRenderHook(
      defaultAlignFormValues,
      LocationToPath[Location.Align],
      {
        parameters: { sequence },
      }
    );
    expect(result.current.initialFormValues).toEqual({
      ...defaultAlignFormValues,
      Sequence: { ...defaultAlignFormValues.Sequence, selected: sequence },
    });
    expect(result.current.loading).toEqual(false);
  });

  it('should load the sequence corresponding to the ID passed in URL parameters and ignore history state parameter', async () => {
    const sequence = 'ABCDEF';
    const axiosMock = new MockAdapter(axios);
    axiosMock.onGet(/\/uniprotkb\/accessions/).reply(200, accessionsData);
    const { result, waitForNextUpdate } = customRenderHook(
      defaultAlignFormValues,
      queryString.stringifyUrl({
        url: LocationToPath[Location.Blast],
        query: {
          ids: 'P05067[1-10]',
        },
      }),
      {
        parameters: { sequence },
      }
    );
    await waitForNextUpdate();
    expect(result.current.initialFormValues).toEqual({
      ...defaultAlignFormValues,
      Sequence: { fieldName: 'sequence', selected: '>\nMLPGLALLLL' },
    });
    expect(result.current.loading).toBe(false);
  });
});

describe('useInitialFormParameters: Peptide Search', () => {
  it('should return defaultAlignFormValues and peps, lEQi, spOnly from url parameters', () => {
    const peps = 'ABCDEF';

    const { result } = customRenderHook(
      defaultPeptideSearchFormValues,
      queryString.stringifyUrl({
        url: LocationToPath[Location.PeptideSearch],
        query: { peps, lEQi: 'on', spOnly: 'off' },
      })
    );
    expect(result.current.initialFormValues).toEqual({
      ...defaultPeptideSearchFormValues,
      'Peptide sequences': {
        ...defaultPeptideSearchFormValues['Peptide sequences'],
        selected: peps,
      },
      'Search UniProt Reviewed (Swiss-Prot) only': {
        ...defaultPeptideSearchFormValues[
          'Search UniProt Reviewed (Swiss-Prot) only'
        ],
        selected: 'off',
      },
      'Treat isoleucine and leucine as equivalent': {
        ...defaultPeptideSearchFormValues[
          'Treat isoleucine and leucine as equivalent'
        ],
        selected: 'on',
      },
    });
  });
});
