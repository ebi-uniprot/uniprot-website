import { FC } from 'react';
import { Loader } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import { getProteinsApiUrl } from '../../../shared/config/apiUrls';

const FeatureViewer: FC<{ accession: string }> = ({ accession }) => {
  // just to make sure not to render protvista-uniprot if we won't get any data
  const { loading, data } = useDataApi<UniProtkbAPIModel>(
    getProteinsApiUrl(accession)
  );

  useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-uniprot" */ 'protvista-uniprot'),
    'protvista-uniprot'
  );

  if (loading) return <Loader />;

  if (!data) return null;

  return (
    <section>
      <div style={{ height: '80vh' }}>
        <h2>ProtVista visualisation for {accession}</h2>
        <protvista-uniprot accession={accession} />
      </div>
    </section>
  );
};

export default FeatureViewer;
