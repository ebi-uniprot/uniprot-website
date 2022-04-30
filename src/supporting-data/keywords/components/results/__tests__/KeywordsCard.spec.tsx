import { fireEvent, screen, within } from '@testing-library/react';

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

  it('should allow card navigation', () => {
    const { history } = customRender(<KeywordsCard data={keywordsData[0]} />);
    fireEvent.click(within(screen.getByRole('heading')).getByRole('link'));
    expect(history.location.pathname).toMatch('/keywords/KW-0021');
  });
});
