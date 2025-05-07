import useDataApi from '../../../shared/hooks/useDataApi';
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

    if (event && event?.deletedReason) {
      return (
        <span data-article-id="deleted_accessions">{event.deletedReason}</span>
      );
    }
  }
  return null;
};

export default SubEntryInactive;
