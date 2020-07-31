import React, { FC } from 'react';
import PlaceHolderSVG from './svgs/place-holder.svg';
import './styles/place-holder.scss';

const PlaceHolder: FC = () => (
  <div className="placeholder">
    <PlaceHolderSVG />
  </div>
);

export default PlaceHolder;
