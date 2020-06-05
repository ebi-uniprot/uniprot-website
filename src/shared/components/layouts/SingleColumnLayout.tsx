import React, { FC } from 'react';

import './styles/single-column-layout.scss';

const SingleColumnLayout: FC = ({ children }) => (
  <div className="single-column-layout">{children}</div>
);

export default SingleColumnLayout;
