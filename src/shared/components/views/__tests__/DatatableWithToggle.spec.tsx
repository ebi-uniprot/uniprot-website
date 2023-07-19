import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import DatatableWithToggle from '../DatatableWithToggle';

describe('DatatableWithToggle component', () => {
  it('should render with a working toggle button', async () => {
    const { asFragment } = customRender(
      <DatatableWithToggle>
        <table />
      </DatatableWithToggle>
    );
    expect(asFragment()).toMatchSnapshot();
    const button = screen.getByRole('button', { name: /Expand/ });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(
      await screen.findByRole('button', { name: /Collapse/ })
    ).toBeInTheDocument();
  });
});
