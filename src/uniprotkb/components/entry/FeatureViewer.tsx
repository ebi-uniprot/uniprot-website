import React, { FC } from 'react';
import ProtvistaUniprot from 'protvista-uniprot';
import { Loader } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import { loadWebComponent } from '../../../shared/utils/utils';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

loadWebComponent('protvista-uniprot', ProtvistaUniprot);

const FeatureViewer: FC<{ accession: string }> = ({ accession }) => {
  // just to make sure not to render protvista-uniprot if we won't get any data
  const { loading, data } = useDataApi<UniProtkbAPIModel>(
    `https://www.ebi.ac.uk/proteins/api/proteins/${accession}`
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
