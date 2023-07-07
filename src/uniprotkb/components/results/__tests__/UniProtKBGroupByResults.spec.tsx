import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import UniProtKBGroupByResults from '../UniProtKBGroupBy';

import customRender from '../../../../shared/__test-helpers__/customRender';

import { noParent } from '../../../__mocks__/uniProtKBGroupByData';

let rendered: ReturnType<typeof customRender>;

const mock = new MockAdapter(axios);

mock.onGet(/uniprotkb\/groups/).reply(200, noParent);

describe('UniProtKBGroupByResults component', () => {
  beforeEach(async () => {
    rendered = customRender(<UniProtKBGroupByResults total={123} />);
    expect(await screen.findByText(/cellular/)).toBeVisible();
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });
});
