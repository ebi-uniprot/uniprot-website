import { screen } from '@testing-library/react';
import { Namespace } from '../../../types/namespaces';

import renderWithRouter from '../../../__test-helpers__/RenderWithRouter';

import AccessionView from '../AccessionView';

describe('AccessionView', () => {
  it('should have icon when proteome type is reference', () => {
    renderWithRouter(
      <AccessionView
        id={'UPI'}
        entryType="Reference proteome"
        namespace={Namespace.proteomes}
      />
    );
    expect(screen.queryByTitle(/reference Proteome entry/)).toBeInTheDocument();
  });

  it('should not have icon when proteome type is not reference', () => {
    renderWithRouter(
      <AccessionView
        id={'UPI'}
        entryType="Other proteome"
        namespace={Namespace.proteomes}
      />
    );
    expect(
      screen.queryByTitle(/reference Proteome entry/)
    ).not.toBeInTheDocument();
  });
});
