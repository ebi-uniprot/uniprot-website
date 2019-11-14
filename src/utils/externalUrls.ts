import { joinUrl } from './apiUrls';

const externalUrls = {
  IntAct: '//www.ebi.ac.uk/intact/',
};

export const getIntActQueryForAccessionUrl = (accession: string) =>
  joinUrl(
    externalUrls.IntAct,
    'query',
    `(  idA:${accession} AND idB:${accession}  ) OR (  idA:${accession} AND idB:-  ) OR (  idA:- AND idB:${accession}  )`
  );

export const getIntActQueryUrl = (
  firstInteractor: string,
  secondInteractor: string
) =>
  joinUrl(
    externalUrls.IntAct,
    'query',
    `(${firstInteractor} AND ${secondInteractor})`
  );

export default externalUrls;
