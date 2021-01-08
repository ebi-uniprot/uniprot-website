import { FC, useRef, useEffect } from 'react';
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
  onClickOutside?: (arg: void) => void;
}> = ({
  children,
  position,
  className,
  onClickOutside,
  yScrollable = false,
}) => {
  const node = useRef<HTMLDivElement>(null);
  const margin = `margin${upperFirst(position)}`;
  const [props] = useSpring(() => ({
    opacity: 1,
    [margin]: 0,
    from: { opacity: 0, [margin]: -1000 },
  }));

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (onClickOutside) {
      const handleClickOutside = (e: MouseEvent) => {
        if (node?.current && !node.current.contains(e.target as Node)) {
          onClickOutside();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [onClickOutside]);

  return (
    <animated.div
      className={cn(`sliding-panel sliding-panel--${position}`, className)}
      style={{ ...props, overflowY: yScrollable ? 'auto' : 'initial' }}
      ref={node}
    >
      <ErrorBoundary>
        <div>{children}</div>
      </ErrorBoundary>
    </animated.div>
  );
};

export default SlidingPanel;
