import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { FreeText } from '../../model/FreeText';
import { CatalyticActivity } from '../../model/CatalyticActivity';
import { Keyword } from '../../model/Keyword';
import { XRef } from '../../model/XRef';
import FeaturesView from '../../model/FeaturesView';
import EntrySectionType from '../../model/types/EntrySection';
import { isEmpty } from '../../model/utils/utils';

const FunctionSection: FC<{ data }> = ({ data }) => {
  const functionData = data[EntrySectionType.Function];
  if (isEmpty(functionData)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySectionType.Function}>
        <FreeText comments={functionData.functionCommentsData} />
        <CatalyticActivity comments={functionData.catalyticActivityData} />
        <FreeText
          comments={functionData.pathwayCommentsData}
          includeTitle={true}
        />
        <Keyword keywords={functionData.keywordData} />
        <FeaturesView
          features={functionData.featuresData}
          sequence={data.sequence}
        />
        <XRef
          xrefs={functionData.xrefData}
          primaryAccession={data.primaryAccession}
        />
      </Card>
    </Fragment>
  );
};

export default FunctionSection;
