import entryToFASTAWithHeaders from './entryToFASTAWithHeaders';
import fetchData from './fetchData';

import apiUrls from '../config/apiUrls';

import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { UniRefAPIModel } from '../../uniref/adapters/uniRefConverter';
import { Namespace } from '../types/namespaces';

const getFASTAFromAccession = async (
  accession?: string
): Promise<string | void> => {
  if (!accession) {
    return;
  }
  let url;
  if (accession.startsWith('UniRef')) {
    url = apiUrls.entry(accession, Namespace.uniref);
  } else if (accession.startsWith('UPI')) {
    url = apiUrls.entry(accession, Namespace.uniparc);
  } else {
    url = apiUrls.entry(accession, Namespace.uniprotkb);
  }
  if (!url) {
    return;
  }
  const response = await fetchData<
    undefined | UniProtkbAPIModel | UniParcAPIModel | UniRefAPIModel
  >(url);
  if (!response.data) {
    return;
  }
  // TODO: handle inactive entries (see P00001) valid response, status code: 200
  // TODO: handle here? or in entryToFASTAWithHeader?
  // eslint-disable-next-line consistent-return
  return entryToFASTAWithHeaders(response.data);
};

export default getFASTAFromAccession;
