import { createContext, Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import MedicalDisclaimer from '../../../shared/components/MedicalDisclaimer';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';

export const IsoformsContext = createContext<string[] | undefined>(undefined);

type EntryMainProps = {
  transformedData: UniProtkbUIModel;
  importedVariants: number | 'loading';
  hasGenomicCoordinates: boolean | 'loading';
  isoforms?: string[];
};

const EntryMain = ({
  transformedData,
  importedVariants,
  hasGenomicCoordinates,
  isoforms,
}: EntryMainProps) => (
  <IsoformsContext.Provider value={isoforms}>
    {UniProtKBEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>
          {sectionContent(
            transformedData,
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
