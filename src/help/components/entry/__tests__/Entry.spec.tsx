import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Route } from 'react-router-dom';

import { Location, LocationToPath } from '../../../../app/config/urls';
import customRender from '../../../../shared/__test-helpers__/customRender';
import mockData from '../../__mocks__/helpEntryModelData';
import Entry from '../Entry';

const mock = new MockAdapter(axios);

mock.onGet(/api\/help\/canonical_and_isoforms/).reply(200, mockData);

const footerMock = '{{ Footer }}';

jest.mock('../../../../shared/components/layouts/UniProtFooter', () => ({
  __esModule: true,
  default: () => footerMock,
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
    await screen.findByText(footerMock);
    expect(asFragment()).toMatchSnapshot();
  });
});
