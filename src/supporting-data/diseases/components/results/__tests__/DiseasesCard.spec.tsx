import { fireEvent, screen, within } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import diseasesData from '../../../__mocks__/diseasesModelData';
import DiseasesCard from '../DiseasesCard';

describe('DiseasesCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(
      <DiseasesCard data={diseasesData[0]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const { history } = customRender(<DiseasesCard data={diseasesData[0]} />);
    fireEvent.click(within(screen.getByRole('heading')).getByRole('link'));
    expect(history.location.pathname).toMatch('/diseases/DI-01559');
  });
});
