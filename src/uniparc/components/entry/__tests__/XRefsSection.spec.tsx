import customRender from '../../../../shared/__test-helpers__/customRender';

import XRefsSection from '../XRefsSection';

import useDataApi from '../../../../shared/hooks/useDataApi';

import uniParcData from '../../../__mocks__/uniParcEntryModelData';

jest.mock('../../../../shared/hooks/useDataApi');

describe('SequenceSection component', () => {
  it('should render the SequenceSection properly and match snapshot', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: [],
    });
    const { asFragment } = customRender(
      <XRefsSection xrefData={{ data: uniParcData, loading: false }} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should return null when there are no cross-references (shouldn't happen)", () => {
    const { container } = customRender(
      <XRefsSection
        xrefData={{
          data: { ...uniParcData, uniParcCrossReferences: [] },
          loading: false,
        }}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
