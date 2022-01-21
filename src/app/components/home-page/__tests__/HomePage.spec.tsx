import { screen, fireEvent } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import HomePage from '../HomePage';

import { useReducedMotion } from '../../../../shared/hooks/useMatchMedia';

jest.mock('../../../../shared/hooks/useMatchMedia');

(useReducedMotion as jest.Mock).mockReturnValue(true);

let rendered: ReturnType<typeof customRender>;

describe('HomePage component', () => {
  beforeEach(() => {
    rendered = customRender(<HomePage />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
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
