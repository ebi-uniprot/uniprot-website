import { fireEvent, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import IDMappingResult, { findUriLink } from '../IDMappingResult';

import { IDMappingDetailsContext } from '../../../../../shared/contexts/IDMappingDetails';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import SimpleMappingData from '../__mocks__/SimpleMapping';
import SimpleMappingDetails from '../__mocks__/SimpleMappingDetails';
import UniProtkbMapping from '../__mocks__/UniProtkbMapping';
import UniProtkbMappingDetails from '../__mocks__/UniProtkbMappingDetails';
import idMappingFields from '../../__tests__/__mocks__/idMappingFormConfig';

const mock = new MockAdapter(axios);
mock
  .onGet(/\/api\/idmapping\/results\/id1/)
  .reply(200, SimpleMappingData)
  .onGet(/\/api\/idmapping\/results\/uniprotkb\/id2/)
  .reply(200, UniProtkbMapping)
  .onGet(/\/configure\/idmapping\/fields/)
  .reply(200, idMappingFields);

describe('IDMappingResult tests', () => {
  it('should render simple from/to mapping', async () => {
    customRender(
      <IDMappingDetailsContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ loading: false, data: SimpleMappingDetails }}
      >
        <IDMappingResult />
      </IDMappingDetailsContext.Provider>,
      {
        route: '/id-mapping/id1/overview',
        initialLocalStorage: {
          'view-mode': 'table', // TODO: This should eventually be removed
        },
      }
    );
    expect(await screen.findByText('ENSMUSG00000029283')).toBeInTheDocument();
  });

  it('should render mapping to UniProtKB and apply filter', async () => {
    const { history } = customRender(
      <IDMappingDetailsContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ loading: false, data: UniProtkbMappingDetails }}
      >
        <IDMappingResult />
      </IDMappingDetailsContext.Provider>,

      {
        route: '/id-mapping/uniprotkb/id2/overview',
        initialLocalStorage: {
          'view-mode': 'table', // TODO: This should eventually be removed
        },
      }
    );
    expect((await screen.findAllByText('Q9Z0H0')).length).toBe(2);
    const facetLink = screen.getByRole('link', { name: /Reviewed/ });
    fireEvent.click(facetLink);
    await waitFor(() => screen.getByRole('table'));
    expect(history.location.search).toEqual('?facets=reviewed%3Atrue');
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
