/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, Fragment } from 'react';
import idx from 'idx';
import { UniProtkbAPIModel } from '../../../model/uniprotkb/UniProtkbConverter';
import { getKeywordsForCategories } from '../../../model/utils/KeywordsUtil';
import { truncateStringWithEllipsis } from '../../../utils/utils';
import KeywordCategory from '../../../model/types/KeywordCategory';
import { KeywordList } from './KeywordView';
import UniProtTitle from './UniProtTitle';
import AnnotationScoreDoughnutChart, {
  DoughnutChartSize,
} from './AnnotationScoreDoughnutChart';
import { CommentType, FreeText } from '../../../model/types/CommentTypes';

const CHAR_LENGTH_FUNCTION_SUMMARY = 150;

const UniProtCard: FC<{
  data: UniProtkbAPIModel;
}> = ({ data }): JSX.Element => {
  let recommendedNameNode;
  const recommendedName = idx(
    data,
    (_): string => _.proteinDescription.recommendedName.fullName.value
  );
  if (recommendedName) {
    recommendedNameNode = `${recommendedName} · `;
  }

  const organismNameNode = (
    <Fragment>
      <a href="#">{idx(data, (_): string => _.organism.scientificName)}</a>
      {' · '}
    </Fragment>
  );

  let geneNameListNode;
  if (data.genes) {
    geneNameListNode = (
      <Fragment>
        {'Gene: '}
        {data.genes
          .filter(geneName => geneName.geneName)
          .map(geneName => geneName.geneName && geneName.geneName.value)
          .join(', ')}
        {' · '}
      </Fragment>
    );
  }

  const sequenceLengthNode = `${data.sequence.length} amino-acids · `;

  const { annotationScore } = data;
  const annotationScoreNode = (
    <AnnotationScoreDoughnutChart
      score={annotationScore}
      size={DoughnutChartSize.small}
    />
  );

  let keywordsNode;
  if (data.keywords) {
    const categorisedKewywords = getKeywordsForCategories(data.keywords, [
      KeywordCategory.MOLECULAR_FUNCTION,
      KeywordCategory.BIOLOGICAL_PROCESS,
      KeywordCategory.DISEASE,
    ]);

    if (categorisedKewywords.length > 0) {
      keywordsNode = categorisedKewywords.map((keywordCategory, index) => (
        <Fragment key={keywordCategory.category}>
          {index > 0 && ' · '}
          <KeywordList keywords={keywordCategory.keywords} />
        </Fragment>
      ));
    }
  }

  let functionNode;
  const firstCommentType = idx(data, (_): string => _.comments[0].commentType);
  if (data.comments && firstCommentType === CommentType.FUNCTION) {
    const firstComment = data.comments[0] as FreeText;
    const firstCommentValue = idx(
      firstComment,
      (_): string => _.texts[0].value
    );
    if (firstCommentValue) {
      functionNode = truncateStringWithEllipsis(
        firstCommentValue,
        CHAR_LENGTH_FUNCTION_SUMMARY
      );
    }
  }

  return (
    <div>
      <h4>
        <UniProtTitle
          primaryAccession={data.primaryAccession}
          entryType={data.entryType}
          uniProtId={data.uniProtId}
        />
      </h4>
      <p>
        {recommendedNameNode}
        {organismNameNode}
        {geneNameListNode}
        {sequenceLengthNode}
        {annotationScoreNode}
      </p>
      <p>{functionNode}</p>
      <p>{keywordsNode}</p>
    </div>
  );
};

export default UniProtCard;
