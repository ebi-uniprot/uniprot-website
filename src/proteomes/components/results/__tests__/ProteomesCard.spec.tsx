import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';
import ProteomesCard from '../ProteomesCard';

import proteomesData from '../../../__mocks__/proteomesEntryModelData';
import { fireEvent, screen } from '@testing-library/react';

describe('ProteomesCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = renderWithRouter(
      <ProteomesCard data={proteomesData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection', () => {
    const handleClick = jest.fn();
    const { getByTestId } = renderWithRouter(
      <ProteomesCard data={proteomesData} handleEntrySelection={handleClick} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
  });
});
