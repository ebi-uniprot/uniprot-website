import { Loader } from 'franklin-sites';
import { useRouteMatch } from 'react-router-dom';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../../shared/hooks/useDataApi';
// import useItemSelect from "../../../../shared/hooks/useItemSelect";

import toolsURLs from '../../../config/urls';

import { JobTypes } from '../../../types/toolsJobTypes';
import { IDMappingNamespace } from '../../types/idMappingServerParameters';
import { Location, LocationToPath } from '../../../../app/config/urls';
import { Namespace } from '../../../../shared/types/namespaces';
import { UniParcAPIModel } from '../../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefAPIModel } from '../../../../uniref/adapters/uniRefConverter';

const jobType = JobTypes.ID_MAPPING;
const urls = toolsURLs(jobType);

type IDMappingResultAPI = {
  from: string;
  to: string | UniProtkbAPIModel | UniParcAPIModel | UniRefAPIModel;
}[];

const getToNamespace = (results: IDMappingResultAPI): IDMappingNamespace => {
  const firstItem = results[0];
  if ((firstItem.to as UniProtkbAPIModel).primaryAccession) {
    return Namespace.uniprotkb;
  }
  if ((firstItem.to as UniRefAPIModel).id) {
    return Namespace.uniref;
  }
  if ((firstItem.to as UniParcAPIModel).uniParcId) {
    return Namespace.uniparc;
  }
  return undefined;
};

const IDMappingResult = () => {
  //   const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const match = useRouteMatch<{ id: string }>(
    LocationToPath[Location.IDMappingResult]
  )!;

  // get data from the idmapping endpoint
  const { loading, data, error, status } = useDataApi<{
    results: IDMappingResultAPI;
  }>(urls.resultUrl(match?.params.id || '', {}));

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !match) {
    return <ErrorHandler status={status} />;
  }

  // identify the type of "to" data
  const { results } = data;
  const idMappingNamespace = getToNamespace(results);

  // Facets

  // const [selectedEntries, handleEntrySelection] = useItemSelect();

  switch (idMappingNamespace) {
    case Namespace.uniprotkb:
      return null;
    case Namespace.uniref:
      return null;
    case Namespace.uniparc:
      return null;
    default:
      return null;
  }
};

export default IDMappingResult;
