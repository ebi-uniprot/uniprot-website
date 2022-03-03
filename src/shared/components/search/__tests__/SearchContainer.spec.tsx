import { screen, fireEvent, waitFor } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import SearchContainer from '../SearchContainer';

import { Namespace } from '../../../types/namespaces';

describe('Search shallow components on home page', () => {
  let rendered: ReturnType<typeof customRender>;
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

describe('Search shallow components on results page', () => {
  const getSearchQueryWithRoute = (route: string) => {
    customRender(
      <SearchContainer
        isOnHomePage={false}
        namespace={Namespace.uniprotkb}
        onNamespaceChange={jest.fn()}
      />,
      { route }
    );
    return screen.getByLabelText('Text query in uniprotkb');
  };
  it('should display the job id when on a tools results page', () => {
    const input = getSearchQueryWithRoute('/id-mapping/uniparc/job123');
    expect(input).toHaveValue('job:job123');
  });
  it('should display the job id and query when on a tools results page', () => {
    const input = getSearchQueryWithRoute(
      '/id-mapping/uniparc/job123?query=foo'
    );
    expect(input).toHaveValue('job:job123 AND foo');
  });
});
