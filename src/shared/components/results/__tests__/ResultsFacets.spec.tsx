import { screen, fireEvent, waitFor } from '@testing-library/react';

import ResultsFacets from '../ResultsFacets';

import customRender from '../../../__test-helpers__/customRender';

import results from '../../../../uniprotkb/components/__mocks__/results';

describe('ResultsFacets', () => {
  const resultsFacets = (route: string) =>
    customRender(
      <ResultsFacets
        dataApiObject={{
          data: results,
          headers: {
            'x-total-results': results.results.length.toString(),
            link: '<https://link/to/next/results>; rel="next"',
          },
          loading: false,
          progress: 1,
          status: 200,
          statusText: '',
          url: 'https://link/to/results',
        }}
      />,
      {
        route,
      }
    );

  it('should render', () => {
    const { asFragment } = resultsFacets('/uniprotkb?query=blah');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should select a facet', async () => {
    const { history } = resultsFacets('/uniprotkb?query=blah');
    expect(history.location.search).toEqual('?query=blah');
    const unreviewedButton = await screen.findByRole('link', {
      name: /Unreviewed/i,
    });
    fireEvent.click(unreviewedButton);
    await waitFor(() => {
      expect(history.location.search).toEqual(
        '?query=blah&facets=reviewed%3Afalse'
      );
    });
  });

  it('should deselect a facet', async () => {
    const { history } = resultsFacets(
      '/uniprotkb?query=blah&facets=reviewed:false'
    );

    const unreviewedButton = await screen.findByRole('link', {
      name: /Unreviewed/i,
    });
    fireEvent.click(unreviewedButton);
    await waitFor(() => {
      expect(history.location.search).toEqual('?query=blah');
    });
  });
});
