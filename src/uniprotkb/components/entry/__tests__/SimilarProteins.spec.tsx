import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import SimilarProteins from '../similar-proteins/SimilarProteins';
import similarProteinsData from './__mocks__/similarProteinsData.json';
import accessionsData from './__mocks__/accessionsData.json';

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

var axiosMock = new MockAdapter(axios);
axiosMock.onGet(/\/uniref\/search/).reply(200, similarProteinsData);
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

  it('should generate the correct link to view all', async () => {
    fireEvent.click(await screen.findByRole('button', { name: /View all/ }));
    expect(historyMock.location.search).toEqual(
      '?query=(uniref_cluster_100:UniRef100_P05067-4 OR uniref_cluster_100:UniRef100_P05067)'
    );
  });
});
