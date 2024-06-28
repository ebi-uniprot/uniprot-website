import { fireEvent, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import IDMappingResult, { findUriLink } from '../IDMappingResult';

import { IDMappingDetailsContext } from '../../../../../shared/contexts/IDMappingDetails';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import { stringifyQuery } from '../../../../../shared/utils/url';

import SimpleMappingData from '../__mocks__/SimpleMapping';
import SimpleMappingDetails from '../__mocks__/SimpleMappingDetails';
import UniProtkbMapping from '../__mocks__/UniProtkbMapping';
import UniProtkbMappingDetails from '../__mocks__/UniProtkbMappingDetails';
import idMappingFields from '../../__tests__/__mocks__/idMappingFormConfig';
import tooManyIDsForFacetsResults from '../__mocks__/tooManyIDsForFacetsResults';
import tooManyIDsForFacetsDetails from '../__mocks__/tooManyIDsForFacetsDetails';
import tooManyIDsForMappingDetails from '../__mocks__/tooManyIDsForMappingDetails';

import { MappingDetails } from '../../../types/idMappingSearchResults';

const mock = new MockAdapter(axios);
mock
  .onGet(/\/idmapping\/results\/id1/)
  .reply(200, SimpleMappingData)
  .onGet(/\/idmapping\/uniprotkb\/results\/id2/)
  .reply(200, UniProtkbMapping)
  .onGet(/\/configure\/idmapping\/fields/)
  .reply(200, idMappingFields)
  .onGet(/\/idmapping\/uniprotkb\/results\/tooManyIDsForFacets/)
  .reply(200, tooManyIDsForFacetsResults);

const renderIDMappingResult = (route: string, data: MappingDetails) =>
  customRender(
    <IDMappingDetailsContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ loading: false, data }}
    >
      <IDMappingResult />
    </IDMappingDetailsContext.Provider>,
    {
      route,
    }
  );

describe('IDMappingResult tests', () => {
  it.skip('should render simple from/to mapping', async () => {
    renderIDMappingResult('/id-mapping/id1/overview', SimpleMappingDetails);
    expect(await screen.findByText('ENSMUSG00000029283')).toBeInTheDocument();
  });

  it('should render mapping to UniProtKB and apply filter', async () => {
    const { history } = renderIDMappingResult(
      '/id-mapping/uniprotkb/id2/overview',
      UniProtkbMappingDetails
    );
    expect((await screen.findAllByText('Q9Z0H0')).length).toBe(2);
    const facetLink = screen.getByRole('link', { name: /Reviewed/ });
    fireEvent.click(facetLink);
    await waitFor(() => screen.getByRole('table'));
    expect(history.location.search).toEqual('?facets=reviewed%3Atrue');
  });

  it('should render error ID mapping not possible for too many IDs', async () => {
    renderIDMappingResult(
      '/id-mapping/uniprotkb/tooManyIDsForMappingDetails/overview',
      tooManyIDsForMappingDetails
    );
    expect(
      await screen.findByText(
        'Id Mapping API is not supported for mapping results with "mapped to" IDs more than 500000'
      )
    ).toBeInTheDocument();
  });

  it('should render warning that facets not possible for too many IDs', async () => {
    renderIDMappingResult(
      '/id-mapping/uniprotkb/tooManyIDsForFacets/overview',
      tooManyIDsForFacetsDetails
    );
    expect(
      await screen.findByText(
        /Filters are not supported for mapping results with IDs more than 10000/
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /You can query the results by entering a search query in the search bar or by using the Advanced search/
      )
    ).toBeInTheDocument();
  });

  it('should render statistics for obsolete entries if present', async () => {
    renderIDMappingResult('/id-mapping/id1/overview', SimpleMappingDetails);
    expect(await screen.findByText('obsolete')).toBeInTheDocument();
    const obsoleteSearchLink = screen.getByRole<HTMLAnchorElement>('link', {
      name: 'obsolete',
    });
    expect(obsoleteSearchLink.href).toEqual(
      expect.stringContaining(stringifyQuery({ query: 'active:false' }))
    );
  });
});

describe('findUriLink', () => {
  it('should find the link', () => {
    expect(findUriLink(idMappingFields, 'ComplexPortal')).toEqual(
      'https://www.ebi.ac.uk/complexportal/complex/%id'
    );
  });
  it('should not find the link', () => {
    expect(findUriLink(idMappingFields, 'foo')).toEqual(null);
  });
  it('should return null when fields config and db name are undefined', () => {
    expect(findUriLink(undefined, undefined)).toEqual(null);
  });
});
