import cn from 'classnames';
import { type ReactNode, useEffect, useId, useRef, useState } from 'react';

import useMatchMedia from '../hooks/useMatchMedia';
import styles from './styles/toggletip.module.scss';

// Grace period before hiding on a hover device, so the pointer can travel from
// the trigger onto the bubble without it vanishing (WCAG 1.4.13 "hoverable").
const HIDE_DELAY = 100;

// True hover is only offered where there is a precise pointer (mouse/trackpad).
// Touch-primary devices (phones, tablets) report false and fall back to click,
// since hover does not meaningfully exist there.
const HOVER_CAPABLE_QUERY = '(hover: hover) and (pointer: fine)';

type ToggletipProps = {
  // Short, NON-INTERACTIVE explanatory text. It is exposed to assistive tech via
  // aria-describedby, so it must be plain text — links/buttons placed here would
  // be unreachable inside the description.
  content: ReactNode;
  // The visible trigger — rendered as an inline, underlined button.
  children: ReactNode;
  // Optional extra class for the inline wrapper, e.g. spacing at the call site.
  className?: string;
};

// Short explanatory popup that replaces inaccessible native `title` tooltips.
// The description is permanently associated with the trigger via aria-describedby,
// so screen readers announce it deterministically on focus — no reliance on a
// fragile live region. Sighted users additionally get a visible bubble that adapts
// to the input device: a transient tooltip on hover-capable devices (reveal on
// hover/focus, dismiss on mouse-out/blur) and a tap-to-toggle popup on touch.
// Escape or an outside click dismisses it. The trigger is a real <button> with a
// dotted-underline + `cursor: help` affordance. Meets WCAG 1.4.13 / 2.1.1 / 4.1.2.
const Toggletip = ({ content, children, className }: ToggletipProps) => {
  const canHover = useMatchMedia(HOVER_CAPABLE_QUERY);
  const descriptionId = useId();
  // Tracked per input modality, so losing one (e.g. mouse-out while still
  // focused) doesn't hide what the other is still asserting.
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tapped, setTapped] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const open = hovered || focused || tapped;

  const clearHide = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
  };
  const showHover = () => {
    clearHide();
    setHovered(true);
  };
  const scheduleHoverHide = () => {
    clearHide();
    hideTimeout.current = setTimeout(() => setHovered(false), HIDE_DELAY);
  };

  // Dismiss on Escape / outside-click while open (WCAG 1.4.13 dismissable).
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const dismiss = () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }
      setHovered(false);
      setFocused(false);
      setTapped(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dismiss();
      }
    };
    const onOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dismiss();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onOutsideClick);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onOutsideClick);
    };
  }, [open]);

  // Drop any pending timer on unmount.
  useEffect(
    () => () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    },
    []
  );

  return (
    <span
      ref={containerRef}
      className={cn(styles.container, className)}
      onMouseEnter={canHover ? showHover : undefined}
      onMouseLeave={canHover ? scheduleHoverHide : undefined}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-describedby={descriptionId}
        onFocus={canHover ? () => setFocused(true) : undefined}
        onBlur={canHover ? () => setFocused(false) : undefined}
        onClick={
          canHover ? undefined : () => setTapped((wasTapped) => !wasTapped)
        }
      >
        {children}
      </button>
      {/* Always present and referenced by aria-describedby, so screen readers get
          the description on focus regardless of the visible state. */}
      <span id={descriptionId} className="visually-hidden">
        {content}
      </span>
      {/* Visible bubble for sighted users; hidden from AT to avoid a double read. */}
      <span
        aria-hidden="true"
        className={cn(styles.bubble, { [styles.open]: open })}
      >
        {content}
      </span>
    </span>
  );
};

export default Toggletip;
