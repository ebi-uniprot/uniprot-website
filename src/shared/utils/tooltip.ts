import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';

import styles from './styles/tooltip.module.scss';

type StaticSide = 'bottom' | 'left' | 'top' | 'right';

const getTooltip = (content: string) => {
  const tooltip = document.createElement('div');
  tooltip.setAttribute('role', 'tooltip');
  tooltip.className = styles.tooltip;
  const tooltipContent = document.createElement('div');
  tooltipContent.className = styles['tooltip-content'];
  tooltipContent.innerHTML = content;
  tooltip.appendChild(tooltipContent);
  const arrowElement = document.createElement('div');
  arrowElement.className = styles.arrow;
  tooltip.appendChild(arrowElement);
  return [tooltip, arrowElement];
};

const getUpdate =
  (reference: Element, tooltip: HTMLElement, arrowElement: HTMLElement) =>
  () => {
    computePosition(reference, tooltip, {
      placement: 'top',
      middleware: [
        offset(10),
        flip(),
        shift({ padding: 10 }),
        arrow({ element: arrowElement }),
      ],
    }).then(({ x: tooltipX, y: tooltipY, placement, middlewareData }) => {
      Object.assign(tooltip.style, {
        left: `${tooltipX}px`,
        top: `${tooltipY}px`,
      });
      const { x: arrowX, y: arrowY } = middlewareData.arrow || {};
      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]] as StaticSide;

      Object.assign(arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px',
      });
    });
  };

export const addTooltip = (
  target: Element,
  content: string,
  triggers?: Element[]
) => {
  const [tooltip, arrowElement] = getTooltip(content);
  const update = getUpdate(target, tooltip, arrowElement);

  let cleanup: ReturnType<typeof autoUpdate> | undefined;
  let hideTimeout: number | undefined;

  function scheduleHide() {
    hideTimeout = window.setTimeout(() => {
      hide();
    }, 100);
  }

  function cancelHide() {
    if (hideTimeout) {
      window.clearTimeout(hideTimeout);
      hideTimeout = undefined;
    }
  }

  function show() {
    if (!tooltip.isConnected) {
      document.body.append(tooltip);
      cleanup = autoUpdate(target, tooltip, update);
      // Make the tooltip itself part of the hover area
      tooltip.addEventListener('mouseenter', cancelHide);
      tooltip.addEventListener('mouseleave', scheduleHide);
    }
  }

  function hide() {
    cleanup?.();
    tooltip.remove();
    tooltip.removeEventListener('mouseenter', cancelHide);
    tooltip.removeEventListener('mouseleave', scheduleHide);
  }

  const eventsAndListeners: [string, () => void][] = [
    [
      'mouseenter',
      () => {
        cancelHide();
        show();
      },
    ],
    ['mouseleave', scheduleHide],
    [
      'focus',
      () => {
        cancelHide();
        show();
      },
    ],
    ['blur', hide],
  ];

  const allTriggers = [target, ...(triggers || [])];

  // Attach all listeners
  for (const [event, listener] of eventsAndListeners) {
    for (const el of allTriggers) {
      el.addEventListener(event, listener);
    }
  }

  // Return cleanup function to remove tooltip and remove event listeners
  return () => {
    hide();
    for (const [event, listener] of eventsAndListeners) {
      for (const el of allTriggers) {
        el.removeEventListener(event, listener);
      }
    }
  };
};

export const showTooltip = (
  content: string,
  target: Element,
  displayTarget: Element
) => {
  const [tooltip, arrowElement] = getTooltip(content);
  const update = getUpdate(displayTarget, tooltip, arrowElement);
  const cleanup = autoUpdate(displayTarget, tooltip, update);
  document.body.append(tooltip);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function onLeave() {
    // Start a timer when the mouse has left either the target or the tooltip
    timeoutId = setTimeout(() => {
      hideTooltip();
    }, 50);
  }

  function onEnterTooltip() {
    // Cancel the timer if user enters the tooltip to keep it visible
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  function hideTooltip() {
    cleanup?.();
    tooltip.remove();
    target.removeEventListener('mouseleave', onLeave);
    tooltip.removeEventListener('mouseleave', onLeave);
    tooltip.removeEventListener('mouseenter', onEnterTooltip);
  }

  target.addEventListener('mouseleave', onLeave);
  tooltip.addEventListener('mouseleave', onLeave);
  tooltip.addEventListener('mouseenter', onEnterTooltip);
};

export const showTooltipAtCoordinates = (
  x: number,
  y: number,
  content: string
) => {
  const [tooltip, arrowElement] = getTooltip(content);
  const reference = {
    getBoundingClientRect() {
      return {
        x: 0,
        y: 0,
        top: y,
        left: x,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
      };
    },
  } as Element;

  const update = getUpdate(reference, tooltip, arrowElement);
  const cleanup = autoUpdate(reference, tooltip, update);

  document.body.append(tooltip);
  document.body.addEventListener('click', interactionHandler, true);
  document.body.addEventListener('scroll', interactionHandler, true);
  document.body.addEventListener('wheel', interactionHandler, true);

  function interactionHandler(e?: Event) {
    const target = e?.target as Node | null;
    // if scroll/wheel is within the tooltip element, do not remove the tooltip
    if (target && !tooltip.contains(target)) {
      tooltip?.remove();
      cleanup?.();
      document.body.removeEventListener('click', interactionHandler, true);
      document.body.removeEventListener('scroll', interactionHandler, true);
      document.body.removeEventListener('wheel', interactionHandler, true);
    }
  }

  return interactionHandler;
};
