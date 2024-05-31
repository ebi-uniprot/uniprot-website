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

const addTooltip = (target: Element, content: string, triggers?: Element[]) => {
  const tooltip = document.createElement('div');
  tooltip.setAttribute('role', 'tooltip');
  tooltip.className = styles.tooltip;
  tooltip.innerHTML = content;
  const arrowElement = document.createElement('div');
  arrowElement.className = styles.arrow;
  tooltip.appendChild(arrowElement);

  const update = () => {
    computePosition(target, tooltip, {
      placement: 'top',
      middleware: [
        offset(10),
        flip(),
        shift({ padding: 10 }),
        arrow({ element: arrowElement }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
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

  // return fn to remove event listeners and remove from view and remove click behavior
};

export default addTooltip;

export const showTooltip = (
  x: number,
  y: number,
  content: string,
  target?: Element,
  displayTarget?: Element
) => {
  const tooltip = document.createElement('div');
  tooltip.setAttribute('role', 'tooltip');
  tooltip.className = styles.tooltip;
  tooltip.innerHTML = content;
  const arrowElement = document.createElement('div');
  arrowElement.className = styles.arrow;
  tooltip.appendChild(arrowElement);
  const reference =
    (typeof x !== 'undefined' &&
      typeof y !== 'undefined' && {
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
      }) ||
    displayTarget ||
    target;
  if (!reference) {
    return null;
  }

  const update = () => {
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

  document.body.append(tooltip);

  // option "once" to remove as soon as it has exited

  const cleanup = autoUpdate(reference, tooltip, update);

  const hideTooltip = () => {
    tooltip.remove();
    cleanup?.();
  };

  // The listener will be automatically removed when invoked just once
  target?.addEventListener('mouseleave', hideTooltip, { once: true });

  return hideTooltip;
};

export const showTooltip2 = (
  x: number,
  y: number,
  content: string,
  target: Element
) => {
  const tooltip = document.createElement('div');
  tooltip.setAttribute('role', 'tooltip');
  tooltip.className = styles.tooltip;
  tooltip.innerHTML = content;
  const arrowElement = document.createElement('div');
  arrowElement.className = styles.arrow;
  tooltip.appendChild(arrowElement);
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
  };

  const update = () => {
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

  document.body.append(tooltip);

  // option "once" to remove as soon as it has exited

  const cleanup = autoUpdate(reference, tooltip, update);

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

  function onClick(e) {
    // console.log(!e.target.contains(target));
    if (
      !target.contains(e.target) &&
      !tooltip.contains(e.target) &&
      !e.target.contains(tooltip)
    ) {
      hideTooltip();
    }
  }

  return hideTooltip;
};
