import { type ReactNode, useEffect, useRef, useState } from 'react';

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
  // The explanatory content revealed on reveal.
  content: ReactNode;
  // The visible trigger — rendered as an inline, underlined, clickable button.
  children: ReactNode;
};

// Short explanatory popup that adapts to the input device: a transient tooltip
// on hover-capable devices (reveal on hover/focus, dismiss on mouse-out/blur),
// and a persistent toggletip on touch (tap to open, tap-again / outside-click /
// Escape to close). Each device therefore uses a single consistent model. It
// beats a native `title` everywhere — instant, styleable, keyboard-operable,
// and announced to screen readers via the adjacent live region — meeting WCAG
// 1.4.13 / 2.1.1 / 4.1.2.
const Toggletip = ({ content, children }: ToggletipProps) => {
  const canHover = useMatchMedia(HOVER_CAPABLE_QUERY);
  const [open, setOpen] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const clearHide = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
  };
  const show = () => {
    clearHide();
    setOpen(true);
  };
  const scheduleHide = () => {
    clearHide();
    hideTimeout.current = setTimeout(() => setOpen(false), HIDE_DELAY);
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
      setOpen(false);
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
      className={styles.container}
      onMouseEnter={canHover ? show : undefined}
      onMouseLeave={canHover ? scheduleHide : undefined}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        onFocus={canHover ? show : undefined}
        onBlur={canHover ? scheduleHide : undefined}
        onClick={canHover ? show : () => setOpen((wasOpen) => !wasOpen)}
      >
        {children}
      </button>
      {/* Populated only while open, so the live region announces on reveal. */}
      <span role="status" className={styles.bubble}>
        {open && content}
      </span>
    </span>
  );
};

export default Toggletip;
