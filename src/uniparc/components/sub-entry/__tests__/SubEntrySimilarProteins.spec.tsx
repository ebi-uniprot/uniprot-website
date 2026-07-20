import { act, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';
import uniprotkbClusterSearch from '../../../../uniprotkb/components/entry/similar-proteins/__tests__/__mocks__/uniprotkbClusterSearch';
import SubEntrySimilarProteins from '../SubEntrySimilarProteins';

// Three UniRef clusters (one per level) for the UniParc entry.
const unirefClusters = {
  results: [
    { id: 'UniRef100_UPI0002633FF6', entryType: 'UniRef100', memberCount: 1 },
    { id: 'UniRef90_T2PM54', entryType: 'UniRef90', memberCount: 42 },
    { id: 'UniRef50_T2PM54', entryType: 'UniRef50', memberCount: 42 },
  ],
};

const axiosMock = new MockAdapter(axios);

const renderSection = () =>
  act(async () => {
    customRender(<SubEntrySimilarProteins uniparcId="UPI0002633FF6" />);
  });

describe('SubEntrySimilarProteins', () => {
  afterEach(() => axiosMock.reset());

  it('shows a message on levels that have no similar proteins', async () => {
    axiosMock
      .onGet(/\/uniref\/search/)
      .reply(200, unirefClusters)
      // No UniProtKB members at any level
      .onGet(/\/uniprotkb\/search/)
      .reply(200, { results: [] }, { 'x-total-results': 0 });

    await renderSection();
    await screen.findByText(/No similar proteins at 100% identity/);
    fireEvent.click(screen.getByRole('tab', { name: '90% identity' }));
    await screen.findByText(/No similar proteins at 90% identity/);
  });

  describe('with similar proteins below UniRef100', () => {
    beforeEach(() => {
      axiosMock
        .onGet(/\/uniref\/search/)
        .reply(200, unirefClusters)
        // UniRef100 has no UniProtKB members; UniRef90 / UniRef50 do
        .onGet(/uniref_cluster_100/)
        .reply(200, { results: [] }, { 'x-total-results': 0 })
        .onGet(/\/uniprotkb\/search/)
        .reply(200, uniprotkbClusterSearch, { 'x-total-results': 2 });
    });

    it('defaults to the first level with similar proteins and renders its table', async () => {
      await renderSection();
      await screen.findByRole('link', { name: 'UniRef90_T2PM54' });
      expect(screen.getByRole('tab', { name: '90% identity' })).toHaveClass(
        'tabs__header__item--active'
      );
    });

    it('updates content when switching between levels', async () => {
      await renderSection();
      await screen.findByRole('link', { name: 'UniRef90_T2PM54' });

      fireEvent.click(screen.getByRole('tab', { name: '50% identity' }));
      await screen.findByRole('link', { name: 'UniRef50_T2PM54' });

      fireEvent.click(screen.getByRole('tab', { name: '90% identity' }));
      await screen.findByRole('link', { name: 'UniRef90_T2PM54' });
      expect(
        screen.queryByRole('link', { name: 'UniRef50_T2PM54' })
      ).not.toBeInTheDocument();
    });

    it('caches a lazily-loaded level and does not refetch on revisit', async () => {
      await renderSection();
      await screen.findByRole('link', { name: 'UniRef90_T2PM54' });
      const cluster50Requests = () =>
        axiosMock.history.get.filter((request) =>
          request.url?.includes('uniref_cluster_50')
        ).length;

      fireEvent.click(screen.getByRole('tab', { name: '50% identity' }));
      await screen.findByRole('link', { name: 'UniRef50_T2PM54' });
      const afterFirstVisit = cluster50Requests();
      expect(afterFirstVisit).toBeGreaterThan(0);

      fireEvent.click(screen.getByRole('tab', { name: '90% identity' }));
      await screen.findByRole('link', { name: 'UniRef90_T2PM54' });
      fireEvent.click(screen.getByRole('tab', { name: '50% identity' }));
      await screen.findByRole('link', { name: 'UniRef50_T2PM54' });
      expect(cluster50Requests()).toBe(afterFirstVisit);
    });
  });
});
