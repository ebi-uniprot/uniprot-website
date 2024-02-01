import { useState } from 'react';
import { Loader, Message } from 'franklin-sites';

import Entries from './Entries';
import ContactLink from '../../../../../contact/components/ContactLink';
import ErrorHandler from '../../../../../shared/components/error-pages/ErrorHandler';
import EntryDownloadPanel from '../../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../../shared/components/entry/EntryDownloadButton';

import useDataApi from '../../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../../shared/config/apiUrls/apiUrls';
import { groupCoordinates } from './utils';

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
  console.log(maneSelect);
  let isoformIDs = [primaryAccession];
  let canonical = primaryAccession;
  // If defined, it means there is more than one isoform
  if (isoforms) {
    isoformIDs = isoforms.flatMap((isoform) => isoform.isoformIds);
    canonical =
      isoforms.find((isoform) => isoform.isoformSequenceStatus === 'Displayed')
        ?.isoformIds[0] || canonical;
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

  const groupedData = groupCoordinates(data);

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <section className="wider-tab-content hotjar-margin">
      <Message level="info">
        The content of this tab is in beta, feel free to{' '}
        <ContactLink>get in touch</ContactLink> to provide feedback about it
      </Message>
      {title && <h2>{title}</h2>}
      {displayDownloadPanel && (
        <EntryDownloadPanel
          handleToggle={handleToggleDownload}
          dataset={Dataset.coordinates}
        />
      )}
      {/* <p>
        Mapping based on reference genome assembly:{' '}
        <i>unknown (information pending)</i>
      </p> */}
      <EntryDownloadButton handleToggle={handleToggleDownload} />
      {Object.entries(groupedData).map(([gene, data], index) => (
        <Entries
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
