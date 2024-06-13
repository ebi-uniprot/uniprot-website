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

  it('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should change the text when selecting a different namespace', async () => {
    expect(
      await screen.findByRole('heading', { name: 'Find your protein' })
    ).toBeInTheDocument();
    fireEvent.click(await screen.findByRole('button', { name: /UniProtKB/ }));
    fireEvent.click(await screen.findByRole('button', { name: /UniRef/ }));
    expect(
      await screen.findByRole('heading', {
        name: 'Find your protein cluster',
      })
    ).toBeInTheDocument();
  });
});
