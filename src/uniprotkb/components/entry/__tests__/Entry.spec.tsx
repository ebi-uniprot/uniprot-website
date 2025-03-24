import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ReactNode } from 'react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import sharedApiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { Namespace } from '../../../../shared/types/namespaces';
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
  .onAny()
  .reply(500);

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
