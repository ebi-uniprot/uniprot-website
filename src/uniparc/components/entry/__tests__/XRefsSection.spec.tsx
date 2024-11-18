import customRender from '../../../../shared/__test-helpers__/customRender';

import XRefsSection from '../XRefsSection';

import useDataApi from '../../../../shared/hooks/useDataApi';

import uniParcData from '../../../__mocks__/uniParcLightEntryModelData';
import uniparcXrefsData from '../../../__mocks__/uniparcXrefsModelData';

jest.mock('../../../../shared/hooks/useDataApi');

describe('XrefSection component', () => {
  it('should render the xref table properly and match snapshot', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: [],
    });
    const { asFragment } = customRender(
      <XRefsSection
        entryData={uniParcData}
        xRefData={{
          allResults: uniparcXrefsData.results,
          initialLoading: false,
          progress: 1,
          hasMoreData: true,
          handleLoadMoreRows: jest.fn(),
          total: 3,
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should return null when there are no cross-references (shouldn't happen)", () => {
    const { container } = customRender(
      <XRefsSection
        entryData={uniParcData}
        xRefData={{
          allResults: [],
          initialLoading: false,
          progress: 1,
          hasMoreData: false,
          handleLoadMoreRows: jest.fn(),
          total: 0,
        }}
      />
    );
    const table = container.querySelector('.overflow-y-container');
    expect(table).toBeEmptyDOMElement();
  });
});
