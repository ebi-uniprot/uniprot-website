import { fireEvent, screen } from '@testing-library/react';

import renderWithRouter from '../../../../../shared/__test-helpers__/RenderWithRouter';
import CitationCard from '../CitationCard';

import citationData from '../../__mocks__/literatureCitationData';

describe('CitationCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = renderWithRouter(
      <CitationCard data={citationData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const { history } = renderWithRouter(
      <CitationCard data={citationData} handleEntrySelection={handleClick} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    fireEvent.click(screen.getAllByRole('button')[0]);
    const {
      location: { pathname },
    } = history;
    expect(history.location.pathname).toMatch('/citations/14702039');
  });
});
