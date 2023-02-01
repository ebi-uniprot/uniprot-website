import { screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';

import Entry from '../Entry';

import { LocationToPath, Location } from '../../../../app/config/urls';

import mockData from '../../__mocks__/helpEntryModelData';

const mock = new MockAdapter(axios);

mock.onGet(/api\/help\/canonical_and_isoforms/).reply(200, mockData);

jest.mock('../../../../shared/components/layouts/UniProtFooter', () => ({
  __esModule: true,
  default: () => '{{ Footer }}',
}));

describe('Help entry tests', () => {
  it('should render the Entry component', async () => {
    const { asFragment } = customRender(
      <Route path={LocationToPath[Location.HelpEntry]} component={Entry} />,
      {
        route: '/help/canonical_and_isoforms',
      }
    );
    await screen.findByText(mockData.title);
    expect(asFragment()).toMatchSnapshot();
  });
});
