import { fireEvent, screen } from '@testing-library/react';

import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';
import ProteomesCard from '../ProteomesCard';

import proteomesData from '../../../__mocks__/proteomesEntryModelData';

describe('ProteomesCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = renderWithRouter(
      <ProteomesCard data={proteomesData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const { history } = renderWithRouter(
      <ProteomesCard data={proteomesData} handleEntrySelection={handleClick} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button'));
    const {
      location: { pathname },
    } = history;
    expect(pathname).toMatch('/proteomes/UP000005640');
  });
});
