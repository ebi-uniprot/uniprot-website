import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import KeywordsCard from '../KeywordsCard';

import keywordsData from '../../../__mocks__/keywordsModelData';

describe('KeywordsCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(
      <KeywordsCard data={keywordsData[0]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const { history } = customRender(
      <KeywordsCard data={keywordsData[0]} handleEntrySelection={handleClick} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    expect(history.location.pathname).not.toMatch('/keywords/KW-0021');
    fireEvent.click(screen.getByTestId('background-link'));
    expect(history.location.pathname).toMatch('/keywords/KW-0021');
  });
});
