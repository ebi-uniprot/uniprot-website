import { Loader } from 'franklin-sites';
import { Suspense } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import { type TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import UniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';

type EntryMainProps = {
  transformedData: UniParcSubEntryUIModel;
  lineageData?: TaxonomyAPIModel;
  proteomeComponentObject?: Record<string, string>;
};

const SubEntryMain = ({
  transformedData,
  lineageData,
  proteomeComponentObject,
}: EntryMainProps) => (
  <>
    {Object.values(UniParcSubEntryConfig).map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>
          {sectionContent(transformedData, {
            lineageData,
            proteomeComponentObject,
          })}
        </ErrorBoundary>
      </Suspense>
    ))}
  </>
);

export default SubEntryMain;
