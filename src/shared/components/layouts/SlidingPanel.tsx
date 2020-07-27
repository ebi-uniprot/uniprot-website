import React, { FC } from 'react';
import { useSpring, animated } from 'react-spring';
import cn from 'classnames';

import './styles/sliding-panel.scss';

type Position = 'top' | 'bottom' | 'left' | 'right';

const SlidingPanel: FC<{
  position: Position;
  className?: string;
}> = ({ children, position, className }) => {
  const [props] = useSpring(() => ({
    opacity: 1,
    marginRight: 0,
    from: { opacity: 0, marginRight: -1000 },
  }));

  return (
    <animated.div
      className={cn(`sliding-panel sliding-panel--${position}`, className)}
      style={props}
    >
      <div>{children}</div>
    </animated.div>
  );
};

export default SlidingPanel;
