import joinUrl from 'url-join';

// import { apiPrefix } from '../../../shared/config/apiUrls/apiPrefix';

// https://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/protnlm/A0A059Q8K8
export const entry = (accession: string) =>
  joinUrl(
    'https://wwwdev.ebi.ac.uk/uniprot/api', // TODO: use apiPrefix
    'uniprotkb/protnlm',
    accession
  );
