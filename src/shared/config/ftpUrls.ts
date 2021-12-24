import { capitalize } from 'lodash-es';
import joinUrl from 'url-join';

const ftpPrefix = 'https://ftp.uniprot.org';

const ftpUrls = {
  referenceProteomes: (id: string, superkingdom: string, taxonId: number) =>
    joinUrl(
      ftpPrefix,
      `/pub/databases/uniprot/current_release/knowledgebase/reference_proteomes/${capitalize(
        superkingdom
      )}/${id}/${id}_${taxonId}.fasta.gz`
    ),
  panProteomes: (id: string) =>
    joinUrl(
      ftpPrefix,
      `/pub/databases/uniprot/current_release/knowledgebase/pan_proteomes/${id}.fasta.gz`
    ),
};

export default ftpUrls;
