import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  autoUpdate,
} from '@floating-ui/dom';

import styles from './styles/tooltip.module.scss';

type StaticSide = 'bottom' | 'left' | 'top' | 'right';

const getTooltip = (content: string) => {
  const tooltip = document.createElement('div');
  tooltip.setAttribute('role', 'tooltip');
  tooltip.className = styles.tooltip;
  tooltip.innerHTML = content;
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
  const showTooltip = () => {
    document.body.append(tooltip);
    cleanup = autoUpdate(target, tooltip, update);
  };
  const hideTooltip = () => {
    tooltip.remove();
    cleanup?.();
  };
  const eventsAndListeners: [string, () => void][] = [
    ['mouseenter', showTooltip],
    ['focus', showTooltip],
    ['mouseleave', hideTooltip],
    ['blur', hideTooltip],
  ];
  const allTriggers = [target, ...(triggers || [])];
  eventsAndListeners.forEach(([event, listener]) => {
    allTriggers.forEach((trigger) => {
      trigger.addEventListener(event, listener);
    });
  });

  // Return cleanup function to remove tooltip and remove event listeners
  return () => {
    hideTooltip();
    eventsAndListeners.forEach(([event, listener]) => {
      allTriggers.forEach((trigger) => {
        trigger.removeEventListener(event, listener);
      });
    });
  };
};

export const showTooltip = (
  content: string,
  target: Element,
  displayTarget: Element
) => {
  if (displayTarget) {
    const [tooltip, arrowElement] = getTooltip(content);
    const update = getUpdate(displayTarget, tooltip, arrowElement);
    const cleanup = autoUpdate(displayTarget, tooltip, update);
    document.body.append(tooltip);
    const hideTooltip = () => {
      tooltip.remove();
      cleanup?.();
    };
    // The listener will be automatically removed when invoked just once
    target?.addEventListener('mouseleave', hideTooltip, { once: true });
  }
};

export const showTooltipAtCoordinates = (
  x: number,
  y: number,
  content: string,
  target: Element
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
  document.body.addEventListener('click', onClick);
  document.body.addEventListener('scroll', hideTooltip);
  document.body.addEventListener('wheel', hideTooltip);

  function hideTooltip() {
    tooltip.remove();
    cleanup?.();
    document.body.removeEventListener('click', onClick);
    document.body.removeEventListener('scroll', hideTooltip);
    document.body.removeEventListener('wheel', hideTooltip);
  }

  function onClick(e: Event) {
    const eventTarget = e.target as Node;
    if (
      eventTarget &&
      !target.contains(eventTarget) &&
      !tooltip.contains(eventTarget)
    ) {
      hideTooltip();
    }
  }

  return hideTooltip;
};
