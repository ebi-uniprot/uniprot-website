import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import { WrappedRow } from '../Wrapped';
import wrappedMocks from '../__mocks__/wrappedRowMocks.json';

describe('WrappedRow', () => {
  let onMSAFeatureClick = jest.fn();
  let setActiveId = jest.fn();
  it('should render', () => {
    const { asFragment } = renderWithRedux(
      <WrappedRow
        {...wrappedMocks}
        onMSAFeatureClick={onMSAFeatureClick}
        setActiveId={setActiveId}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
