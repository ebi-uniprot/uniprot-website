import { capitalize } from 'lodash-es';

const ftpUrls = {
  referenceProteomes: (id: string, superkingdom: string, taxonId: number) =>
    `https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/reference_proteomes/${capitalize(
      superkingdom
    )}/${id}/${id}_${taxonId}.fasta.gz`,
};

export default ftpUrls;
