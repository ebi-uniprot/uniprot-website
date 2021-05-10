import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import CitationsCard from '../CitationsCard';

import citationData from '../../__mocks__/literatureCitationData';

describe('CitationsCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(<CitationsCard data={citationData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const { history } = customRender(
      <CitationsCard data={citationData} handleEntrySelection={handleClick} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    expect(history.location.pathname).not.toMatch('/citations/14702039');
    fireEvent.click(screen.getByTestId('background-link'));
    expect(history.location.pathname).toMatch('/citations/14702039');
  });
});
