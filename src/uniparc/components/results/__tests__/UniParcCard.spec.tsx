import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import UniParcCard from '../UniParcCard';

import { UniParcAPIModel } from '../../../adapters/uniParcConverter';

import data from '../../../__mocks__/uniParcEntryModelData';

describe('UniRefCard tests', () => {
  it('should render and match snapshot', () => {
    const { asFragment } = customRender(
      <UniParcCard data={data as UniParcAPIModel} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const { history } = customRender(
      <UniParcCard data={data as UniParcAPIModel} />
    );
    fireEvent.click(screen.getByTestId('background-link'));
    expect(history.location.pathname).toMatch('/uniparc/UPI0000000001');
  });
});
