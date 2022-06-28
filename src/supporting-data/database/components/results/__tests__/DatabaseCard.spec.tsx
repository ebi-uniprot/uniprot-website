import { fireEvent, screen, within } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import DatabaseCard from '../DatabaseCard';

import databaseData from '../../../__mocks__/databaseModelData';

describe('DatabaseCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(
      <DatabaseCard data={databaseData[0]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const { history } = customRender(<DatabaseCard data={databaseData[0]} />);
    fireEvent.click(within(screen.getByRole('heading')).getByRole('link'));
    expect(history.location.pathname).toMatch('/database/DB-0022');
  });
});
