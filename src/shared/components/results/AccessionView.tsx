import { Link } from 'react-router-dom';
import cn from 'classnames';

import BasketStatus from '../../../basket/BasketStatus';
import EntryTypeIcon, { EntryType } from '../entry/EntryTypeIcon';

import { getEntryPath } from '../../../app/config/urls';

import { reIds } from '../../../tools/utils/urls';

import { Namespace, SearchableNamespace } from '../../types/namespaces';

import helper from '../../styles/helper.module.scss';
import styles from './styles/accession-view.module.scss';

type Props = {
  id: string;
  namespace: SearchableNamespace;
  entryType?: string | EntryType;
};

const AccessionView = ({ id, namespace, entryType }: Props) => {
  const { id: acc, start, end } = id.match(reIds)?.groups || { id };

  return (
    <span className={cn(helper['no-wrap'], styles['accession-view'])}>
      {entryType && <EntryTypeIcon entryType={entryType} />}
      <Link
        to={getEntryPath(
          namespace,
          acc,
          namespace === Namespace.uniprotkb || namespace === Namespace.uniparc
            ? 'entry'
            : undefined
        )}
        className={styles.accession}
      >
        {acc}
      </Link>
      {start && end && (
        <span>
          [{start}-{end}]
        </span>
      )}
      <BasketStatus id={id} />
    </span>
  );
};

export default AccessionView;
