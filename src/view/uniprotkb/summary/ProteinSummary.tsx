import React, { FC, Fragment } from 'react';
import { Loader, Card } from 'franklin-sites';
import useDataApi from '../../../utils/useDataApi';
import apiUrls from '../../../utils/apiUrls';
import UniProtTitle from '../components/UniProtTitle';
import ProteinHighlights from './ProteinHighlights';
import uniProtKbConverter, {
  UniProtkbUIModel,
} from '../../../model/uniprotkb/UniProtkbConverter';
import ProteinOverview from '../components/ProteinOverviewView';
import FreeTextView from '../components/FreeTextView';
import EntrySection from '../../../model/types/EntrySection';
import { CommentType, FreeText } from '../../../model/types/CommentTypes';

const ProteinSummary: FC<{ accession: string }> = ({ accession }) => {
  const url = apiUrls.entry(accession);
  const entryData = useDataApi(url);
  if (Object.keys(entryData).length === 0) {
    return <Loader />;
  }
  const transformedData: UniProtkbUIModel = uniProtKbConverter(entryData);
  const title = (
    <UniProtTitle
      primaryAccession={entryData.primaryAccession}
      entryType={entryData.entryType}
      uniProtId={entryData.uniProtId}
    />
  );
  return (
    <Fragment>
      <Card title={title}>
        <ProteinOverview transformedData={transformedData} />
        <FreeTextView
          comments={
            transformedData[EntrySection.FamilyAndDomains].commentsData.get(
              CommentType.SIMILARITY
            ) as FreeText[]
          }
          includeTitle
        />
        <ProteinHighlights data={entryData} />
      </Card>
    </Fragment>
  );
};

export default ProteinSummary;
