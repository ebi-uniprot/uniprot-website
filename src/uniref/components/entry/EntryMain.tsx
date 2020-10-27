import React, { FC, memo } from 'react';
import { Card } from 'franklin-sites';

import Overview from '../data-views/Overview';
import EntryTitle from '../../../shared/components/entry/EntryTitle';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniRefEntryConfig from '../../config/UniRefEntryConfig';

import { UniRefUIModel } from '../../adapters/uniRefConverter';

type EntryMainProps = {
  transformedData: UniRefUIModel;
};

function arePropsEqual(prevProps: EntryMainProps, nextProps: EntryMainProps) {
  // Do NOT re-render the page, as long as the 'id' value is the same.
  return prevProps.transformedData.id === nextProps.transformedData.id;
}

const EntryMain: FC<EntryMainProps> = ({ transformedData }) => (
  <>
    <ErrorBoundary>
      <Card title={<EntryTitle mainTitle={transformedData.id} />}>
        <Overview transformedData={transformedData} />
      </Card>
    </ErrorBoundary>

    {UniRefEntryConfig.map(({ name, sectionContent }) => (
      <ErrorBoundary key={name}>
        {sectionContent(transformedData)}
      </ErrorBoundary>
    ))}
  </>
);

export default memo(EntryMain, arePropsEqual);
