import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import apiUrls from '../../../uniprotkb/config/apiUrls/apiUrls';
import { UniSaveStatus } from '../../../uniprotkb/types/uniSave';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';

const SubEntryInactive = ({ data }: { data: UniParcSubEntryUIModel }) => {
  const { subEntry } = data;
  const { loading, data: statusData } = useDataApi<UniSaveStatus>(
    subEntry.id && subEntry.active
      ? null
      : apiUrls.unisave.status(subEntry.id as string)
  );

  if (!loading && statusData) {
    const event = statusData.events?.[0];

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
  }
  return null;
};

export default SubEntryInactive;
