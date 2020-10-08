import React, { FC, memo } from 'react';
import { Card } from 'franklin-sites';

import Overview from '../protein-data-views/ProteinOverviewView';
import EntryTitle from '../../../shared/components/entry/EntryTitle';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';

type EntryMainProps = {
  transformedData: UniProtkbUIModel;
};

function arePropsEqual(prevProps: EntryMainProps, nextProps: EntryMainProps) {
  // Do NOT re-render the page, as long as the 'accession' value is the same.
  return (
    prevProps.transformedData.primaryAccession ===
    nextProps.transformedData.primaryAccession
  );
}

const EntryMain: FC<EntryMainProps> = ({ transformedData }) => (
  <>
    <ErrorBoundary>
      <Card
        title={
          <EntryTitle
            mainTitle={transformedData.primaryAccession}
            optionalTitle={transformedData.uniProtkbId}
            entryType={transformedData.entryType}
          />
        }
      >
        <Overview transformedData={transformedData} />
      </Card>
    </ErrorBoundary>

    {UniProtKBEntryConfig.map(({ name, sectionContent }) => (
      <ErrorBoundary key={name}>
        {sectionContent(transformedData)}
      </ErrorBoundary>
    ))}
  </>
);

export default memo(EntryMain, arePropsEqual);
