import { useState } from 'react';
import { Loader } from 'franklin-sites';

import GeneEntry from './GeneEntry';
import ErrorHandler from '../../../../../shared/components/error-pages/ErrorHandler';
import EntryDownloadPanel from '../../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../../shared/components/entry/EntryDownloadButton';

import useDataApi from '../../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../../shared/config/apiUrls/apiUrls';
import { groupByGene } from './utils';

import { Isoform } from '../../../../types/commentTypes';
import { GenomicEntry } from './types';
import { Dataset } from '../../../../../shared/components/entry/EntryDownload';

import tabsStyles from '../styles/tabs-styles.module.scss';

type GenomicCoordinatesProps = {
  primaryAccession: string;
  isoforms?: Isoform[];
  maneSelect: Set<string>;
  title?: string;
};

const GenomicCoordinates = ({
  primaryAccession,
  isoforms,
  maneSelect,
  title,
}: GenomicCoordinatesProps) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  let isoformIDs = [primaryAccession];
  let canonical: string | undefined; // if only one canonical no need to annotate it
  // If defined, it means there is more than one isoform
  if (isoforms) {
    isoformIDs = isoforms.flatMap((isoform) => isoform.isoformIds);
    canonical = isoforms.find(
      (isoform) => isoform.isoformSequenceStatus === 'Displayed'
    )?.isoformIds[0];
  }

  // For the future, add computationally mapped isoforms somehow
  const { loading, data, progress, error, status } = useDataApi<GenomicEntry[]>(
    apiUrls.proteinsApi.coordinates(isoformIDs)
  );

  if (loading) {
    return (
      <div className="wider-tab-content hotjar-margin">
        {title && <h3>{title}</h3>}
        <Loader progress={progress} />
      </div>
    );
  }

  if (error && status !== 404) {
    return (
      <div className="wider-tab-content hotjar-margin">
        <ErrorHandler status={status} />
      </div>
    );
  }

  if (status === 404 || !data || !data?.length) {
    return (
      <section className="wider-tab-content hotjar-margin">
        {title && <h3>{title}</h3>}
        <div className={tabsStyles['no-data']}>
          No genomic coordinate information available for {primaryAccession}
        </div>
      </section>
    );
  }

  const groupedByGene = groupByGene(data);

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <section className="wider-tab-content hotjar-margin">
      {title && <h2>{title}</h2>}
      {displayDownloadPanel && (
        <EntryDownloadPanel
          handleToggle={handleToggleDownload}
          dataset={Dataset.coordinates}
        />
      )}
      <EntryDownloadButton handleToggle={handleToggleDownload} />
      {Object.entries(groupedByGene).map(([gene, data], index) => (
        <GeneEntry
          key={gene}
          entries={data}
          index={index}
          isoformIDs={isoformIDs}
          canonical={canonical}
          maneSelect={maneSelect}
        />
      ))}
    </section>
  );
};

export default GenomicCoordinates;
