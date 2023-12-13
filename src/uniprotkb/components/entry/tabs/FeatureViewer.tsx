import { useState } from 'react';
import { Loader } from 'franklin-sites';

import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useCustomElement from '../../../../shared/hooks/useCustomElement';

import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import { proteinsApi } from '../../../../shared/config/apiUrls';
import { Dataset } from '../../../../shared/components/entry/EntryDownload';

const FeatureViewer = ({ accession }: { accession: string }) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
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

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <section className="wider-tab-content hotjar-margin">
      <h3>Feature viewer</h3>
      {displayDownloadPanel && (
        <EntryDownloadPanel
          handleToggle={handleToggleDownload}
          dataset={Dataset.features}
        />
      )}
      {data?.features && (
        <EntryDownloadButton handleToggle={handleToggleDownload} />
      )}
      <protvistaElement.name accession={accession} />
    </section>
  );
};

export default FeatureViewer;
