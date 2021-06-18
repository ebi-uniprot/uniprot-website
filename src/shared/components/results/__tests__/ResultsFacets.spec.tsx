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
            'x-total-records': results.results.length.toString(),
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

  test('should render', () => {
    const { asFragment } = resultsFacets('/uniprotkb?query=blah');
    expect(asFragment()).toMatchSnapshot();
  });

  test('should select a facet', async () => {
    const { history } = resultsFacets('/uniprotkb?query=blah');
    expect(history.location.search).toEqual('?query=blah');
    const unreviewedButton = await screen.findByRole('link', {
      name: /Unreviewed/i,
    });
    fireEvent.click(unreviewedButton);
    await waitFor(() => {
      expect(history.location.search).toEqual(
        '?facets=reviewed%3Afalse&query=blah'
      );
    });
  });

  test('should deselect a facet', async () => {
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
