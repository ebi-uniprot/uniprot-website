import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import LocationsCard from '../LocationsCard';

import locationsData from '../../../__mocks__/locationsModelData';

describe('CitationCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(
      <LocationsCard data={locationsData[0]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const { history } = customRender(
      <LocationsCard
        data={locationsData[0]}
        handleEntrySelection={handleClick}
      />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    expect(history.location.pathname).not.toMatch('/locations/SL-0099');
    fireEvent.click(screen.getByTestId('background-link'));
    expect(history.location.pathname).toMatch('/locations/SL-0099');
  });
});
