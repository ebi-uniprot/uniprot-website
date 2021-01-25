import { FC, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated } from 'react-spring';
import cn from 'classnames';
import { upperFirst } from 'lodash-es';

import ErrorBoundary from '../error-component/ErrorBoundary';

import './styles/sliding-panel.scss';

export enum Position {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

const SlidingPanel: FC<{
  position: Position;
  className?: string;
  yScrollable?: boolean;
  onClose: (arg: void) => void;
}> = ({ children, position, className, onClose, yScrollable = false }) => {
  const node = useRef<HTMLDivElement>(null);
  const margin = `margin${upperFirst(position)}`;
  const [props] = useSpring(() => ({
    opacity: 1,
    [margin]: 0,
    from: { opacity: 0, [margin]: -1000 },
  }));

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node?.current && !node.current.contains(e.target as Node)) {
        e.stopPropagation();
        e.preventDefault();
        onCloseRef.current();
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return createPortal(
    <animated.div
      data-testid="sliding-panel"
      className={cn(`sliding-panel sliding-panel--${position}`, className)}
      style={{ ...props, overflowY: yScrollable ? 'auto' : 'initial' }}
      ref={node}
    >
      <ErrorBoundary>
        <div>{children}</div>
      </ErrorBoundary>
    </animated.div>,
    document.body
  );
};

export default SlidingPanel;
