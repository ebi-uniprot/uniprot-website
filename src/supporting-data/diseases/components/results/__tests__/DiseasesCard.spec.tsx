import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import DiseasesCard from '../DiseasesCard';

import diseasesData from '../../../__mocks__/diseasesModelData';

describe('DiseasesCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(
      <DiseasesCard data={diseasesData[0]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const { history } = customRender(<DiseasesCard data={diseasesData[0]} />);
    fireEvent.click(screen.getByTestId('background-link'));
    expect(history.location.pathname).toMatch('/diseases/DI-00550');
  });
});
