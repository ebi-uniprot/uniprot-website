import { fireEvent, screen, within } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import ProteomesCard from '../ProteomesCard';

import proteomesData from '../../../__mocks__/proteomesEntryModelData';

describe('ProteomesCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(<ProteomesCard data={proteomesData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const { history } = customRender(<ProteomesCard data={proteomesData} />);
    fireEvent.click(within(screen.getByRole('heading')).getByRole('link'));
    expect(history.location.pathname).toMatch('/proteomes/UP000005640');
  });
});
