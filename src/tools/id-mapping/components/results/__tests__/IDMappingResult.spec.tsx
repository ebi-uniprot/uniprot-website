import { fireEvent, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import IDMappingResult from '../IDMappingResult';

import SimpleMappingData from '../__mocks__/SimpleMapping';
import SimpleMappingDetails from '../__mocks__/SimpleMappingDetails';
import UniProtkbMapping from '../__mocks__/UniProtkbMapping';
import UniProtkbMappingDetails from '../__mocks__/UniProtkbMappingDetails';

import { ViewMode } from '../../../../../shared/components/results/ResultsData';

const mock = new MockAdapter(axios);
mock
  .onGet(/\/api\/idmapping\/results\/id1/)
  .reply(200, SimpleMappingData)
  .onGet(/\/api\/idmapping\/details\/id1/)
  .reply(200, SimpleMappingDetails)
  .onGet(/\/api\/idmapping\/results\/uniprotkb\/id2/)
  .reply(200, UniProtkbMapping)
  .onGet(/\/api\/idmapping\/details\/id2/)
  .reply(200, UniProtkbMappingDetails);

describe('IDMappingResult tests', () => {
  it('should render simple from/to mapping', async () => {
    customRender(<IDMappingResult />, {
      route: '/id-mapping/id1',
      initialLocalStorage: {
        'view-mode': 'table' as ViewMode, // This should eventually be removed
      },
    });
    expect(await screen.findByText('ENSMUSG00000029283')).toBeInTheDocument();
  });

  it('should render mapping to UniProtKB and apply filter', async () => {
    const { history } = customRender(<IDMappingResult />, {
      route: '/id-mapping/id2',
      initialLocalStorage: {
        'view-mode': 'table' as ViewMode, // This should eventually be removed
      },
    });
    expect((await screen.findAllByText('Q9Z0H0')).length).toBe(2);
    const facetLink = screen.getByRole('link', { name: /Reviewed/ });
    fireEvent.click(facetLink);
    await waitFor(() => screen.getByRole('table'));
    expect(history.location.search).toEqual('?facets=reviewed%3Atrue');
  });
});
