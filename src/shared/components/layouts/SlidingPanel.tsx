import React, { FC } from 'react';
import { useSpring, animated } from 'react-spring';
import cn from 'classnames';

import './styles/sliding-panel.scss';

export enum Position {
  top = 'Top',
  bottom = 'Bottom',
  left = 'Left',
  right = 'Right',
}

const SlidingPanel: FC<{
  position: Position;
  className?: string;
  yScrollable?: boolean;
}> = ({ children, position, className, yScrollable = false }) => {
  const [props] = useSpring(() => ({
    opacity: 1,
    [`margin${position}`]: 0,
    from: { opacity: 0, [`margin${position}`]: -1000 },
  }));

  return (
    <animated.div
      className={cn(
        `sliding-panel sliding-panel--${position.toLowerCase()}`,
        className
      )}
      style={{ ...props, overflowY: yScrollable ? 'auto' : 'visible' }}
    >
      <div>{children}</div>
    </animated.div>
  );
};

export default SlidingPanel;
