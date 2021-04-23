import { FC } from 'react';
import { Link } from 'react-router-dom';

import EntryTypeIcon, { EntryType } from '../entry/EntryTypeIcon';

import { getEntryPath } from '../../../app/config/urls';

import { SearchableNamespace } from '../../types/namespaces';

import './styles/accession-view.scss';

const AccessionView: FC<{
  id: string | number;
  namespace: SearchableNamespace;
  entryType?: string | EntryType;
}> = ({ id, namespace, entryType }) => {
  const link = <Link to={getEntryPath(namespace, id)}>{id}</Link>;

  return (
    <div className="accession-view">
      <EntryTypeIcon entryType={entryType} />
      {link}
    </div>
  );
};

export default AccessionView;
