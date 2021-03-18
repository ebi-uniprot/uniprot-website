import customRender from '../../../shared/__test-helpers__/customRender';

import { WrappedRow } from '../Wrapped';
import wrappedMocks from '../__mocks__/wrappedRowMocks.json';

describe('WrappedRow', () => {
  const onMSAFeatureClick = jest.fn();
  const setActiveId = jest.fn();
  it('should render', () => {
    const { asFragment } = customRender(
      <WrappedRow
        {...wrappedMocks}
        onMSAFeatureClick={onMSAFeatureClick}
        setActiveId={setActiveId}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
