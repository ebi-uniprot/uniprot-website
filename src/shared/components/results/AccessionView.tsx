import { Link } from 'react-router-dom';
import cn from 'classnames';

import BasketStatus from '../../../basket/BasketStatus';
import EntryTypeIcon, { EntryType } from '../entry/EntryTypeIcon';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace, SearchableNamespace } from '../../types/namespaces';

import helper from '../../styles/helper.module.scss';
import styles from './styles/accession-view.module.scss';

type Props = {
  id: string;
  namespace: SearchableNamespace;
  entryType?: string | EntryType;
};

const AccessionView = ({ id, namespace, entryType }: Props) => {
  const reIds = /(?<acc>\w+-?\d*)(\[(?<start>\d+)-(?<end>\d+)\])?/;
  const { acc, start, end } = id.match(reIds)?.groups || {};

  return (
    <span className={cn(helper['no-wrap'], styles['accession-view'])}>
      {entryType && <EntryTypeIcon entryType={entryType} />}
      <Link
        to={getEntryPath(
          namespace,
          acc ? acc : id,
          namespace === Namespace.uniprotkb || namespace === Namespace.uniparc
            ? 'entry'
            : undefined
        )}
        className={styles.accession}
      >
        {acc ? acc : id}
      </Link>
      {start && end && (
        <span>
          [{start}]-[{end}]
        </span>
      )}
      <BasketStatus id={id} />
    </span>
  );
};

export default AccessionView;
