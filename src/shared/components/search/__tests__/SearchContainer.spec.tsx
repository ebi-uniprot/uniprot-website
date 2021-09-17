import { screen, fireEvent } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import SearchContainer from '../SearchContainer';

import { Namespace } from '../../../types/namespaces';

let rendered: ReturnType<typeof customRender>;

describe('Search shallow components', () => {
  beforeEach(() => {
    rendered = customRender(
      <SearchContainer
        isOnHomePage
        namespace={Namespace.uniprotkb}
        onNamespaceChange={jest.fn()}
      />
    );
  });

  it('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should change the search text when clicking on a suggestion', () => {
    expect(screen.queryByDisplayValue('Insulin')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Insulin' }));
    expect(screen.getByDisplayValue('Insulin')).toBeInTheDocument();
  });
});
