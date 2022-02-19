import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';

import SimilarProteins from '../similar-proteins/SimilarProteins';

import similarProteinsData from './__mocks__/similarProteinsData';
import accessionsData from './__mocks__/accessionsData.json';

const axiosMock = new MockAdapter(axios);
axiosMock
  .onGet(/\/uniref\/search/)
  .reply(200, { results: similarProteinsData });
axiosMock.onGet(/\/uniprotkb\/accessions/).reply(200, accessionsData);

let rendered: ReturnType<typeof customRender>;

describe('SimilarProteins tests', () => {
  beforeEach(async () => {
    await act(async () => {
      rendered = customRender(
        <SimilarProteins
          primaryAccession="P05067"
          isoforms={{ isoforms: ['P05067-4'] }}
        />
      );
    });
  });

  it('should call useDataApi and render', async () => {
    // what is this testing?
    expect(await screen.findAllByText(/0FGN2/)).toHaveLength(5);
  });

  // Skip for now, just to get going
  it.skip('should change tabs', async () => {
    fireEvent.click(await screen.findByRole('tab', { name: /50% identity/ }));
    expect(await screen.findByText(/P12023/)).toBeInTheDocument();
  });

  it('should navigate to correct search page when clicking "View all"', async () => {
    fireEvent.click(await screen.getByText(/View all/));
    expect(rendered.history.location.search).toEqual(
      '?query=(uniref_cluster_100:UniRef100_P05067 OR uniref_cluster_100:UniRef100_P05067-10 OR uniref_cluster_100:UniRef100_P05067-11 OR uniref_cluster_100:UniRef100_P05067-2 OR uniref_cluster_100:UniRef100_P05067-3 OR uniref_cluster_100:UniRef100_P05067-4 OR uniref_cluster_100:UniRef100_P05067-5 OR uniref_cluster_100:UniRef100_P05067-6 OR uniref_cluster_100:UniRef100_P05067-7 OR uniref_cluster_100:UniRef100_P05067-8 OR uniref_cluster_100:UniRef100_P05067-9)'
    );
    expect(rendered.history.location.pathname).toEqual('/uniprotkb');
  });
});
