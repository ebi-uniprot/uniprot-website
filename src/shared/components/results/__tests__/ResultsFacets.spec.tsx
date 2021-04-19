import { screen, fireEvent, waitFor } from '@testing-library/react';

import ResultsFacets from '../ResultsFacets';

import customRender from '../../../__test-helpers__/customRender';

import response, {
  url,
} from '../../../../uniprotkb/components/__mocks__/response';

const dataApiObject = {
  ...response,
  loading: false,
  progress: 1,
  status: 200,
  statusText: '',
  url,
};

describe('ResultsFacets', () => {
  const resultsFacets = (route: string) =>
    customRender(
      <ResultsFacets
        dataApiObject={dataApiObject}
        total={+response.headers['x-totalrecords']}
      />,
      {
        route,
      }
    );

  const regexUnreviewed = /Unreviewed \(TrEMBL\) \(\d+\)/;

  test('should select a facet', async () => {
    const { history } = resultsFacets('/uniprotkb?query=blah');
    expect(history.location.search).toEqual('?query=blah');
    const unreviewedButton = await screen.findByText(regexUnreviewed);
    fireEvent.click(unreviewedButton);
    await waitFor(() => {
      expect(history.location.search).toEqual(
        '?facets=reviewed%3Afalse&query=blah'
      );
    });
  });

  it('should deselect a facet', async () => {
    const { history } = resultsFacets(
      '/uniprotkb?query=blah&facets=reviewed:false'
    );

    const unreviewedButton = await screen.findByText(regexUnreviewed);
    fireEvent.click(unreviewedButton);
    await waitFor(() => {
      expect(history.location.search).toEqual('?query=blah');
    });
  });
});
