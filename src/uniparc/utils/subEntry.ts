import { generatePath } from 'react-router-dom';
import { Location, LocationToPath } from '../../app/config/urls';
import { UniParcXRef } from '../adapters/uniParcConverter';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { orderBy } from 'lodash-es';

export const getXRefsForId = (id: string, xrefs?: UniParcXRef[]) =>
  xrefs?.find((xref) => xref.id === id);

export const getSubEntryPath = (
  accession: string,
  subEntryId: string,
  subPage?: string
) =>
  generatePath(LocationToPath[Location.UniParcSubEntry], {
    accession,
    subEntryId,
    subPage,
  });

const reSourceDatabase = /^(refseq|ensembl|embl)/i;

export const isSourceDatabase = (database: string) =>
  reSourceDatabase.test(database);

export const getSource = (organism?: TaxonomyDatum, xrefs?: UniParcXRef[]) => {
  const found = xrefs?.filter(
    (xref) =>
      xref.organism?.taxonId &&
      organism?.taxonId &&
      xref.database &&
      xref.organism?.taxonId === organism.taxonId &&
      isSourceDatabase(xref.database)
  );
  if (!found || !found.length) {
    return null;
  }
  if (found.length === 1) {
    return found[0];
  }
  if (found.length > 1) {
    return orderBy(found, 'lastUpdated', 'desc')[0];
  }
  return null;
};
