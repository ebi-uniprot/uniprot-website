import React from 'react';
import { Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fireEvent, waitForElement } from '@testing-library/dom';
import Entry from '../Entry';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';
import entryData from '../../model/__mocks__/entryModelData.json';
import entryPublicationsData from '../publications/__mocks__/entryPublicationsData.json';
import entryInitialState from '../state/entryInitialState';

import apiUrls, {
  getUniProtPublicationsQueryUrl,
  joinUrl,
} from '../../utils/apiUrls';

const { primaryAccession } = entryData;
const mock = new MockAdapter(axios);

const filteredUrl = getUniProtPublicationsQueryUrl(primaryAccession, [
  { name: 'study_type', value: 'small_scale' },
]);

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

describe('Entry', () => {
  beforeEach(() => {
    component = renderWithRedux(
      <Route
        component={props => <Entry {...props} />}
        path="/uniprotkb/:accession"
      />,
      {
        route: `/uniprotkb/${primaryAccession}`,
        initialState: {
          entry: {
            ...entryInitialState,
          },
        },
      }
    );
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
      const smallFacetButton = await waitForElement(() => getByText(/Small/));
      fireEvent.click(smallFacetButton);
      const smallFacetButton2 = await waitForElement(() =>
        getByText(/Another facet/)
      );
      expect(smallFacetButton2).toBeTruthy();
    });
  });
});
