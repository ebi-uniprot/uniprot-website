import { screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import IDMappingResult from '../IDMappingResult';

import SimpleMappingData from '../__mocks__/SimpleMapping';
import UniProtkbMapping from '../__mocks__/UniProtkbMapping';
import { ViewMode } from '../../../../../shared/components/results/ResultsData';

const mock = new MockAdapter(axios);
mock
  .onGet(/\/uniprot\/api\/idmapping\/results\/id1/)
  .reply(200, SimpleMappingData);
mock
  .onGet(/\/uniprot\/api\/idmapping\/results\/id2/)
  .reply(200, UniProtkbMapping);

describe('IDMappingResult tests', () => {
  it('should render simple from/to mapping', async () => {
    customRender(<IDMappingResult />, {
      route: '/id-mapping/id1',
      initialUserPreferences: {
        'view-mode': ViewMode.TABLE, // This should eventually be removed
      },
    });
    expect(await screen.findByText('ENSMUSG00000029283')).toBeTruthy();
  });

  it('should render mapping to UniProtKB', async () => {
    customRender(<IDMappingResult />, {
      route: '/id-mapping/id2',
      initialUserPreferences: {
        'view-mode': ViewMode.TABLE, // This should eventually be removed
      },
    });
    expect(await screen.findByText('Q9Z0H0')).toBeTruthy();
  });
});
