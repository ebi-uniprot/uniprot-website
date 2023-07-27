import { fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import UniProtKBGroupByResults from '../UniProtKBGroupBy';

import customRender from '../../../../shared/__test-helpers__/customRender';

import {
  taxonomyRoot,
  ecNonRoot,
  taxonomyCellularOrgranisms,
} from '../../../__mocks__/uniProtKBGroupByData';

let rendered: ReturnType<typeof customRender>;

const mock = new MockAdapter(axios);

mock
  .onGet(/\/uniprotkb\/groups\/taxonomy\?query=%28%2A%29/)
  .reply(200, taxonomyRoot)
  .onGet(/\/uniprotkb\/groups\/taxonomy\?parent=131567&query=%28%2A%29/)
  .reply(200, taxonomyCellularOrgranisms)
  .onGet(/\/uniprotkb\/groups\/ec/)
  .reply(200, ecNonRoot);

describe('UniProtKBGroupByResults component with taxonomy groups', () => {
  beforeEach(async () => {
    rendered = customRender(<UniProtKBGroupByResults total={123} />, {
      route: '/uniprotkb?groupBy=taxonomy&query=%2A',
    });
    expect(await screen.findByText(/cellular/)).toBeVisible();
  });

  it('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should open group when expand button is clicked', async () => {
    const expandButton = screen.getByTitle(
      'Reveal children of cellular organisms'
    );
    fireEvent.click(expandButton);
    expect(
      await screen.findByTitle('Hide children of cellular organisms')
    ).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByText(/Archaea/)).toBeVisible();
  });
});

describe('UniProtKBGroupByResults component with EC groups', () => {
  beforeEach(async () => {
    rendered = customRender(<UniProtKBGroupByResults total={123} />, {
      route: 'uniprotkb?groupBy=ec&parent=3.-.-.-&query=shadab',
    });
    expect(await screen.findByText(/Hydrolases/)).toBeVisible();
  });

  it('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });
});
