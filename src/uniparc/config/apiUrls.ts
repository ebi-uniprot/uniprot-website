import joinUrl from 'url-join';

export const devPrefix = 'https://wwwdev.ebi.ac.uk';

// NOTE: isn't working/deployed yet
const apiUrls = {
  entry: (accession: string) =>
    joinUrl(devPrefix, '/uniprot/api/uniparc', accession),
};

export default apiUrls;
