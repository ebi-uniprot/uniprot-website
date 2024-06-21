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
import XRefEntryOverview from './XRefEntryOverview';

const XRefEntry = () => {
  const match = useRouteMatch<{ accession: string; id: string }>(
    LocationToPath[Location.UniParcXRefEntry]
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
  const xrefsForId = getXRefsForId(id, transformedData.uniParcCrossReferences);
  // TODO: handle when no xrefsForId
  return xrefsForId && <XRefEntryOverview data={xrefsForId} />;
};

export default XRefEntry;
