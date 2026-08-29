import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import customRender from '../../../../shared/__test-helpers__/customRender';
import useDataApi from '../../../../shared/hooks/useDataApi';
import usePagination from '../../../../shared/hooks/usePagination';
import uniParcData from '../../../__mocks__/uniParcLightEntryModelData';
import uniparcXrefsData from '../../../__mocks__/uniparcXrefsModelData';
import allDatabases from '../../sub-entry/__tests__/__mocks__/allDatabases';
import XRefsSection from '../XRefsSection';

jest.mock('../../../../shared/hooks/useDataApi');
jest.mock('../../../../shared/hooks/usePagination');

// What UniProtKB reports about the mock's obsolete TrEMBL cross-references.
// Between them these cover every destination the Links column can pick; the
// remaining obsolete rows (A0A2I2MDI1, A0A7I8V511, G0XTE8) are deliberately
// left out so the unresolved fallback is covered too.
const obsoleteEntries = {
  results: [
    {
      primaryAccession: 'Q6RZL4',
      entryType: 'Inactive',
      inactiveReason: {
        inactiveReasonType: 'MERGED',
        mergeDemergeTo: ['P07612'],
      },
    },
    {
      primaryAccession: 'Q76QK2',
      entryType: 'Inactive',
      inactiveReason: {
        inactiveReasonType: 'DEMERGED',
        mergeDemergeTo: ['P07612', 'Q71TT2'],
      },
    },
    {
      primaryAccession: 'Q76ZT7',
      entryType: 'Inactive',
      inactiveReason: {
        inactiveReasonType: 'DELETED',
        deletedReason: 'Redundant sequence',
      },
    },
    // The xref says inactive but UniProtKB still has it: the xref `active` flag
    // lags behind UniProtKB, so this happens in real data.
    {
      primaryAccession: 'Q0GNZ6',
      entryType: 'UniProtKB unreviewed (TrEMBL)',
    },
  ],
};

const loadedXrefs = {
  allResults: uniparcXrefsData.results,
  initialLoading: false,
  progress: 1,
  hasMoreData: true,
  handleLoadMoreRows: jest.fn(),
  total: 3,
};

describe('XrefSection component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // The database list has to be populated, otherwise every non-UniProtKB
    // identifier falls through to an unlinked cell and neither the sub-entry
    // nor the external-link branch of the "Go to" column renders. The UniProtKB
    // search is what tells that column where each obsolete TrEMBL row leads.
    (useDataApi as jest.Mock).mockImplementation((url?: string | null) => ({
      loading: false,
      data: url?.includes('/uniprotkb/search') ? obsoleteEntries : allDatabases,
    }));
    (usePagination as jest.Mock).mockReturnValue(loadedXrefs);
  });

  it('should render the xref table properly and match snapshot', async () => {
    const { asFragment } = customRender(
      <XRefsSection entryData={uniParcData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should return null when there are no cross-references (shouldn't happen)", () => {
    (usePagination as jest.Mock).mockReturnValue({
      allResults: [],
      initialLoading: false,
      progress: 1,
      hasMoreData: false,
      handleLoadMoreRows: jest.fn(),
      total: 0,
    });
    const { container } = customRender(
      <XRefsSection entryData={uniParcData} />
    );
    const table = container.querySelector('.overflow-y-container');
    expect(table).toBeEmptyDOMElement();
  });

  // The element the tooltips attach to only exists once the loader has gone, so
  // this has to go through the loading state to be worth anything.
  describe('column header tooltips', () => {
    const renderAfterLoading = () => {
      (usePagination as jest.Mock).mockReturnValue({
        ...loadedXrefs,
        initialLoading: true,
      });
      const { rerender } = customRender(
        <XRefsSection entryData={uniParcData} />
      );
      expect(
        screen.queryByRole('columnheader', { name: 'Go to' })
      ).not.toBeInTheDocument();
      (usePagination as jest.Mock).mockReturnValue(loadedXrefs);
      rerender(<XRefsSection entryData={uniParcData} />);
      return screen.getByRole('columnheader', { name: 'Go to' });
    };

    it('shows the tooltip on hover', async () => {
      const header = renderAfterLoading();

      await userEvent.hover(header);

      expect(
        await screen.findByText('Where this cross-reference can be opened.')
      ).toBeInTheDocument();
    });

    // The tooltip is the only place a column's meaning is written down, so it
    // can't be mouse-only
    it('shows the tooltip on keyboard focus', async () => {
      const header = renderAfterLoading();

      // A `th` isn't focusable on its own, so without this the focus handler
      // could never be reached
      expect(header).toHaveAttribute('tabindex', '0');
      header.focus();

      expect(
        await screen.findByText('Where this cross-reference can be opened.')
      ).toBeInTheDocument();
    });

    it('dismisses an open tooltip when the table goes away', async () => {
      const header = renderAfterLoading();
      header.focus();
      await screen.findByRole('tooltip');

      cleanup();

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
