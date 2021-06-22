import { Link } from 'react-router-dom';

import BasketStatus from '../BasketStatus';
import EntryTypeIcon, { EntryType } from '../entry/EntryTypeIcon';

import { getEntryPath } from '../../../app/config/urls';

import { SearchableNamespace } from '../../types/namespaces';

import helper from '../../styles/helper.module.scss';

type Props = {
  id: string;
  namespace: SearchableNamespace;
  entryType?: string | EntryType;
};

const AccessionView = ({ id, namespace, entryType }: Props) => (
  <div className={helper['no-wrap']}>
    <BasketStatus id={id} />
    {entryType && <EntryTypeIcon entryType={entryType} />}
    <Link to={getEntryPath(namespace, id)}>{id}</Link>
  </div>
);

export default AccessionView;
