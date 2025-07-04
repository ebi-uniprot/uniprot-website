import * as logging from '../../shared/utils/logging';
import { AgrOrthologsResult } from '../types/agrOrthologs';
import { AgrParalogsResult } from '../types/agrParalogs';

export const getTaxonQuery = (curie: string): string | null => {
  const reTaxonId = /NCBITaxon:(?<taxonId>\d+)/i;
  const match = curie.match(reTaxonId);
  if (!match?.groups?.taxonId) {
    return null;
  }
  return `(taxonomy_id:${match?.groups?.taxonId})`;
};

/*
MGI:88059               (xref:mgi-88059)
Xenbase:XB-GENE-479154  (xref:xenbase-XB-GENE-479154)
FB:FBgn0000108          (xref:flybase-FBgn0000108) 
RGD:2139                (xref:rgd-2139)
ZFIN:ZDB-GENE-000616-13 (xref:zfin-ZDB-GENE-000616-13)
HGNC:620                (xref:hgnc-620)
WB:WBGene00000149       (xref:agr-WBGene00000149) 
*/
const xrefTokenToQueryPrefix = new Map([
  ['MGI', 'mgi'],
  ['Xenbase', 'xenbase'],
  ['FB', 'flybase'],
  ['RGD', 'rgd'],
  ['ZFIN', 'zfin'],
  ['HGNC', 'hgnc'],
  ['WB', 'agr'],
]);

export const getXrefQuery = (primaryExternalId: string) => {
  const [xrefToken, ...idToken] = primaryExternalId.split(':');
  if (!idToken) {
    logging.error(
      `No token found for AGR primaryExternalId: ${primaryExternalId}`
    );
    return null;
  }
  const queryPrefix = xrefTokenToQueryPrefix.get(xrefToken);
  if (!queryPrefix) {
    logging.error(
      `No query prefix found for AGR primaryExternalId: ${primaryExternalId}`
    );
    return null;
  }
  return `(xref:${queryPrefix}-${idToken})`;
};

export const getXrefAndTaxonQuery = (
  gene:
    | AgrOrthologsResult['geneToGeneOrthologyGenerated']['objectGene']
    | AgrParalogsResult['geneToGeneParalogy']['objectGene']
) => {
  const taxonQuery = getTaxonQuery(gene.taxon.curie);
  const xrefQuery = getXrefQuery(gene.primaryExternalId);
  return taxonQuery && xrefQuery ? `${taxonQuery} AND ${xrefQuery}` : null;
};
