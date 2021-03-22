import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import ProteomesCard from '../ProteomesCard';

import proteomesData from '../../../__mocks__/proteomesEntryModelData';

describe('ProteomesCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(
      <ProteomesCard data={proteomesData} handleEntrySelection={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const { history } = customRender(
      <ProteomesCard data={proteomesData} handleEntrySelection={handleClick} />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button'));
    expect(history.location.pathname).toMatch('/proteomes/UP000005640');
  });
});
