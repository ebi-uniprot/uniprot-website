import { FC } from 'react';
import { Link } from 'react-router-dom';

import EntryTypeIcon from '../../shared/components/entry/EntryTypeIcon';

import { getEntryPath } from '../../app/config/urls';

import { Namespace } from '../../shared/types/namespaces';
import { ProteomesAPIModel } from '../adapters/proteomesConverter';

import './styles/accession-view.scss';

const AccessionView: FC<Pick<ProteomesAPIModel, 'id' | 'proteomeType'>> = ({
  id,
  proteomeType,
}) => {
  const link = <Link to={getEntryPath(Namespace.proteomes, id)}>{id}</Link>;

  return (
    <div className="accession-view">
      <EntryTypeIcon entryType={proteomeType} />
      {link}
    </div>
  );
};

export default AccessionView;
