import React, { FC } from 'react';
import { useSpring, animated } from 'react-spring';
import cn from 'classnames';
import { upperFirst } from 'lodash-es';

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
}> = ({ children, position, className, yScrollable = false }) => {
  const margin = `margin${upperFirst(position)}`;
  const [props] = useSpring(() => ({
    opacity: 1,
    [margin]: 0,
    from: { opacity: 0, [margin]: -1000 },
  }));

  return (
    <animated.div
      className={cn(`sliding-panel sliding-panel--${position}`, className)}
      style={{ ...props, overflowY: yScrollable ? 'auto' : 'initial' }}
    >
      <div>{children}</div>
    </animated.div>
  );
};

export default SlidingPanel;
