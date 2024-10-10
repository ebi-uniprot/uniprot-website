import { screen } from '@testing-library/react';
import customRender from '../../../shared/__test-helpers__/customRender';

import { WrappedRow, WrappedRowProps } from '../Wrapped';

import wrappedMocks from '../__mocks__/wrappedRowMocks.json';

describe('WrappedRow', () => {
  const onMSAFeatureClick = jest.fn();
  const setActiveId = jest.fn();
  it('should render', async () => {
    const props = {
      ...wrappedMocks,
      onMSAFeatureClick,
      setActiveId,
    } as WrappedRowProps;
    const { asFragment } = customRender(<WrappedRow {...props} />);
    await screen.findByText('P05066');
    expect(asFragment()).toMatchSnapshot();
  });
});
