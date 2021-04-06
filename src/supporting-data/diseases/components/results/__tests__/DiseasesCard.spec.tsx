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

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const { history } = customRender(
      <DiseasesCard data={diseasesData[0]} handleEntrySelection={handleClick} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(history.location.pathname).toMatch('/diseases/DI-00550');
  });
});
