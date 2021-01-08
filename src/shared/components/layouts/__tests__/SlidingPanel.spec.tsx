import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../../../__test-helpers__/RenderWithRouter';
import SlidingPanel, { Position } from '../SlidingPanel';

describe('SlidingPanel', () => {
  const onClickOutside = jest.fn();
  let rendered;

  beforeEach(() => {
    rendered = renderWithRouter(
      <>
        <div>outside</div>
        <SlidingPanel position={Position.right} onClickOutside={onClickOutside}>
          inside
        </SlidingPanel>
      </>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call onClickOutside when mouse clicks outside', async () => {
    const outside = rendered.getByText('outside');
    fireEvent.mouseDown(outside);
    expect(onClickOutside).toHaveBeenCalled();
  });
  test('should not call onClickOutside when mouse clicks inside', async () => {
    const inside = rendered.getByText('inside');
    fireEvent.mouseDown(inside);
    expect(onClickOutside).not.toHaveBeenCalled();
  });
});
