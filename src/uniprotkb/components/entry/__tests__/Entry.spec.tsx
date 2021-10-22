import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import joinUrl from 'url-join';

import customRender from '../../../../shared/__test-helpers__/customRender';

import Entry from '../Entry';

import apiUrls, {
  getUniProtPublicationsQueryUrl,
} from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';

import entryData from '../../../__mocks__/uniProtKBEntryModelData';
import nonHumanEntryData from '../../../__mocks__/nonHumanEntryModelData';
import deletedEntryData from '../../../../shared/__mocks__/deletedEntryModelData.json';
import demergedEntryData from '../../../../shared/__mocks__/demergedEntryModelData.json';
import entryPublicationsData from './__mocks__/entryPublicationsData';

const { primaryAccession } = entryData;
const { primaryAccession: deleteEntryAccession } = deletedEntryData;
const { primaryAccession: demergedEntryAccession } = demergedEntryData;
const { primaryAccession: nonHumanEntryAccession } = nonHumanEntryData;

const filteredUrl = getUniProtPublicationsQueryUrl({
  accession: primaryAccession,
  selectedFacets: [{ name: 'study_type', value: 'small_scale' }],
});

const mock = new MockAdapter(axios);
mock
  .onGet(apiUrls.entry(deleteEntryAccession, Namespace.uniprotkb))
  .reply(200, deletedEntryData)
  .onGet(apiUrls.entry(demergedEntryAccession, Namespace.uniprotkb))
  .reply(200, demergedEntryData)
  .onGet(apiUrls.entry(primaryAccession, Namespace.uniprotkb))
  .reply(200, entryData)
  .onGet(apiUrls.entry(nonHumanEntryAccession, Namespace.uniprotkb))
  .reply(200, nonHumanEntryData)
  .onGet(
    getUniProtPublicationsQueryUrl({
      accession: primaryAccession,
      selectedFacets: [],
    })
  )
  .reply(200, entryPublicationsData, { 'x-total-records': 25 })
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
    { 'x-total-records': 25 }
  )
  // Need to mock this request too as the whole Entry gets rendered.
  // TODO: it would be nice to not render the whole entry...
  .onGet(joinUrl(apiUrls.variation, primaryAccession))
  .reply(200, {})
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
