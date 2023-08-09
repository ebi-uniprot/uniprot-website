import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import DatatableWrapper from '../DatatableWrapper';

describe('DatatableWrapper component', () => {
  it('should render with a working toggle button', async () => {
    const { asFragment } = customRender(
      <DatatableWrapper>
        <table />
      </DatatableWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
    const button = screen.getByRole('button', { name: /Expand/ });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(
      await screen.findByRole('button', { name: /Collapse/ })
    ).toBeInTheDocument();
  });

  it('should not render a toggle button if overriden', async () => {
    const { asFragment } = customRender(
      <DatatableWrapper alwaysExpanded>
        <table />
      </DatatableWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
