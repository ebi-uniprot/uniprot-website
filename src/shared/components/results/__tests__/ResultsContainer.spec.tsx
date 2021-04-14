import { screen, fireEvent, act } from '@testing-library/react';

import Results from '../Results';

import customRender from '../../../__test-helpers__/customRender';

import '../../../../uniprotkb/components/__mocks__/mockApi';

// TODO: in this file, fix incorrect use of `act()` when wrapping everything

describe('Results component', () => {
  test('should select a facet', async () => {
    await act(async () => {
      const { history } = customRender(<Results />, {
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
      const { history } = customRender(<Results />, {
        route: '/uniprotkb?query=blah&facets=reviewed:false',
      });
      const unreviewedButton = await screen.findByText(
        'Unreviewed (TrEMBL) (455)'
      );
      fireEvent.click(unreviewedButton);
      expect(history.location.search).toEqual('?query=blah');
    });
  });

  // Testing the button, and testing the 2 views, this is probably enough
  test.skip('should toggle card view to table', async () => {
    await act(async () => {
      customRender(<Results />, { route: '/uniprotkb?query=blah' });
      const toggle = await screen.findByTestId('table-card-toggle');
      fireEvent.click(toggle);
      const table = await screen.findByText('Entry');
      expect(table).toBeInTheDocument();
    });
  });

  test('should display no results page', async () => {
    await act(async () => {
      customRender(<Results />, {
        route: '/uniprotkb?query=noresult',
      });

      const page = await screen.findByTestId('no-results-page');

      expect(page).toBeInTheDocument();
    });
  });
});
