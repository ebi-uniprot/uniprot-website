import { act, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import {
  type CommunityCuratedCounts,
  CommunityCuratedCountsContext,
} from '../../../../shared/contexts/CommunityCuratedCounts';
import useDataApi from '../../../../shared/hooks/useDataApi';
import EntryPublications from '../tabs/Publications';
import mockPublicationsData from './__mocks__/entryPublicationsData';

jest.mock('../../../../shared/hooks/useDataApi', () => jest.fn());

const total = mockPublicationsData.results.length;
const headers = { 'x-total-results': total };
const dataMock = {
  loading: false,
  data: mockPublicationsData,
  headers,
};

/* The tab itself only requests its results: the community message reads both
its counts from the context the entry provides. Leave PIR one publication ahead
so that message shows. */
const mockResults = (results: object) =>
  (useDataApi as jest.Mock).mockImplementation(() => results);

const renderTab = (
  route?: string,
  counts: CommunityCuratedCounts = { submitted: total + 1, indexed: total }
) =>
  customRender(
    <CommunityCuratedCountsContext.Provider value={counts}>
      <EntryPublications accession="P05067" />
    </CommunityCuratedCountsContext.Provider>,
    route ? { route } : undefined
  );

const communityCuratedLink = {
  name: /View all community curated publications/,
};

describe('EntryPublications tests', () => {
  beforeEach(() => {
    mockResults(dataMock);
  });

  it('should call useDataApi and render', () => {
    renderTab();
    expect(useDataApi).toHaveBeenCalled();
    expect(
      screen.getByText(/Identification of an S-adenosylhomocysteine/)
    ).toBeInTheDocument();
  });

  it('should link to the community curated publications when that facet is applied', () => {
    renderTab('/uniprotkb/P05067/publications?facets=types%3A1%2Ctypes%3A0');
    expect(screen.getByRole('link', communityCuratedLink)).toBeInTheDocument();
  });

  it('should not link to the community curated publications without that facet', () => {
    renderTab('/uniprotkb/P05067/publications?facets=types%3A1');
    expect(
      screen.queryByRole('link', communityCuratedLink)
    ).not.toBeInTheDocument();
  });

  it('should keep the community curated link mounted while a facet change reloads the results', () => {
    const { history } = renderTab(
      '/uniprotkb/P05067/publications?facets=types%3A0'
    );
    const link = screen.getByRole('link', communityCuratedLink);

    // A facet change discards the accumulated results and loads the first page
    // of the new ones again
    mockResults({ loading: true, headers });
    act(() => {
      history.push(
        '/uniprotkb/P05067/publications?facets=types%3A0%2Ctypes%3A1'
      );
    });

    // The previous results have been discarded, ie we are back to loading
    expect(
      screen.queryByText(/Identification of an S-adenosylhomocysteine/)
    ).not.toBeInTheDocument();
    // Still the very same node, so it never unmounted, refetched its count and
    // flashed back in
    expect(screen.getByRole('link', communityCuratedLink)).toBe(link);
  });

  // Whatever the counts say or fail to say, they are not guaranteed to be
  // counting the same thing as PIR, so applying the facet must always leave a
  // way through to the submissions themselves
  it.each([
    ['neither count known', { submitted: 0, indexed: undefined }],
    ['nothing submitted', { submitted: 0, indexed: 0 }],
    ['the release ahead', { submitted: 2, indexed: 3 }],
  ])('should link to the submissions with %s', (_, counts) => {
    renderTab('/uniprotkb/P05067/publications?facets=types%3A0', counts);
    expect(
      screen.getByRole('link', { name: /community curated publications/ })
    ).toHaveAttribute('href', expect.stringContaining('community.uniprot.org'));
  });

  it('should not request the counts again when the facet is toggled', () => {
    const { history } = renderTab('/uniprotkb/P05067/publications');

    for (const search of ['?facets=types%3A0', '', '?facets=types%3A0']) {
      act(() => {
        history.push(`/uniprotkb/P05067/publications${search}`);
      });
    }

    expect(screen.getByRole('link', communityCuratedLink)).toBeInTheDocument();
    // The counts come from the entry, so toggling the facet the message is
    // rendered behind must not reach the community curation site
    expect(
      (useDataApi as jest.Mock).mock.calls.filter(([url]) =>
        String(url).includes('community.uniprot.org')
      )
    ).toHaveLength(0);
  });
});
