import { screen, fireEvent, waitFor } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import HomePage from '../HomePage';

import { useReducedMotion } from '../../../../shared/hooks/useMatchMedia';

jest.mock('../../../../shared/hooks/useMatchMedia');

(useReducedMotion as jest.Mock).mockReturnValue(true);

jest.mock('../NonCritical', () => ({
  __esModule: true,
  default: () => '{{ NonCritical }}',
}));

jest.mock('../../../../shared/components/layouts/UniProtFooter', () => ({
  __esModule: true,
  default: () => '{{ UniProtFooter }}',
}));

let rendered: ReturnType<typeof customRender>;

describe('HomePage component', () => {
  beforeEach(async () => {
    rendered = customRender(<HomePage />);

    // wait for the unrelated async components to load
    await waitFor(() => {
      screen.getByText('{{ NonCritical }}');
      screen.getByText('{{ UniProtFooter }}');
    });

    // Main search
    expect(await screen.findByRole('searchbox')).toBeInTheDocument();
  });

  it('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should change the text when selecting a different namespace', async () => {
    expect(
      screen.getByRole('heading', { name: 'Find your protein' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /UniProtKB/ }));
    fireEvent.click(screen.getByRole('button', { name: /UniRef/ }));
    expect(
      await screen.findByRole('heading', {
        name: 'Find your protein cluster',
      })
    ).toBeInTheDocument();
  });
});
