import { capitalize } from 'lodash-es';
import joinUrl from 'url-join';

const ftpUniProt = 'https://ftp.ebi.ac.uk/pub/databases/uniprot/'; // To be reverted back to https://ftp.uniprot.org/pub/databases/uniprot/ once the PIR issue is solved

const ftpUrls = {
  uniprot: ftpUniProt,
  referenceProteomes: (id: string, superkingdom: string, taxonId: number) =>
    joinUrl(
      ftpUniProt,
      `/current_release/knowledgebase/reference_proteomes/${capitalize(
        superkingdom
      )}/${id}/${id}_${taxonId}.fasta.gz`
    ),
  panProteomes: (id: string) =>
    joinUrl(
      ftpUniProt,
      `/current_release/knowledgebase/pan_proteomes/${id}.fasta.gz`
    ),
};

export default ftpUrls;
