import React, { FC, memo } from 'react';

import './styles/side-panel.scss';

const SidePanel: FC<{ children: JSX.Element }> = memo(({ children }) => (
  <div className="side-panel">{children}</div>
));

export default SidePanel;
