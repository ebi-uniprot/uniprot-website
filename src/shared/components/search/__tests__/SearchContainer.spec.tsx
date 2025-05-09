import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';
import { Namespace } from '../../../types/namespaces';
import SearchContainer from '../SearchContainer';

describe('Search component on home page', () => {
  let rendered: ReturnType<typeof customRender>;
  beforeEach(() => {
    rendered = customRender(
      <SearchContainer
        isOnHomePage
        searchspace={Namespace.uniprotkb}
        onSearchspaceChange={jest.fn()}
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

describe('Search component on results page', () => {
  const renderWithRoute = (route: string) => {
    customRender(
      <SearchContainer
        isOnHomePage={false}
        searchspace={Namespace.uniprotkb}
        onSearchspaceChange={jest.fn()}
      />,
      { route }
    );
  };
  it('should not display the job id when on a tools results page', () => {
    renderWithRoute('/id-mapping/uniparc/job123');
    expect(screen.getByLabelText('Text query in uniprotkb')).toHaveValue('');
  });
  it('should display the query when on a tools results page', () => {
    renderWithRoute('/id-mapping/uniparc/job123?query=foo');
    expect(screen.getByLabelText('Text query in uniprotkb')).toHaveValue('foo');
    expect(
      screen.getByRole('button', { name: 'Advanced' })
    ).toBeInTheDocument();
  });
});
