import { screen, fireEvent } from '@testing-library/react';

import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import HomePage from '../HomePage';

import useReducedMotion from '../../../shared/hooks/useReducedMotion';

jest.mock('../../../shared/hooks/useReducedMotion');

(useReducedMotion as jest.Mock).mockReturnValue(true);

let component: ReturnType<typeof renderWithRedux>;

describe('HomePage component', () => {
  beforeEach(() => {
    component = renderWithRedux(<HomePage />);
  });

  test('should render', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should change the text when selecting a different namespace', async () => {
    expect(
      screen.getByRole('heading', { name: 'Find your protein', exact: true })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'UniProtKB' }));
    fireEvent.click(screen.getByRole('button', { name: 'UniRef' }));
    expect(
      await screen.findByRole('heading', {
        name: 'Find your protein cluster',
        exact: true,
      })
    ).toBeInTheDocument();
  });
});
