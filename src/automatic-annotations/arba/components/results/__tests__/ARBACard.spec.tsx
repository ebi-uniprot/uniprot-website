import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import ARBACard from '../ARBACard';

import arbaData from '../../../__mocks__/arbaModelData';

describe('ARBACard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(<ARBACard data={arbaData[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const { history } = customRender(
      <ARBACard data={arbaData[0]} handleEntrySelection={handleClick} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    expect(history.location.pathname).not.toMatch('/arba/ARBA00013665');
    fireEvent.click(screen.getByTestId('background-link'));
    expect(history.location.pathname).toMatch('/arba/ARBA00013665');
  });
});
