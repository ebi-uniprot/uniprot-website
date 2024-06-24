// TODO: fix import order
import { Location, LocationToPath } from '../../../app/config/urls';
import { useRouteMatch } from 'react-router-dom';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import { Namespace } from '../../../shared/types/namespaces';
import useDataApi from '../../../shared/hooks/useDataApi';
import uniParcConverter, {
  UniParcAPIModel,
} from '../../adapters/uniParcConverter';
import { getXRefsForId } from '../../utils/xrefEntry';
import { Loader } from 'franklin-sites';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import SubEntryOverview from './SubEntryOverview';

const SubEntry = () => {
  const match = useRouteMatch<{ accession: string; id: string }>(
    LocationToPath[Location.UniParcSubEntry]
  );
  const { accession, id } = match?.params || {};
  const baseURL = apiUrls.entry.entry(id && accession, Namespace.uniparc);
  const uniparcData = useDataApi<UniParcAPIModel>(baseURL);
  if (uniparcData.error || !accession || !id) {
    return (
      <ErrorHandler
        status={uniparcData.status}
        error={uniparcData.error}
        fullPage
      />
    );
  }

  if (!uniparcData.data) {
    return <Loader progress={uniparcData.progress} />;
  }
  if (!uniparcData.data.uniParcCrossReferences) {
    // TODO: handle this
    return 'TODO: handle this';
  }
  const transformedData = uniParcConverter(uniparcData.data);
  const xrefForId = getXRefsForId(id, transformedData.uniParcCrossReferences);
  // TODO: handle when no xrefsForId
  return (
    xrefForId && (
      <SubEntryOverview xrefData={xrefForId} uniparcData={uniparcData.data} />
    )
  );
};

export default SubEntry;
