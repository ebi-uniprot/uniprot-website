import { generatePath } from 'react-router-dom';
import { Location, LocationToPath } from '../../app/config/urls';
import { UniParcXRef } from '../adapters/uniParcConverter';

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
