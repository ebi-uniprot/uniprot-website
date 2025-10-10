import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';

const SubEntryInactive = ({ data }: { data: UniParcSubEntryUIModel }) => {
  const { unisave } = data;
  const event = unisave.events?.[0];

  if (event?.eventType === 'merged') {
    return (
      <span data-article-id="merged_accession">
        Merged into{' '}
        <Link to={getEntryPath(Namespace.uniprotkb, event.targetAccession)}>
          {event.targetAccession}
        </Link>
      </span>
    );
  }

  return (
    <span data-article-id="deleted_accessions">
      {event?.deletedReason || 'Deleted'}
    </span>
  );
};

export default SubEntryInactive;
