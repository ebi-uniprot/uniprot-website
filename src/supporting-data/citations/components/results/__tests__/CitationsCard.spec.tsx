import { fireEvent, screen, within } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import CitationsCard from '../CitationsCard';

import citationData from '../../__mocks__/literatureCitationData';

describe('CitationsCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(
      <CitationsCard data={citationData['14702039']} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const { history } = customRender(
      <CitationsCard data={citationData['14702039']} />
    );
    fireEvent.click(within(screen.getByRole('heading')).getByRole('link'));
    expect(history.location.pathname).toMatch('/citations/14702039');
  });
});
