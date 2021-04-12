import { FC } from 'react';

import PlaceHolderSVG from './svgs/place-holder.svg';

import './styles/place-holder.scss';

const PlaceHolder: FC = () => (
  <div className="placeholder uniprot-grid-cell--span-12">
    <PlaceHolderSVG preserveAspectRatio="none" />
  </div>
);

export default PlaceHolder;
