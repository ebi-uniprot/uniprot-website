import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import CitationCard from '../CitationsCard';

import citationData from '../../__mocks__/literatureCitationData';

describe('CitationCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(<CitationCard data={citationData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const { history } = customRender(
      <CitationCard data={citationData} handleEntrySelection={handleClick} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(history.location.pathname).toMatch('/citations/14702039');
  });
});
