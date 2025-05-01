import { fireEvent, screen, within } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import locationsData from '../../../__mocks__/locationsModelData';
import LocationsCard from '../LocationsCard';

describe('CitationCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(
      <LocationsCard data={locationsData[0]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const { history } = customRender(<LocationsCard data={locationsData[0]} />);
    fireEvent.click(within(screen.getByRole('heading')).getByRole('link'));
    expect(history.location.pathname).toMatch('/locations/SL-0037');
  });
});
