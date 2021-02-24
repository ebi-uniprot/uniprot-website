import joinUrl from '../../shared/config/testingApiUrls'; // TODO: revert import to: import joinUrl from 'url-join'
import { devPrefix } from '../../shared/config/apiUrls';

// NOTE: isn't working/deployed yet
const apiUrls = {
  entry: (accession: string) =>
    joinUrl(devPrefix, '/uniprot/api/uniparc', accession),
};

export default apiUrls;
