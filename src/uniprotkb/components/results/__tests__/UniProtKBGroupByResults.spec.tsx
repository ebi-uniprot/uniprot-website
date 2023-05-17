import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import UniProtKBGroupByResults from '../UniProtKBGroupBy';

import customRender from '../../../../shared/__test-helpers__/customRender';

import data from '../../../__mocks__/uniProtKBViewData';

let rendered: ReturnType<typeof customRender>;

const mock = new MockAdapter(axios);

// mock
//   .onGet(/uniprotkb\/search\?query=%28taxonomy_id%3A10239%29&size=0/)
//   .reply(200, {}, { 'x-total-results': 5_392_017 });

mock.onGet(/uniprotkb\/view/).reply(200, data);

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
