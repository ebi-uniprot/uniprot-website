import React, { FC } from 'react';
import PlaceHolderSVG from './placeholder.svg';
import './PlaceHolder.scss';

const PlaceHolder: FC<{}> = () => (
  <div className="placeholder">
    <PlaceHolderSVG />
  </div>
);

export default PlaceHolder;
