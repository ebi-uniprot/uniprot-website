import React from 'react';
import { Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fireEvent, waitFor } from '@testing-library/dom';
import Entry from '../Entry';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import apiUrls, {
  getUniProtPublicationsQueryUrl,
} from '../../../config/apiUrls';
import joinUrl from 'url-join';
import entryData from '../../../__mocks__/entryModelData.json';
import deletedEntryData from '../../../../shared/__mocks__/deletedEntryModelData.json';
import demergedEntryData from '../../../../shared/__mocks__/demergedEntryModelData.json';
import entryPublicationsData from './__mocks__/entryPublicationsData.json';

const { primaryAccession } = entryData;
const { primaryAccession: deleteEntryAccession } = deletedEntryData;
const { primaryAccession: demergedEntryAccession } = demergedEntryData;
const mock = new MockAdapter(axios);

const filteredUrl = getUniProtPublicationsQueryUrl(primaryAccession, [
  { name: 'study_type', value: 'small_scale' },
]);

mock.onGet(apiUrls.entry(deleteEntryAccession)).reply(200, deletedEntryData);
mock.onGet(apiUrls.entry(demergedEntryAccession)).reply(200, demergedEntryData);
mock.onGet(apiUrls.entry(primaryAccession)).reply(200, entryData);
mock
  .onGet(getUniProtPublicationsQueryUrl(primaryAccession, []))
  .reply(200, entryPublicationsData, { 'x-totalrecords': 25 });
mock.onGet(filteredUrl).reply(
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
  { 'x-totalrecords': 25 }
);
// Need to mock this request too as the whole Entry gets rendered.
// TODO: it would be nice to not render the whole entry...
mock.onGet(joinUrl(apiUrls.variation, primaryAccession)).reply(200, {});

let component;

describe.skip('Entry', () => {
  beforeEach(async () => {
    await act(async () => {
      component = renderWithRedux(
        <Route
          component={(props) => <Entry {...props} />}
          path="/uniprotkb/:accession"
        />,
        {
          route: `/uniprotkb/${primaryAccession}`,
        }
      );
    });
  });

  it('should render main', async () => {
    await act(async () => {
      const { asFragment } = component;
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should switch to publications and apply a filter', async () => {
    await act(async () => {
      const { getByText } = component;
      const button = getByText('Publications', { selector: 'a' });
      fireEvent.click(button);
      const smallFacetButton = await waitFor(() => getByText(/Small/));
      fireEvent.click(smallFacetButton);
      const smallFacetButton2 = await waitFor(() => getByText(/Another facet/));
      expect(smallFacetButton2).toBeTruthy();
    });
  });

  it('should render obsolete page for deleted entries', async () => {
    component = renderWithRedux(
      <Route
        component={(props) => <Entry {...props} />}
        path="/uniprotkb/:accession"
      />,
      {
        route: `/uniprotkb/${deleteEntryAccession}`,
      }
    );

    await act(async () => {
      const { findByTestId } = component;
      const message = await findByTestId('deleted-entry-message');
      expect(message).toBeTruthy();
    });
  });

  it('should render obsolete page for demerged entries', async () => {
    component = renderWithRedux(
      <Route
        component={(props) => <Entry {...props} />}
        path="/uniprotkb/:accession"
      />,
      {
        route: `/uniprotkb/${demergedEntryAccession}`,
      }
    );

    await act(async () => {
      const { findByTestId } = component;
      const message = await findByTestId('demerged-entry-message');
      expect(message).toBeTruthy();
    });
  });
});
