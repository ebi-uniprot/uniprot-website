import React, { FC } from 'react';
import { useSpring, animated } from 'react-spring';
import './styles/side-panel.scss';

const SidePanel: FC<{ children: JSX.Element }> = ({ children }) => {
  const [props] = useSpring(() => ({
    opacity: 1,
    marginRight: 0,
    from: { opacity: 0, marginRight: -1000 },
  }));

  return (
    <animated.div className="side-panel" style={props}>
      <div>{children}</div>
    </animated.div>
  );
};

export default SidePanel;
