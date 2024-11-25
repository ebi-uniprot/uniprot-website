import { screen, act } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import XRefsSection from '../XRefsSection';

import useDataApi from '../../../../shared/hooks/useDataApi';
import usePagination from '../../../../shared/hooks/usePagination';

import uniParcData from '../../../__mocks__/uniParcLightEntryModelData';
import uniparcXrefsData from '../../../__mocks__/uniparcXrefsModelData';

jest.mock('../../../../shared/hooks/useDataApi');
jest.mock('../../../../shared/hooks/usePagination');

describe('XrefSection component', () => {
  it('should render the xref table properly and match snapshot', async () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: [],
    });
    (usePagination as jest.Mock).mockReturnValue({
      allResults: uniparcXrefsData.results,
      initialLoading: false,
      progress: 1,
      hasMoreData: true,
      handleLoadMoreRows: jest.fn(),
      total: 3,
    });
    const { asFragment } = customRender(
      <XRefsSection entryData={uniParcData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show no results message when there are no cross-references', async () => {
    (usePagination as jest.Mock).mockReturnValue({
      allResults: [],
      initialLoading: false,
      progress: 1,
      hasMoreData: false,
      handleLoadMoreRows: jest.fn(),
      total: 0,
      status: 503,
    });
    await act(async () => {
      customRender(<XRefsSection entryData={uniParcData} />);
    });

    expect(
      screen.getByText('Sorry, no results were found!')
    ).toBeInTheDocument();
  });
});
