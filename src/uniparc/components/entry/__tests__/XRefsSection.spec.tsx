import customRender from '../../../../shared/__test-helpers__/customRender';
import useDataApi from '../../../../shared/hooks/useDataApi';
import usePagination from '../../../../shared/hooks/usePagination';
import uniParcData from '../../../__mocks__/uniParcLightEntryModelData';
import uniparcXrefsData from '../../../__mocks__/uniparcXrefsModelData';
import XRefsSection from '../XRefsSection';

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
});
