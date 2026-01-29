import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';

const SubEntryInactive = ({ data }: { data: UniParcSubEntryUIModel }) => {
  const { unisave } = data;

  let events = unisave.events;
  if (events?.length && events.length > 1 && events[0].eventType === 'merged') {
    const demergedEntries = events.map((event) => event.targetAccession);
    events = [{ ...events[0], targetAccession: demergedEntries.join(', ') }];
  }

  const event = events?.[0];

  if (event?.eventType === 'merged') {
    return (
      <span data-article-id="merged_accession">
        {event.targetAccession.split(', ').length > 1 ? 'Demerged' : 'Merged'}{' '}
        into{' '}
        {event.targetAccession
          .split(', ')
          .map((targetAccession, index, array) => (
            <span key={targetAccession}>
              <Link to={getEntryPath(Namespace.uniprotkb, targetAccession)}>
                {targetAccession}
              </Link>
              {index < array.length - 1 ? ', ' : ''}
            </span>
          ))}
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
