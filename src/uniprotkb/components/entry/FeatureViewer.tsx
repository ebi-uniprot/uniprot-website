import { Loader } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import { proteinsApi } from '../../../shared/config/apiUrls';

const FeatureViewer = ({ accession }: { accession: string }) => {
  // just to make sure not to render protvista-uniprot if we won't get any data
  const { loading, data } = useDataApi<UniProtkbAPIModel>(
    proteinsApi.proteins(accession)
  );

  const protvistaElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-uniprot" */ 'protvista-uniprot'),
    'protvista-uniprot'
  );

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  return (
    <section>
      <protvistaElement.name accession={accession} />
    </section>
  );
};

export default FeatureViewer;
