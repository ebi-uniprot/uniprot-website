import { fireEvent, screen } from '@testing-library/react';

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

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const { history } = customRender(
      <DatabaseCard data={databaseData[0]} handleEntrySelection={handleClick} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    expect(history.location.pathname).not.toMatch('/database/DB-0022');
    fireEvent.click(screen.getByTestId('background-link'));
    expect(history.location.pathname).toMatch('/database/DB-0022');
  });
});
