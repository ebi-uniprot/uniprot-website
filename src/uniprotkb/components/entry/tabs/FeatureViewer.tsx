import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader, Message } from 'franklin-sites';

import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useCustomElement from '../../../../shared/hooks/useCustomElement';

import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { Dataset } from '../../../../shared/components/entry/EntryDownload';
import { VARIANT_COUNT_LIMIT } from './variation-viewer/VariationViewer';
import { getEntryPath } from '../../../../app/config/urls';

import { Namespace } from '../../../../shared/types/namespaces';
import { TabLocation } from '../../../types/entry';

import tabsStyles from './styles/tabs-styles.module.scss';

const FeatureViewer = ({
  accession,
  importedVariants,
}: {
  accession: string;
  importedVariants: number | 'loading';
}) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  // just to make sure not to render protvista-uniprot if we won't get any data
  const { loading, data } = useDataApi<UniProtkbAPIModel>(
    apiUrls.proteinsApi.proteins(accession)
  );

  const protvistaElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-uniprot" */ 'protvista-uniprot'),
    'protvista-uniprot'
  );

  const searchParams = new URLSearchParams(useLocation().search);
  const loadAllFeatures = searchParams.get('loadFeatures');

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  const shouldRender =
    (importedVariants !== 'loading' &&
      importedVariants <= VARIANT_COUNT_LIMIT) ||
    loadAllFeatures;

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
      {shouldRender ? (
        <protvistaElement.name accession={accession} />
      ) : (
        <div className={tabsStyles['too-many']}>
          <Message>
            Due to the large number of features for this entry, the feature
            viewer will not be loaded automatically for performance reasons.
          </Message>
          <Link
            className="button primary"
            to={{
              pathname: getEntryPath(
                Namespace.uniprotkb,
                accession,
                TabLocation.FeatureViewer
              ),
              search: new URLSearchParams({
                loadFeatures: 'true',
              }).toString(),
            }}
            target="features"
          >
            Click to load the feature viewer
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeatureViewer;
