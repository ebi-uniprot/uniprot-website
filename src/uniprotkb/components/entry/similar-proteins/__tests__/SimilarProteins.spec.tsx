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
import uniprotkbClusterSearch from './__mocks__/uniprotkbClusterSearch';
import unirefP05067 from './__mocks__/unirefP05067';
import unirefP05067isoform4 from './__mocks__/unirefP05067-4';

const axiosMock = new MockAdapter(axios);
axiosMock
  // find clusters for canonical
  .onGet(/query=uniprotkb%3AP05067$/)
  .reply(200, unirefP05067)
  // find clusters for isoform 4
  .onGet(/query=uniprotkb%3AP05067-4$/)
  .reply(200, unirefP05067isoform4)
  // find members of cluster (always same response for testing)
  .onGet(/\/uniprotkb\/search/)
  .reply(200, uniprotkbClusterSearch, { 'x-total-results': 2 });

let rendered: ReturnType<typeof customRender>;

describe('SimilarProteins tests', () => {
  beforeEach(async () => {
    await act(async () => {
      rendered = customRender(
        <SimilarProteins
          isoforms={['P05067-1', 'P05067-4']}
          canonical="P05067-1"
        />
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
    expect(screen.getAllByRole('tab', { name: /identity/ })).toHaveLength(3);
  });

  it('should navigate to correct search page when clicking "View all"', async () => {
    fireEvent.click(screen.getByRole('link', { name: 'View all' }));
    expect(rendered.history.location.search).toEqual(
      '?query=uniref_cluster_100%3AUniRef100_P05067+OR+uniref_cluster_100%3AUniRef100_P05067-4'
    );
    expect(rendered.history.location.pathname).toEqual('/uniprotkb');
  });
});

describe('getClusterMapping', () => {
  it('should return the correct mapping', () => {
    expect(getClusterMapping(allAccessions, clusterData)).toEqual(mapping);
  });
});

describe('SimilarProteins default tab selection', () => {
  beforeEach(() => {
    axiosMock.reset();
    axiosMock
      // find clusters for canonical and isoform 4
      .onGet(/query=uniprotkb%3AP05067$/)
      .reply(200, unirefP05067)
      .onGet(/query=uniprotkb%3AP05067-4$/)
      .reply(200, unirefP05067isoform4)
      // UniRef100 clusters have no similar UniProtKB proteins
      .onGet(/uniref_cluster_100/)
      .reply(200, { results: [] }, { 'x-total-results': 0 })
      // the other levels do
      .onGet(/\/uniprotkb\/search/)
      .reply(200, uniprotkbClusterSearch, { 'x-total-results': 2 });
  });

  it('opens the first level that has similar proteins instead of UniRef100', async () => {
    await act(async () => {
      customRender(
        <SimilarProteins
          isoforms={['P05067-1', 'P05067-4']}
          canonical="P05067-1"
        />
      );
    });
    // UniRef100 has none, so the section should default to the 90% identity tab
    await waitFor(() =>
      expect(screen.getByRole('tab', { name: '90% identity' })).toHaveClass(
        'tabs__header__item--active'
      )
    );
    expect(screen.getByRole('tab', { name: '100% identity' })).not.toHaveClass(
      'tabs__header__item--active'
    );
    // Early-exit: UniRef50 is below the first level with data, so it is not
    // requested until its tab is opened.
    expect(
      axiosMock.history.get.some((request) =>
        request.url?.includes('uniref_cluster_50')
      )
    ).toBe(false);
  });

  it('shows each tab its own level when switching between tabs', async () => {
    await act(async () => {
      customRender(
        <SimilarProteins
          isoforms={['P05067-1', 'P05067-4']}
          canonical="P05067-1"
        />
      );
    });
    // Defaults to the 90% tab
    await screen.findByRole('link', { name: 'UniRef90_P05067' });

    // Open the lazily-loaded 50% tab
    fireEvent.click(screen.getByRole('tab', { name: '50% identity' }));
    await screen.findByRole('link', { name: 'UniRef50_P05067' });

    // Switching back must show the 90% content again, not the stale 50% one
    fireEvent.click(screen.getByRole('tab', { name: '90% identity' }));
    await screen.findByRole('link', { name: 'UniRef90_P05067' });
    expect(
      screen.queryByRole('link', { name: 'UniRef50_P05067' })
    ).not.toBeInTheDocument();
  });

  it('shows a loader, not stale content, while a lazy level is loading', async () => {
    axiosMock.reset();
    axiosMock
      .onGet(/query=uniprotkb%3AP05067$/)
      .reply(200, unirefP05067)
      .onGet(/query=uniprotkb%3AP05067-4$/)
      .reply(200, unirefP05067isoform4)
      .onGet(/uniref_cluster_100/)
      .reply(200, { results: [] }, { 'x-total-results': 0 })
      // UniRef50 request never resolves (slow / hung network)
      .onGet(/uniref_cluster_50/)
      .reply(() => new Promise(() => {}))
      .onGet(/\/uniprotkb\/search/)
      .reply(200, uniprotkbClusterSearch, { 'x-total-results': 2 });

    await act(async () => {
      customRender(
        <SimilarProteins
          isoforms={['P05067-1', 'P05067-4']}
          canonical="P05067-1"
        />
      );
    });
    await screen.findByRole('link', { name: 'UniRef90_P05067' });

    // Opening the still-loading 50% tab must drop the previous level's content
    fireEvent.click(screen.getByRole('tab', { name: '50% identity' }));
    await waitFor(() =>
      expect(
        screen.queryByRole('link', { name: 'UniRef90_P05067' })
      ).not.toBeInTheDocument()
    );
    expect(
      screen.queryByRole('link', { name: 'UniRef50_P05067' })
    ).not.toBeInTheDocument();
  });

  it('caches a lazily-loaded level and does not refetch it on revisit', async () => {
    await act(async () => {
      customRender(
        <SimilarProteins
          isoforms={['P05067-1', 'P05067-4']}
          canonical="P05067-1"
        />
      );
    });
    await screen.findByRole('link', { name: 'UniRef90_P05067' });

    const cluster50Requests = () =>
      axiosMock.history.get.filter((request) =>
        request.url?.includes('uniref_cluster_50')
      ).length;

    // First visit loads the 50% level
    fireEvent.click(screen.getByRole('tab', { name: '50% identity' }));
    await screen.findByRole('link', { name: 'UniRef50_P05067' });
    const afterFirstVisit = cluster50Requests();
    expect(afterFirstVisit).toBeGreaterThan(0);

    // Leave and come back — the cached level renders without a new request
    fireEvent.click(screen.getByRole('tab', { name: '90% identity' }));
    await screen.findByRole('link', { name: 'UniRef90_P05067' });
    fireEvent.click(screen.getByRole('tab', { name: '50% identity' }));
    await screen.findByRole('link', { name: 'UniRef50_P05067' });
    expect(cluster50Requests()).toBe(afterFirstVisit);
  });

  it('shows a retry on a failed level load and recovers when retried', async () => {
    axiosMock.reset();
    axiosMock
      .onGet(/query=uniprotkb%3AP05067$/)
      .reply(200, unirefP05067)
      .onGet(/query=uniprotkb%3AP05067-4$/)
      .reply(200, unirefP05067isoform4)
      .onGet(/uniref_cluster_100/)
      .reply(200, { results: [] }, { 'x-total-results': 0 })
      // The 50% level's first request fails, then succeeds
      .onGet(/uniref_cluster_50/)
      .networkErrorOnce()
      .onGet(/\/uniprotkb\/search/)
      .reply(200, uniprotkbClusterSearch, { 'x-total-results': 2 });

    await act(async () => {
      customRender(
        <SimilarProteins
          isoforms={['P05067-1', 'P05067-4']}
          canonical="P05067-1"
        />
      );
    });
    await screen.findByRole('link', { name: 'UniRef90_P05067' });

    // Opening the 50% tab fails → error with a retry button (not an endless loader)
    fireEvent.click(screen.getByRole('tab', { name: '50% identity' }));
    const retry = await screen.findByRole('button', { name: /try again/i });

    // Retrying succeeds → the table renders
    fireEvent.click(retry);
    await screen.findByRole('link', { name: 'UniRef50_P05067' });
  });
});
