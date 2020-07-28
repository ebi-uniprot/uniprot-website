import React, { FC } from 'react';

import './styles/block.scss';

type BlockProps = {
  columns: string;
};

const Block: FC<BlockProps> = (props) => {
  const { columns, children } = props;
  return <div className={`block block--${columns}-col`}>{children}</div>;
};

export default Block;
