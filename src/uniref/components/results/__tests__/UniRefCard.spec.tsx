import { fireEvent, screen, within } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import UniRefCard from '../UniRefCard';

import { UniRefLiteAPIModel } from '../../../adapters/uniRefConverter';

import data from '../../../__mocks__/uniRefResultsData';

describe('UniRefCard tests', () => {
  it('should render and match snapshot', () => {
    const row = data.results[0];
    const { asFragment } = customRender(
      <UniRefCard data={row as UniRefLiteAPIModel} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const row = data.results[0];
    const { history } = customRender(
      <UniRefCard data={row as UniRefLiteAPIModel} />
    );
    fireEvent.click(within(screen.getByRole('heading')).getByRole('link'));
    expect(history.location.pathname).toMatch('/uniref/UniRef50_A0A3E1E969');
  });
});
