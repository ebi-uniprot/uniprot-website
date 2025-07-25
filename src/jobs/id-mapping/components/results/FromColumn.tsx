import { createContext, useContext } from 'react';
import { Link } from 'react-router';

import { Location, LocationToPath } from '../../../../app/config/urls';
import AccessionView from '../../../../shared/components/results/AccessionView';
import { Namespace } from '../../../../shared/types/namespaces';
import { reUniProtKBAccession } from '../../../../uniprotkb/utils/regexes';
import { MappingFlat } from '../../types/idMappingSearchResults';

export const IDMappingFromContext = createContext<Namespace | undefined>(
  undefined
);

const From = ({ from }: Partial<MappingFlat>) => {
  const fromNamespace = useContext(IDMappingFromContext);

  if (
    !(from && fromNamespace) ||
    fromNamespace === Namespace.idmapping ||
    fromNamespace === Namespace.unisave
  ) {
    return <>{from}</> || null;
  }

  if (
    // Not UniProtKB
    fromNamespace !== Namespace.uniprotkb ||
    // Or, UniProtKB + "from" is an accession
    reUniProtKBAccession.test(from)
  ) {
    return <AccessionView id={from} namespace={fromNamespace} />;
  }

  // if it's a UniProtKB ID, return a search with the "direct" flag
  return (
    <Link
      to={{
        pathname: LocationToPath[Location.UniProtKBResults],
        search: `query=(id:${from})&direct`,
      }}
    >
      {from}
    </Link>
  );
};

export default From;
