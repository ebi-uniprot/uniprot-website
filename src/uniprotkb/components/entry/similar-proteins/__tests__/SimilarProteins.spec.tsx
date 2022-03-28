import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import SimilarProteins, { getClusterMapping } from '../SimilarProteins';

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
  // find clusters for canonical
  .onGet(/\/uniref\/search\?query=\(uniprot_id:P05067\)/)
  .reply(200, unirefP05067)
  // find clusters for isoform 4
  .onGet(/\/uniref\/search\?query=\(uniprot_id:P05067-4\)/)
  .reply(200, unirefP05067isoform4)
  // find members of cluster (always same response for testing)
  .onGet(/\/uniprotkb\/search/)
  .reply(200, uniprotkbClusterSearch, { 'x-total-records': 2 });

let rendered: ReturnType<typeof customRender>;

describe('SimilarProteins tests', () => {
  beforeEach(async () => {
    await act(async () => {
      rendered = customRender(
        <SimilarProteins isoforms={['P05067-1', 'P05067-4']} />
      );
    });
    // Wait for everything to be loaded
    // and use the tables as signals too as they depend on another network call
    await waitFor(() => expect(screen.getAllByRole('table')).toHaveLength(2));
  });

  it('should fetch data and render', async () => {
    expect(rendered.asFragment()).toMatchSnapshot();
    expect(
      screen.getByRole('link', { name: 'UniRef100_P05067' })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('tab', { name: /identity/, exact: false })
    ).toHaveLength(3);
  });

  it('should navigate to correct search page when clicking "View all"', async () => {
    fireEvent.click(screen.getByRole('link', { name: 'View all' }));
    expect(rendered.history.location.search).toEqual(
      '?query=uniref_cluster_100:UniRef100_P05067 OR uniref_cluster_100:UniRef100_P05067-4'
    );
    expect(rendered.history.location.pathname).toEqual('/uniprotkb');
  });
});

describe('getClusterMapping', () => {
  it('should return the correct mapping', () => {
    expect(getClusterMapping(allAccessions, clusterData)).toEqual(mapping);
  });
});
