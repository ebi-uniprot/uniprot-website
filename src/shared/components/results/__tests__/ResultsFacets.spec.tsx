import { screen, fireEvent, act } from '@testing-library/react';

import ResultsFacets from '../ResultsFacets';

import customRender from '../../../__test-helpers__/customRender';

import '../../../../uniprotkb/components/__mocks__/mockApi';

// TODO: in this file, fix incorrect use of `act()` when wrapping everything

describe('Results component', () => {
  test('should select a facet', async () => {
    await act(async () => {
      const { history } = customRender(<ResultsFacets />, {
        route: '/uniprotkb?query=blah',
      });
      expect(history.location.search).toEqual('?query=blah');
      const unreviewedButton = await screen.findByText(
        'Unreviewed (TrEMBL) (455)'
      );
      fireEvent.click(unreviewedButton);
      expect(history.location.search).toEqual(
        '?facets=reviewed%3Afalse&query=blah'
      );
    });
  });

  test.skip('should deselect a facet', async () => {
    await act(async () => {
      const { history } = customRender(<ResultsFacets />, {
        route: '/uniprotkb?query=blah&facets=reviewed:false',
      });
      const unreviewedButton = await screen.findByText(
        'Unreviewed (TrEMBL) (455)'
      );
      fireEvent.click(unreviewedButton);
      expect(history.location.search).toEqual('?query=blah');
    });
  });
});
