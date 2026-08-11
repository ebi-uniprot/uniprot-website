import { act, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
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

/* The tab renders three requests: its own results, plus the two counts behind
the community message. Leave PIR one publication ahead of us so that message
shows, and answer the counts whatever state the results are in — they don't
depend on the facets, so they never reload. */
const mockCommunityCounts = (url: string) => {
  if (url?.includes('community.uniprot.org')) {
    return { loading: false, headers: { 'x-total-results': total + 1 } };
  }
  if (url?.includes('size=0')) {
    return { loading: false, headers };
  }
  return undefined;
};

const mockResults = (results: object) =>
  (useDataApi as jest.Mock).mockImplementation(
    (url: string) => mockCommunityCounts(url) || results
  );

const communityCuratedLink = {
  name: /View all community curated publications/,
};

describe('EntryPublications tests', () => {
  beforeEach(() => {
    mockResults(dataMock);
  });

  it('should call useDataApi and render', () => {
    customRender(<EntryPublications accession="P05067" />);
    expect(useDataApi).toHaveBeenCalled();
    expect(
      screen.getByText(/Identification of an S-adenosylhomocysteine/)
    ).toBeInTheDocument();
  });

  it('should link to the community curated publications when that facet is applied', () => {
    customRender(<EntryPublications accession="P05067" />, {
      route: '/uniprotkb/P05067/publications?facets=types%3A1%2Ctypes%3A0',
    });
    expect(screen.getByRole('link', communityCuratedLink)).toBeInTheDocument();
  });

  it('should not link to the community curated publications without that facet', () => {
    customRender(<EntryPublications accession="P05067" />, {
      route: '/uniprotkb/P05067/publications?facets=types%3A1',
    });
    expect(
      screen.queryByRole('link', communityCuratedLink)
    ).not.toBeInTheDocument();
  });

  it('should keep the community curated link mounted while a facet change reloads the results', () => {
    const { history } = customRender(<EntryPublications accession="P05067" />, {
      route: '/uniprotkb/P05067/publications?facets=types%3A0',
    });
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
    // Still the very same node, so it never unmounted, refetched its counts and
    // flashed back in
    expect(screen.getByRole('link', communityCuratedLink)).toBe(link);
  });
});
