import { createContext, ReactNode } from 'react';
import { useRouteMatch } from 'react-router-dom';

import useDataApi from '../hooks/useDataApi';

import { Location, LocationToPath } from '../../app/config/urls';
import apiUrls from '../config/apiUrls/apiUrls';
import { Namespace } from '../types/namespaces';
import { extractIsoformNames } from '../../uniprotkb/adapters/extractIsoformsConverter';
import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';

export const IsoformsContext = createContext<string[] | undefined>(undefined);

export const IsoformsProvider = ({ children }: { children: ReactNode }) => {
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.UniProtKBEntry]
  );

  const accession = match?.params.accession;
  const { data } = useDataApi<UniProtkbAPIModel>(
    apiUrls.entry.entry(accession, Namespace.uniprotkb)
  );

  let isoforms;
  if (data) {
    isoforms = extractIsoformNames(data);
  }

  return (
    <IsoformsContext.Provider value={isoforms}>
      {children}
    </IsoformsContext.Provider>
  );
};
