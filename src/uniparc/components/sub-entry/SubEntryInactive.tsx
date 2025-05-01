import { Message } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';
import apiUrls from '../../../uniprotkb/config/apiUrls/apiUrls';
import { UniSaveStatus } from '../../../uniprotkb/types/uniSave';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';

function SubEntryInactive({ data }: { data: UniParcSubEntryUIModel }) {
  const { subEntry } = data;
  const { loading, data: statusData } = useDataApi<UniSaveStatus>(
    subEntry.id && subEntry.active
      ? null
      : apiUrls.unisave.status(subEntry.id as string)
  );

  if (!loading && statusData) {
    const event = statusData.events?.[0];

    if (event && event?.deletedReason) {
      return (
        <Message level="info">
          <strong>This entry is no longer active in UniProtKB</strong>
          <div>
            Reason:{' '}
            <strong data-article-id="deleted_accessions">
              {event.deletedReason}
            </strong>
          </div>
          {event?.release && (
            <div>
              Since release: <strong>{event.release}</strong>
            </div>
          )}
        </Message>
      );
    }
  }
  return null;
}
export default SubEntryInactive;
