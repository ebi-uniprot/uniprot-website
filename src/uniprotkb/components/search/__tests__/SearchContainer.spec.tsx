import { screen, fireEvent } from '@testing-library/react';

import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

import SearchContainer from '../SearchContainer';

import { Namespace } from '../../../../shared/types/namespaces';

let component;

describe('Search shallow components', () => {
  beforeEach(() => {
    component = renderWithRouter(
      <SearchContainer
        includeFooter
        namespace={Namespace.uniprotkb}
        onNamespaceChange={() => {}}
      />
    );
  });

  it('should render', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should change the search text when clicking on a suggestion', () => {
    expect(screen.queryByDisplayValue('Albumin')).not.toBeInTheDocument();
    fireEvent.click(screen.queryByRole('button', { name: 'Albumin' }));
    expect(screen.getByDisplayValue('Albumin')).toBeInTheDocument();
  });
});
