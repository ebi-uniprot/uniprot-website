import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import SimilarProteins from '../similar-proteins/SimilarProteins';

import similarProteinsData from './__mocks__/similarProteinsData';
import accessionsData from './__mocks__/accessionsData.json';

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

var axiosMock = new MockAdapter(axios);
axiosMock
  .onGet(/\/uniref\/search/)
  .reply(200, { results: similarProteinsData });
axiosMock.onGet(/\/uniprotkb\/accessions/).reply(200, accessionsData);

let historyMock;

describe('SimilarProteins tests', () => {
  beforeEach(async () => {
    await act(async () => {
      const { history } = renderWithRedux(
        <SimilarProteins
          primaryAccession="P05067"
          isoforms={{ isoforms: ['P05067-4'] }}
        />
      );
      historyMock = history;
    });
  });

  it('should call useDataApi and render', async () => {
    expect(await screen.findAllByText(/0FGN2/)).toBeTruthy();
  });

  it('should change tabs', async () => {
    fireEvent.click(await screen.findByRole('tab', { name: /50% identity/ }));
    expect(await screen.findByText(/P12023/)).toBeTruthy();
  });

  it('should navigate to correct search page when clicking "view all"', async () => {
    fireEvent.click(await screen.getByText(/View all/));
    expect(historyMock.location.search).toEqual(
      '?query=(uniref_cluster_90:UniRef90_P05067-8 OR uniref_cluster_90:UniRef90_P05067-5 OR uniref_cluster_90:UniRef90_P05067-10 OR uniref_cluster_90:UniRef90_P05067-4)'
    );
    expect(historyMock.location.pathname).toEqual('/uniprotkb');
  });
});
