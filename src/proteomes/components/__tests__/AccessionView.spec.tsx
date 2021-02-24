import { screen } from '@testing-library/react';

import renderWithRouter from '../../../shared/__test-helpers__/RenderWithRouter';

import AccessionView from '../AccessionView';

describe('AccessionView', () => {
  it('should have icon when proteome type is reference', () => {
    renderWithRouter(
      <AccessionView id={'UPI'} proteomeType="Reference proteome" />
    );
    expect(screen.queryByTitle(/reference Proteome entry/)).toBeInTheDocument();
  });

  it('should not have icon when proteome type is not reference', () => {
    renderWithRouter(
      <AccessionView id={'UPI'} proteomeType="Other proteome" />
    );
    expect(
      screen.queryByTitle(/reference Proteome entry/)
    ).not.toBeInTheDocument();
  });
});
