import { Loader, Message } from 'franklin-sites';

import Coordinates from './Coordinates';
import ContactLink from '../../../../../contact/components/ContactLink';
import ErrorHandler from '../../../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../../../shared/hooks/useDataApi';

import { proteinsApi } from '../../../../../shared/config/apiUrls';

import { GenomicEntry } from './types';

import tabsStyles from '../styles/tabs-styles.module.scss';

type GenomicCoordinatesProps = {
  primaryAccession: string;
  title?: string;
};

const GenomicCoordinates = ({
  primaryAccession,
  title,
}: GenomicCoordinatesProps) => {
  const { loading, data, progress, error, status } = useDataApi<GenomicEntry>(
    proteinsApi.coordinates(primaryAccession)
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

  if (status === 404 || !data || !data.sequence || !data.gnCoordinate?.length) {
    return (
      <section className="wider-tab-content hotjar-margin">
        {title && <h3>{title}</h3>}
        <div className={tabsStyles['no-data']}>
          No genomic coordinate information available for {primaryAccession}
        </div>
      </section>
    );
  }

  return (
    <section className="wider-tab-content hotjar-margin">
      {title && <h2>{title}</h2>}
      <Message level="info">
        The content of this tab is in beta, feel free to{' '}
        <ContactLink>get in touch</ContactLink> to provide feedback about it
      </Message>
      {data.gnCoordinate.map((coordinates, index) => (
        <Coordinates
          key={coordinates.ensemblTranscriptId}
          index={index}
          coordinates={coordinates}
          taxID={data.taxid}
          currentEntry={primaryAccession}
        />
      ))}
    </section>
  );
};

export default GenomicCoordinates;
