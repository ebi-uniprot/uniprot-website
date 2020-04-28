/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, Fragment } from 'react';
import idx from 'idx';
import { Card } from 'franklin-sites';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { UniProtkbAPIModel } from '../../../model/uniprotkb/UniProtkbConverter';
import { getKeywordsForCategories } from '../../../model/utils/KeywordsUtil';
import KeywordCategory from '../../../model/types/KeywordCategory';
import { KeywordList } from './KeywordView';
import UniProtTitle from './UniProtTitle';
import AnnotationScoreDoughnutChart, {
  DoughnutChartSize,
} from './AnnotationScoreDoughnutChart';
import getProteinHighlights from '../../../model/uniprotkb/summary/ProteinHighlights';
import { SelectedEntries } from '../../../results/types/resultsTypes';
import './styles/UniProtCard.scss';

const UniProtCard: FC<{
  data: UniProtkbAPIModel;
  selectedEntries: SelectedEntries;
  handleEntrySelection: (rowId: string) => void;
} & RouteComponentProps> = ({
  data,
  selectedEntries,
  handleEntrySelection,
  history,
}): JSX.Element => {
  let recommendedNameNode;
  const recommendedName = idx(
    data,
    (_): string => _.proteinDescription.recommendedName.fullName.value
  );
  if (recommendedName) {
    recommendedNameNode = `${recommendedName} · `;
  }

  const highlights = getProteinHighlights(data);

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

  return (
    <Card
      links={highlights}
      onClick={() => history.push(`/uniprotkb/${data.primaryAccession}`)}
    >
      <section className="uniprot-card">
        <section className="uniprot-card__left">
          <input
            type="checkbox"
            checked={
              selectedEntries[data.primaryAccession]
                ? selectedEntries[data.primaryAccession]
                : false
            }
            onClick={e => e.stopPropagation()}
            onChange={() => handleEntrySelection(data.primaryAccession)}
            data-testid="up-card-checkbox"
          />
        </section>
        <section className="uniprot-card__right">
          <h5>
            <UniProtTitle
              primaryAccession={data.primaryAccession}
              entryType={data.entryType}
              uniProtkbId={data.uniProtkbId}
            />
          </h5>
          <section>
            {recommendedNameNode}
            {organismNameNode}
            {geneNameListNode}
            {sequenceLengthNode}
            {annotationScoreNode}
          </section>
          <section>
            <small>{keywordsNode}</small>
          </section>
        </section>
      </section>
    </Card>
  );
};

export default withRouter(UniProtCard);
