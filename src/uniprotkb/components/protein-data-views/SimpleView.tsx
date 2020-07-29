import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type SimpleViewProps = {
  termValue: string;
  linkTo?: string;
};

const SimpleView: FC<SimpleViewProps> = ({ termValue, linkTo }) => {
  if (typeof linkTo !== 'undefined') {
    return <Link to={linkTo}>{termValue}</Link>;
  }
  return <span>{termValue}</span>;
};

export default SimpleView;
