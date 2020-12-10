import React, { FC } from 'react';

type BlockProps = {
  columns?: string;
};

const Block: FC<BlockProps> = (props) => {
  const { children } = props;
  return <div className="uniprot-grid">{children}</div>;
};

export default Block;
