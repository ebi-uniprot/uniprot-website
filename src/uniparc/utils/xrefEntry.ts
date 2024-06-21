import { UniParcXRef } from '../adapters/uniParcConverter';

export const getXRefsForId = (id: string, xrefs: UniParcXRef[]) =>
  xrefs.find((xref) => xref.id === id);
