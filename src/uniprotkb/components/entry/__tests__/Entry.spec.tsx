import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { type ReactNode } from 'react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import {
  canonical,
  clearHeadTags,
  robots,
} from '../../../../shared/__test-helpers__/headTags';
import sharedApiUrls from '../../../../shared/config/apiUrls/apiUrls';
import externalUrls from '../../../../shared/config/externalUrls';
import { Namespace } from '../../../../shared/types/namespaces';
import inactiveEntryData from '../../../__mocks__/inactiveEntryModelData';
import entryData from '../../../__mocks__/uniProtKBEntryModelData';
import uniprotkbApiUrls from '../../../config/apiUrls/apiUrls';
import Entry from '../Entry';
import entryPublicationsData from './__mocks__/entryPublicationsData';

const { primaryAccession } = entryData;

jest.mock('../EntryMain', () => ({
  __esModule: true,
  default: () => '{{ EntryMain }}',
}));

jest.mock('../../../../shared/components/layouts/SideBarLayout', () => ({
  __esModule: true,
  SidebarLayout: ({ children }: { children: ReactNode }) => (
    <>
      {'{{ SideBarLayout start }}'}
      {children}
      {'{{ SideBarLayout end }}'}
    </>
  ),
}));

const filteredUrl = uniprotkbApiUrls.publications.entryPublications({
  accession: primaryAccession,
  selectedFacets: [{ name: 'study_type', value: 'small_scale' }],
});

const mock = new MockAdapter(axios);
mock
  .onGet(sharedApiUrls.entry.entry(primaryAccession, Namespace.uniprotkb))
  .reply(200, entryData)
  .onGet(
    uniprotkbApiUrls.publications.entryPublications({
      accession: primaryAccession,
      selectedFacets: [],
    })
  )
  .reply(200, entryPublicationsData, { 'x-total-results': 25 })
  .onHead(externalUrls.CommunityCuratedQuery(primaryAccession))
  .reply(200, undefined, { 'x-total-results': '1' })
  .onGet(filteredUrl)
  .reply(
    200,
    {
      facets: [
        {
          label: 'Study type',
          name: 'study_type',
          values: [
            {
              value: 'Another facet',
              count: 2272,
            },
          ],
        },
      ],
      results: entryPublicationsData.results,
    },
    { 'x-total-results': 25 }
  )
  .onGet(
    sharedApiUrls.entry.entry(
      inactiveEntryData.primaryAccession,
      Namespace.uniprotkb
    )
  )
  .reply(200, inactiveEntryData)
  // 404, not 500: useDataApi retries transient failures, so a catch-all 500
  // would leave every auxiliary endpoint mid-backoff when we snapshot. 404 is
  // what "this entry has no such data" actually looks like anyway.
  .onAny()
  .reply(404);

let rendered: ReturnType<typeof customRender>;

describe('Entry', () => {
  describe('basic', () => {
    beforeEach(async () => {
      await act(async () => {
        rendered = customRender(<Entry />, {
          route: `/uniprotkb/${primaryAccession}`,
        });
      });
    });

    it('should render main', async () => {
      const { asFragment } = rendered;
      expect(asFragment()).toMatchSnapshot();
    });

    // The count comes from a HEAD to the community curation site, made by the
    // entry and handed to the tools row
    it('should link to the community curated publications of the entry', async () => {
      const link = await screen.findByRole('link', {
        name: /Community curated \(1\)/,
      });
      expect(link).toHaveAttribute(
        'href',
        `/uniprotkb/${primaryAccession}/publications?facets=types%3A0`
      );
    });

    it.skip('should switch to publications and apply a filter', async () => {
      const button = screen.getByText('Publications', { selector: 'a' });
      fireEvent.click(button);
      const smallFacetButton = await waitFor(() => screen.getByText(/Small/));
      fireEvent.click(smallFacetButton);
      const smallFacetButton2 = await waitFor(() =>
        screen.getByText(/Another facet/)
      );
      expect(smallFacetButton2).toBeInTheDocument();
    });
  });
});

describe('Entry head tags', () => {
  beforeEach(clearHeadTags);

  it('canonicalises to the sitemap URL, dropping the query string', async () => {
    await act(async () => {
      customRender(<Entry />, {
        route: `/uniprotkb/${primaryAccession}/entry?fromCovid19Portal=true`,
      });
    });

    await waitFor(() =>
      expect(canonical()).toHaveAttribute(
        'href',
        `https://www.uniprot.org/uniprotkb/${primaryAccession}/entry`
      )
    );
  });

  it('canonicalises to the /entry tab even when the URL omits it', async () => {
    await act(async () => {
      customRender(<Entry />, { route: `/uniprotkb/${primaryAccession}` });
    });

    await waitFor(() =>
      expect(canonical()).toHaveAttribute(
        'href',
        `https://www.uniprot.org/uniprotkb/${primaryAccession}/entry`
      )
    );
  });

  it('does not let an obsolete entry be indexed', async () => {
    const obsolete = inactiveEntryData.primaryAccession;
    await act(async () => {
      customRender(<Entry />, { route: `/uniprotkb/${obsolete}/entry` });
    });

    // The robots tag doubles as the barrier telling us Helmet has flushed
    await waitFor(() => expect(robots()).toHaveAttribute('content', 'noindex'));
    // A canonical would tell Google this URL is the same page as some other
    expect(canonical()).toBeNull();
    expect(document.title).toContain(obsolete);
  });
});
