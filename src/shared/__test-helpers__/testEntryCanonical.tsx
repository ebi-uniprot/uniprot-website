import { waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { type ComponentType } from 'react';
import { Route, type RouteChildrenProps } from 'react-router-dom';

import {
  getEntryPath,
  type Location,
  LocationToPath,
  PRODUCTION_ORIGIN,
} from '../../app/config/urls';
import apiUrls from '../config/apiUrls/apiUrls';
import { type SearchableNamespace } from '../types/namespaces';
import customRender from './customRender';
import { canonical, clearHeadTags } from './headTags';

type Options = {
  namespace: SearchableNamespace;
  location: Location;
  accession: string;
  data: unknown;
  Entry: ComponentType<RouteChildrenProps<{ accession: string }>>;
};

/**
 * Asserts that an entry page canonicalises to the URL the sitemap lists,
 * whatever decoration the visited URL carries. Shared rather than repeated per
 * namespace so that a new entry page costs one call instead of a copy.
 */
const testEntryCanonical = ({
  namespace,
  location,
  accession,
  data,
  Entry,
}: Options) => {
  const mock = new MockAdapter(axios);
  mock
    .onGet(apiUrls.entry.entry(accession, namespace))
    .reply(200, data)
    .onAny()
    .reply(404);

  afterAll(() => {
    mock.restore();
  });

  beforeEach(clearHeadTags);

  it('canonicalises without the query string', async () => {
    customRender(<Route path={LocationToPath[location]} component={Entry} />, {
      route: `${getEntryPath(namespace, accession)}?fromCovid19Portal=true`,
    });

    await waitFor(() =>
      expect(canonical()).toHaveAttribute(
        'href',
        `${PRODUCTION_ORIGIN}${getEntryPath(namespace, accession)}`
      )
    );
  });
};

export default testEntryCanonical;
