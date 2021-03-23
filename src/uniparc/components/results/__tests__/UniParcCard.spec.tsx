import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import UniParcCard from '../UniParcCard';

import { UniParcAPIModel } from '../../../adapters/uniParcConverter';

import data from '../../../__mocks__/entryModelData';

describe('UniRefCard tests', () => {
  it('should render and match snapshot', () => {
    const { asFragment } = customRender(
      <UniParcCard
        data={data as UniParcAPIModel}
        handleEntrySelection={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const { history } = customRender(
      <UniParcCard
        data={data as UniParcAPIModel}
        handleEntrySelection={handleClick}
      />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(history.location.pathname).toMatch('/uniparc/UPI0000000001');
  });
});
