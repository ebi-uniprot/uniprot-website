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

const addTooltip = (target: Element, content: string, triggers: Element[]) => {
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
  const allTriggers = [target, ...triggers];
  eventsAndListeners.forEach(([event, listener]) => {
    allTriggers.forEach((trigger) => {
      trigger.addEventListener(event, listener);
    });
  });
};

export default addTooltip;
