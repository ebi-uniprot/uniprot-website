import { screen, fireEvent } from '@testing-library/react';

import SlidingPanel, { Position } from '../SlidingPanel';

import customRender from '../../../__test-helpers__/customRender';

describe('SlidingPanel', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    customRender(
      <>
        <div>outside</div>
        <SlidingPanel position={Position.right} onClose={onClose}>
          inside
        </SlidingPanel>
      </>
    );
  });

  afterEach(jest.clearAllMocks);

  test('should call onClose when mouse clicks outside', async () => {
    const outside = screen.getByText('outside');
    fireEvent.click(outside);
    expect(onClose).toHaveBeenCalled();
  });

  test('should not call onClose when mouse clicks inside', async () => {
    const inside = screen.getByText('inside');
    fireEvent.click(inside);
    expect(onClose).not.toHaveBeenCalled();
  });
});
