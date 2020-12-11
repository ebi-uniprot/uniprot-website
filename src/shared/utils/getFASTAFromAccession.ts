import entryToFASTAWithHeaders from './entryToFASTAWithHeaders';
import fetchData from './fetchData';

import uniProtKBApiUrls from '../config/apiUrls';

import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { UniRefAPIModel } from '../../uniref/adapters/uniRefConverter';

const getFASTAFromAccession = async (
  accession?: string
): Promise<string | void> => {
  if (!accession) {
    return;
  }
  let url;
  if (accession.startsWith('UniRef')) {
    // UniRef
    // Find representative sequence and use it instead
    const uniRefURL = uniProtKBApiUrls.uniref.entry(accession);
    if (!uniRefURL) {
      return;
    }
    const uniRefResponse = await fetchData<undefined | UniRefAPIModel>(
      uniRefURL
    );
    // might be either a UniProtKB or UniParc entry,
    // so just send it through this same function again recursively to process
    // eslint-disable-next-line consistent-return
    return getFASTAFromAccession(
      uniRefResponse.data?.representativeMember.accessions?.[0]
    );
  }
  if (accession.startsWith('UPI')) {
    // UniParc
    url = uniProtKBApiUrls.uniparc.entry(accession);
  } else {
    // UniProtKB
    url = uniProtKBApiUrls.entry(accession);
  }
  if (!url) {
    return;
  }
  const response = await fetchData<
    undefined | UniProtkbAPIModel | UniParcAPIModel
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
