import customRender from '../../../shared/__test-helpers__/customRender';

import { WrappedRow, WrappedRowProps } from '../Wrapped';

import wrappedMocks from '../__mocks__/wrappedRowMocks.json';

describe('WrappedRow', () => {
  const onMSAFeatureClick = jest.fn();
  const setActiveId = jest.fn();
  it('should render', () => {
    const props = {
      ...wrappedMocks,
      onMSAFeatureClick,
      setActiveId,
    } as WrappedRowProps;
    const { asFragment } = customRender(<WrappedRow {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
