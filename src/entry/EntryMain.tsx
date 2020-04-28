import React, { Fragment, memo } from 'react';
import { Card } from 'franklin-sites';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import { ProteinOverview } from '../view/uniprotkb/components/ProteinOverviewView';
import { UniProtkbUIModel } from '../model/uniprotkb/UniProtkbConverter';
import UniProtTitle from '../view/uniprotkb/components/UniProtTitle';

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

const EntryMain: React.FC<EntryMainProps> = ({ transformedData }) => (
  <Fragment>
    <Card
      title={
        <UniProtTitle
          primaryAccession={transformedData.primaryAccession}
          entryType={transformedData.entryType}
          uniProtkbId={transformedData.uniProtkbId}
        />
      }
    >
      <ProteinOverview transformedData={transformedData} />
    </Card>
    {UniProtKBEntryConfig.map(({ sectionContent }) =>
      sectionContent(transformedData)
    )}
  </Fragment>
);

export default memo(EntryMain, arePropsEqual);
