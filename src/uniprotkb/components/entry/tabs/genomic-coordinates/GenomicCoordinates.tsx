import { Loader, Message } from 'franklin-sites';

import ContactLink from '../../../../../contact/components/ContactLink';
import ErrorHandler from '../../../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../../../shared/hooks/useDataApi';

import { proteinsApi } from '../../../../../shared/config/apiUrls';
import { groupCoordinates } from './utils';

import { Isoform } from '../../../../types/commentTypes';
import { GenomicEntry } from './types';

import tabsStyles from '../styles/tabs-styles.module.scss';
import Entries from './Entries';

type GenomicCoordinatesProps = {
  primaryAccession: string;
  isoforms?: Isoform[];
  title?: string;
};

const GenomicCoordinates = ({
  primaryAccession,
  isoforms,
  title,
}: GenomicCoordinatesProps) => {
  let isoformIDs = [
    // Only if there are non-canonical isoforms, otherwise will be empty
    ...(isoforms?.flatMap((i) => i.isoformIds) || []),
  ];
  // Somehow if only canonical the canonical will not be in the list of isoforms
  if (!isoformIDs.length) {
    isoformIDs = [primaryAccession];
  }
  // For the future, add computationally mapped isoforms somehow
  const { loading, data, progress, error, status } = useDataApi<GenomicEntry[]>(
    proteinsApi.coordinates(isoformIDs)
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

  return (
    <section className="wider-tab-content hotjar-margin">
      <Message level="info">
        The content of this tab is in beta, feel free to{' '}
        <ContactLink>get in touch</ContactLink> to provide feedback about it
      </Message>
      {title && <h2>{title}</h2>}
      <p>
        Mapping based on reference genome assembly:{' '}
        <i>unknown (information pending)</i>
      </p>
      {Object.entries(groupedData).map(([gene, data], index) => (
        <Entries
          key={gene}
          entries={data}
          index={index}
          isoformIDs={isoformIDs}
        />
      ))}
    </section>
  );
};

export default GenomicCoordinates;
