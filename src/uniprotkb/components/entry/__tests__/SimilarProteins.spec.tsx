import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';

import SimilarProteins, {
  getClusterMapping,
} from '../similar-proteins/SimilarProteins';

import similarProteinsData from './__mocks__/similarProteinsData';
import accessionsData from './__mocks__/accessionsData.json';
import {
  allAccessions,
  clusterData,
  mapping,
} from './__mocks__/clusterMappingData';
import unirefP05067 from './__mocks__/unirefP05067';
import unirefP05067isoform4 from './__mocks__/unirefP05067-4';
import uniprotkbClusterSearch from './__mocks__/uniprotkbClusterSearch';

const axiosMock = new MockAdapter(axios);
axiosMock
  .onGet(/\/uniref\/search/)
  .reply(200, { results: similarProteinsData })
  .onGet(/\/uniprotkb\/accessions/)
  .reply(200, accessionsData)
  .onGet(/\/uniref\/search\?query=(uniprot_id:P05067)/)
  .reply(200, unirefP05067)
  .onGet(/\/uniref\/search\?query=(uniprot_id:P05067\-4)/)
  .reply(200, unirefP05067isoform4)
  .onGet(/\/uniprotkb\/search/)
  .reply(200, uniprotkbClusterSearch);

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
    expect(await screen.findAllByText(/P05067-4/)).toHaveLength(5);
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

describe('getClusterMapping', () => {
  it('should return the correct mapping', () => {
    expect(getClusterMapping(allAccessions, clusterData)).toEqual(mapping);
  });
});
