import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { waitFor } from '@testing-library/react';
import getCustomRenderHook from '../../../shared/__test-helpers__/customRenderHook';

import useInitialFormParameters from '../useInitialFormParameters';

import { stringifyUrl } from '../../../shared/utils/url';

import { LocationToPath, Location } from '../../../app/config/urls';

import defaultAlignFormValues from '../../align/config/AlignFormData';
import defaultPeptideSearchFormValues from '../../peptide-search/config/PeptideSearchFormData';
import accessionsData from '../../../uniprotkb/components/entry/__tests__/__mocks__/accessionsData.json';

describe('useInitialFormParameters: Align', () => {
  const customRenderHook = getCustomRenderHook(() =>
    useInitialFormParameters(defaultAlignFormValues)
  );

  it('should return defaultAlignFormValues if nothing in history state or url parameters', () => {
    const { result } = customRenderHook();
    expect(result.current.initialFormValues).toEqual(defaultAlignFormValues);
    expect(result.current.loading).toEqual(false);
  });

  it('should return defaultAlignFormValues and sequence from history state and nothing in url parameters', () => {
    const sequence = 'ABCDEF';
    const { result } = customRenderHook(LocationToPath[Location.Align], {
      parameters: { sequence },
    });
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
    const { result } = customRenderHook(
      stringifyUrl(LocationToPath[Location.Blast], {
        ids: 'P05067[1-10]',
      }),
      {
        parameters: { sequence },
      }
    );
    waitFor(() => {
      expect(result.current.initialFormValues).toEqual({
        ...defaultAlignFormValues,
        Sequence: { fieldName: 'sequence', selected: '>\nMLPGLALLLL' },
      });
      expect(result.current.loading).toBe(false);
    });
  });
});

describe('useInitialFormParameters: Peptide Search', () => {
  const customRenderHook = getCustomRenderHook(() =>
    useInitialFormParameters(defaultPeptideSearchFormValues)
  );
  it('should return defaultAlignFormValues and peps, lEQi, spOnly from url parameters', () => {
    const peps = 'ABCDEF';
    const lEQi = 'on';
    const spOnly = 'off';
    const { result } = customRenderHook(
      stringifyUrl(LocationToPath[Location.PeptideSearch], {
        peps,
        lEQi,
        spOnly,
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
        selected: spOnly,
      },
      'Treat isoleucine and leucine as equivalent': {
        ...defaultPeptideSearchFormValues[
          'Treat isoleucine and leucine as equivalent'
        ],
        selected: lEQi,
      },
    });
  });
});
