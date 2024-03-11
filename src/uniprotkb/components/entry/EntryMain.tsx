import { Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import MedicalDisclaimer from '../../../shared/components/MedicalDisclaimer';

import { IsoformsContext } from '../../../shared/contexts/Isoforms';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';
import { Reference } from '../../../supporting-data/citations/adapters/citationsConverter';

type EntryMainProps = {
  transformedData: UniProtkbUIModel;
  importedVariants: number | 'loading';
  hasGenomicCoordinates: boolean | 'loading';
  communityReferences: Reference[];
  isoforms?: string[];
};

const EntryMain = ({
  transformedData,
  importedVariants,
  hasGenomicCoordinates,
  communityReferences,
  isoforms,
}: EntryMainProps) => (
  <IsoformsContext.Provider value={isoforms}>
    {UniProtKBEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>
          {sectionContent(
            transformedData,
            communityReferences,
            importedVariants,
            hasGenomicCoordinates
          )}
        </ErrorBoundary>
      </Suspense>
    ))}
    <MedicalDisclaimer />
  </IsoformsContext.Provider>
);

export default EntryMain;
