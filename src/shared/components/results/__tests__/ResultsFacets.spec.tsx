import { screen, fireEvent, waitFor } from '@testing-library/react';

import ResultsFacets from '../ResultsFacets';

import customRender from '../../../__test-helpers__/customRender';

import '../../../../uniprotkb/components/__mocks__/mockApi';

describe('ResultsFacets', () => {
  test('should select a facet', async () => {
    const { history } = customRender(<ResultsFacets />, {
      route: '/uniprotkb?query=blah',
    });
    expect(history.location.search).toEqual('?query=blah');
    const unreviewedButton = await screen.findByText(
      'Unreviewed (TrEMBL) (455)'
    );
    fireEvent.click(unreviewedButton);
    await waitFor(() => {
      expect(history.location.search).toEqual(
        '?facets=reviewed%3Afalse&query=blah'
      );
    });
  });

  it('should deselect a facet', async () => {
    const { history } = customRender(<ResultsFacets />, {
      route: '/uniprotkb?query=blah&facets=reviewed:false',
    });
    const unreviewedButton = await screen.findByText(
      'Unreviewed (TrEMBL) (455)'
    );
    fireEvent.click(unreviewedButton);
    await waitFor(() => {
      expect(history.location.search).toEqual('?query=blah');
    });
  });
});
