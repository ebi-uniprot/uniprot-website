import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import customRender from '../../__test-helpers__/customRender';
import useMatchMedia from '../../hooks/useMatchMedia';
import Toggletip from '../Toggletip';

jest.mock('../../hooks/useMatchMedia');

const mockUseMatchMedia = useMatchMedia as jest.Mock;

const LABEL = 'More info';
const CONTENT = 'Extra explanation about the thing.';

const renderToggletip = () =>
  customRender(<Toggletip content={CONTENT}>{LABEL}</Toggletip>);

// The visible bubble is the aria-hidden copy; it carries the `open` class only
// while shown. The screen-reader copy is exposed via aria-describedby instead.
const getBubble = (container: HTMLElement) =>
  container.querySelector('[aria-hidden="true"]');

describe('Toggletip', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('permanently associates the description with the trigger (aria-describedby)', () => {
    mockUseMatchMedia.mockReturnValue(false);
    renderToggletip();
    // Present on the trigger from the start, independent of visible state.
    expect(
      screen.getByRole('button', { name: LABEL })
    ).toHaveAccessibleDescription(CONTENT);
  });

  describe('click mode (no hover-capable pointer)', () => {
    beforeEach(() => {
      mockUseMatchMedia.mockReturnValue(false);
    });

    it('toggles the visible bubble on click', async () => {
      const user = userEvent.setup();
      const { container } = renderToggletip();
      const button = screen.getByRole('button', { name: LABEL });

      expect(getBubble(container)).not.toHaveClass('open');
      await user.click(button);
      expect(getBubble(container)).toHaveClass('open');
      await user.click(button);
      expect(getBubble(container)).not.toHaveClass('open');
    });

    it('dismisses on Escape', async () => {
      const user = userEvent.setup();
      const { container } = renderToggletip();

      await user.click(screen.getByRole('button', { name: LABEL }));
      expect(getBubble(container)).toHaveClass('open');
      await user.keyboard('{Escape}');
      expect(getBubble(container)).not.toHaveClass('open');
    });

    it('dismisses on outside click', async () => {
      const user = userEvent.setup();
      const { container } = renderToggletip();

      await user.click(screen.getByRole('button', { name: LABEL }));
      expect(getBubble(container)).toHaveClass('open');
      await user.click(document.body);
      expect(getBubble(container)).not.toHaveClass('open');
    });

    it('does not reveal on hover', () => {
      const { container } = renderToggletip();
      const button = screen.getByRole('button', { name: LABEL });

      fireEvent.mouseEnter(button.parentElement as Element);
      expect(getBubble(container)).not.toHaveClass('open');
    });
  });

  describe('hover mode (hover-capable pointer)', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      mockUseMatchMedia.mockReturnValue(true);
    });
    afterEach(() => {
      act(() => {
        jest.runOnlyPendingTimers();
      });
      jest.useRealTimers();
    });

    it('reveals on hover and hides shortly after leaving', () => {
      const { container } = renderToggletip();
      const wrapper = screen.getByRole('button', { name: LABEL })
        .parentElement as Element;

      fireEvent.mouseEnter(wrapper);
      expect(getBubble(container)).toHaveClass('open');

      fireEvent.mouseLeave(wrapper);
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(getBubble(container)).not.toHaveClass('open');
    });

    it('reveals on focus and hides on blur', () => {
      const { container } = renderToggletip();
      const button = screen.getByRole('button', { name: LABEL });

      fireEvent.focus(button);
      expect(getBubble(container)).toHaveClass('open');
      fireEvent.blur(button);
      expect(getBubble(container)).not.toHaveClass('open');
    });
  });
});
