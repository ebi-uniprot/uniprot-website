import { Route } from 'react-router-dom';
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

import entryData from '../../../__mocks__/entryModelData.json';
import nonHumanEntryData from '../../../__mocks__/nonHumanEntryModelData.json';
import deletedEntryData from '../../../../shared/__mocks__/deletedEntryModelData.json';
import demergedEntryData from '../../../../shared/__mocks__/demergedEntryModelData.json';
import entryPublicationsData from './__mocks__/entryPublicationsData';

const { primaryAccession } = entryData;
const { primaryAccession: deleteEntryAccession } = deletedEntryData;
const { primaryAccession: demergedEntryAccession } = demergedEntryData;
const { primaryAccession: nonHumanEntryAccession } = nonHumanEntryData;
const mock = new MockAdapter(axios);

const filteredUrl = getUniProtPublicationsQueryUrl({
  accession: primaryAccession,
  selectedFacets: [{ name: 'study_type', value: 'small_scale' }],
});

mock
  .onGet(apiUrls.entry(deleteEntryAccession, Namespace.uniprotkb))
  .reply(200, deletedEntryData);
mock
  .onGet(apiUrls.entry(demergedEntryAccession, Namespace.uniprotkb))
  .reply(200, demergedEntryData);
mock
  .onGet(apiUrls.entry(primaryAccession, Namespace.uniprotkb))
  .reply(200, entryData);
mock
  .onGet(apiUrls.entry(nonHumanEntryAccession, Namespace.uniprotkb))
  .reply(200, nonHumanEntryData);
mock
  .onGet(
    getUniProtPublicationsQueryUrl({
      accession: primaryAccession,
      selectedFacets: [],
    })
  )
  .reply(200, entryPublicationsData, { 'x-total-records': 25 });
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
  { 'x-total-records': 25 }
);
// Need to mock this request too as the whole Entry gets rendered.
// TODO: it would be nice to not render the whole entry...
mock.onGet(joinUrl(apiUrls.variation, primaryAccession)).reply(200, {});

let component;

describe('Entry', () => {
  beforeEach(async () => {
    await act(async () => {
      component = customRender(
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

  it.skip('should switch to publications and apply a filter', async () => {
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
    component = customRender(
      <Route
        component={(props) => <Entry {...props} />}
        path="/uniprotkb/:accession"
      />,
      {
        route: `/uniprotkb/${deleteEntryAccession}`,
      }
    );

    expect(
      await screen.findByTestId('deleted-entry-message')
    ).toBeInTheDocument();
  });

  it('should render obsolete page for demerged entries', async () => {
    component = customRender(
      <Route
        component={(props) => <Entry {...props} />}
        path="/uniprotkb/:accession"
      />,
      {
        route: `/uniprotkb/${demergedEntryAccession}`,
      }
    );

    expect(
      await screen.findByTestId('demerged-entry-message')
    ).toBeInTheDocument();
  });
});
