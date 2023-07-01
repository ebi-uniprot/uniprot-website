import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fireEvent, waitFor, screen, act } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import Entry from '../Entry';

import apiUrls, {
  getUniProtPublicationsQueryUrl,
} from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';

import entryData from '../../../__mocks__/uniProtKBEntryModelData';
import entryPublicationsData from './__mocks__/entryPublicationsData';

const { primaryAccession } = entryData;

jest.mock('../EntryMain', () => ({
  __esModule: true,
  default: () => '{{ EntryMain }}',
}));

jest.mock('../../../../shared/components/layouts/UniProtFooter', () => ({
  __esModule: true,
  default: () => '{{ Footer }}',
}));

const filteredUrl = getUniProtPublicationsQueryUrl({
  accession: primaryAccession,
  selectedFacets: [{ name: 'study_type', value: 'small_scale' }],
});

const mock = new MockAdapter(axios);
mock
  .onGet(apiUrls.entry(primaryAccession, Namespace.uniprotkb))
  .reply(200, entryData)
  .onGet(
    getUniProtPublicationsQueryUrl({
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
