import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

import UniRefCard from '../UniRefCard';

import data from '../../../__mocks__/UniRefResultsData';

describe('UniRefCard tests', () => {
  it('should render and match snapshot', () => {
    const row = data.results[0];
    const { asFragment } = renderWithRouter(
      <UniRefCard data={row} handleEntrySelection={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const row = data.results[0];
    const { history } = renderWithRouter(
      <UniRefCard data={row} handleEntrySelection={handleClick} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button'));
    expect(history.location.pathname).toMatch('/uniref/UniRef100_A0A0B7GQ86');
  });
});
