import { FC } from 'react';
import { Link } from 'react-router-dom';

import EntryTypeIcon, {
  EntryType,
} from '../../shared/components/entry/EntryTypeIcon';

import { getEntryPath } from '../../app/config/urls';

import { Namespace } from '../../shared/types/namespaces';
import {
  ProteomesAPIModel,
  ProteomeType,
} from '../adapters/proteomesConverter';

import './styles/accession-view.scss';

const iconProteomeTypes: ProteomeType[] = [
  'Reference proteome',
  'Reference and representative proteome',
  'Representative proteome',
];

const AccessionView: FC<Pick<ProteomesAPIModel, 'id' | 'proteomeType'>> = ({
  id,
  proteomeType,
}) => {
  const link = <Link to={getEntryPath(Namespace.proteomes, id)}>{id}</Link>;

  const showIcon = iconProteomeTypes.includes(proteomeType);
  return showIcon ? (
    <div className="accession-view">
      <EntryTypeIcon entryType={EntryType.REFERENCE_PROTEOME} />
      {link}
    </div>
  ) : (
    link
  );
};

export default AccessionView;
