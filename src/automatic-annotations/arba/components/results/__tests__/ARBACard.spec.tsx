import { fireEvent, screen, within } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import ARBACard from '../ARBACard';

import arbaData from '../../../__mocks__/arbaModelData';

describe('ARBACard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(<ARBACard data={arbaData[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const { history } = customRender(<ARBACard data={arbaData[0]} />);
    fireEvent.click(within(screen.getByRole('heading')).getByRole('link'));
    expect(history.location.pathname).toMatch('/arba/ARBA00020180');
  });
});
