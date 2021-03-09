import { FC } from 'react';
import { SequenceFeature } from '../../adapters/uniParcConverter';

const UniParcFeaturesView: FC<{ data: SequenceFeature[] }> = ({ data }) => {
  console.log(data);
  return null;
};
export default UniParcFeaturesView;
