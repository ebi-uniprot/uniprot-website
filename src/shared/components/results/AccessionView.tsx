import { FC } from 'react';
import { Link } from 'react-router-dom';

import EntryTypeIcon from '../entry/EntryTypeIcon';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import './styles/accession-view.scss';
import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';

const AccessionView: FC<{
  id: string;
  namespace: Namespace;
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
