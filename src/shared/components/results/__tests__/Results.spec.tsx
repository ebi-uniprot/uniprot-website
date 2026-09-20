import '../../../../uniprotkb/components/__mocks__/mockApi';

import { fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { SearchResultsLocations } from '../../../../app/config/urls';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import customRender from '../../../__test-helpers__/customRender';
import {
  canonical,
  clearHeadTags,
  robots,
} from '../../../__test-helpers__/headTags';
import Results from '../Results';

jest.mock('../SearchSuggestions', () => ({
  __esModule: true,
  default: () => '{{ SearchSuggestions }}',
}));

jest.mock('../DidYouMean', () => ({
  __esModule: true,
  default: () => '{{ DidYouMean }}',
}));

jest.mock('../ResultsFacets', () => ({
  __esModule: true,
  default: () => '{{ ResultsFacets }}',
}));

describe('Results component', () => {
  // Testing the button, and testing the 2 views, this is probably enough
  it('should toggle card view to table', async () => {
    customRender(<Results />, {
      route: '/uniprotkb?query=blah',
      initialLocalStorage: { 'view-mode': 'cards' },
    });
    await screen.findAllByText('Gene:');
    const radio = await screen.findByRole('radio', { name: /table/i });
    fireEvent.click(radio);
    const table = await screen.findByText('Entry');
    expect(table).toBeInTheDocument();
  });

  it('should set sorting in table view', async () => {
    const { history } = customRender(<Results />, {
      route: '/uniprotkb?query=blah',
      initialLocalStorage: {
        'view-mode': 'table',
        'table columns for uniprotkb': [UniProtKBColumn.accession],
      },
    });
    let columnHeader = await screen.findByText('Entry');
    fireEvent.click(columnHeader);
    await waitFor(() => {
      expect(history.location.search).toBe(
        '?dir=ascend&query=blah&sort=accession'
      );
    });
    columnHeader = await screen.findByText('Entry');
    fireEvent.click(columnHeader);
    await waitFor(() => {
      expect(history.location.search).toBe(
        '?dir=descend&query=blah&sort=accession'
      );
    });
    columnHeader = await screen.findByText('Entry');
    await waitFor(() => {
      fireEvent.click(columnHeader);
      expect(history.location.search).toBe(
        '?dir=ascend&query=blah&sort=accession'
      );
    });
  });

  it('should show card view if URL has view=cards as well as fields', async () => {
    customRender(<Results />, {
      route: '/uniprotkb?query=blah&view=cards&fields=accession,id',
      initialLocalStorage: {
        'view-mode': 'table',
        'table columns for uniprotkb': [UniProtKBColumn.accession],
      },
    });
    const cards = await screen.findAllByText('Gene:');
    expect(cards).not.toHaveLength(0);
  });

  it('should show table view if URL has no view specified but has fields', async () => {
    customRender(<Results />, {
      route: '/uniprotkb?query=blah&fields=accession,id',
      initialLocalStorage: {
        'view-mode': 'cards',
        'table columns for uniprotkb': [UniProtKBColumn.accession],
      },
    });
    const table = await screen.findByText('Entry');
    expect(table).toBeInTheDocument();
  });
});

describe('Results head tags', () => {
  beforeEach(clearHeadTags);

  it('consolidates a filtered search onto the unfiltered results URL', async () => {
    customRender(<Results />, {
      route: '/uniprotkb?query=blah&facets=reviewed%3Atrue',
    });

    await waitFor(() =>
      expect(canonical()).toHaveAttribute(
        'href',
        'https://www.uniprot.org/uniprotkb?query=*'
      )
    );
  });

  // The route matches whatever case and trailing slash a link arrives with;
  // the canonical must not echo them, or each spelling claims to be the page
  it('canonicalises a differently-cased, trailing-slash URL', async () => {
    customRender(<Results />, {
      route: '/UniProtKB/?query=blah',
    });

    await waitFor(() =>
      expect(canonical()).toHaveAttribute(
        'href',
        'https://www.uniprot.org/uniprotkb?query=*'
      )
    );
  });

  // The canonical comes from the namespace, so every namespace's mapping is
  // load-bearing, not just the one the shared mock serves
  describe('every namespace canonicalises to its own results URL', () => {
    let empty: MockAdapter;

    beforeAll(() => {
      // Layered over the shared mock: an empty result set for any namespace,
      // which is enough for the head to render
      empty = new MockAdapter(axios);
      empty
        .onGet(/\/search/)
        .reply(200, { results: [] }, { 'x-total-results': '0' })
        .onAny()
        .reply(404);
    });

    afterAll(() => {
      empty.restore();
    });

    it.each(Object.values(SearchResultsLocations))('%s', async (path) => {
      customRender(<Results />, { route: `${path}?query=blah` });

      await waitFor(() =>
        expect(canonical()).toHaveAttribute(
          'href',
          `https://www.uniprot.org${path}?query=*`
        )
      );
    });
  });

  // Neither: a canonical would tell Google this error is the results page,
  // noindex would tell it to drop a page that is fine
  it('emits no canonical and no robots directive while the API is down', async () => {
    // Layered over the shared mock; restoring hands it back
    const mock = new MockAdapter(axios);
    mock
      .onGet(/\/uniprotkb\/search/)
      .reply(503)
      .onAny()
      .reply(404);
    try {
      customRender(<Results />, { route: '/uniprotkb?query=blah' });

      await screen.findByText(
        'This service is currently unavailable!',
        {},
        // useDataApi retries a 503 once, with a backoff, before it surfaces
        { timeout: 5_000 }
      );
      expect(canonical()).toBeNull();
      expect(robots()).toBeNull();
    } finally {
      mock.restore();
    }
  });
});
