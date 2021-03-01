import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

import XRefsSection from '../XRefsSection';

import useDataApi from '../../../../shared/hooks/useDataApi';

import uniParcData from '../../../__mocks__/entryModelData';

jest.mock('../../../../shared/hooks/useDataApi');

describe('SequenceSection component', () => {
  test('should render the SequenceSection properly and match snapshot', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: [],
    });
    const { asFragment } = renderWithRouter(
      <XRefsSection xrefData={{ data: uniParcData, loading: false }} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should return null when there are no cross-references (shouldn't happen)", () => {
    const { container } = renderWithRouter(
      <XRefsSection
        xrefData={{
          data: { ...uniParcData, uniParcCrossReferences: [] },
          loading: false,
        }}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});
