import { Loader } from 'franklin-sites';
import joinUrl from 'url-join';

import useDataApi from '../../../../../shared/hooks/useDataApi';
// import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';

import apiUrls from '../../../../../shared/config/apiUrls';

import tabsStyles from '../styles/tabs-styles.module.scss';
import { GenomicEntry } from './types';
import Coordinates from './Coordinates';

type GenomicCoordinatesProps = {
  primaryAccession: string;
  title?: string;
};

const GenomicCoordinates = ({
  primaryAccession,
  title,
}: GenomicCoordinatesProps) => {
  // const isSmallScreen = useSmallScreen();

  const { loading, data, progress, error, status } = useDataApi<GenomicEntry>(
    joinUrl(apiUrls.coordinates, primaryAccession)
  );

  if (loading) {
    return (
      <div>
        {title && <h3>{title}</h3>}
        <Loader progress={progress} />
      </div>
    );
  }

  if (error && status !== 404) {
    // TODO: use in-page error message
    return <div>An error happened</div>;
  }

  console.log(data);

  if (status === 404 || !data || !data.sequence || !data.gnCoordinate?.length) {
    return (
      <section className="wider-tab-content hotjar-margin">
        {title && <h3>{title}</h3>}
        <div className={tabsStyles['no-data']}>
          No genomic coordinates information available for {primaryAccession}
        </div>
      </section>
    );
  }

  return (
    <section className="wider-tab-content hotjar-margin">
      {title && <h2>{title}</h2>}
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
