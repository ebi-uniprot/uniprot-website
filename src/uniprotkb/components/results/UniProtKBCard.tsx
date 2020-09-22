/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import { getKeywordsForCategories } from '../../utils/KeywordsUtil';
import KeywordCategory from '../../types/keywordCategory';
import { KeywordList } from '../protein-data-views/KeywordView';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import AnnotationScoreDoughnutChart, {
  DoughnutChartSize,
} from '../protein-data-views/AnnotationScoreDoughnutChart';
import getProteinHighlights from '../../adapters/proteinHighlights';

import './styles/uniprotkb-card.scss';

const UniProtKBCard: FC<
  {
    data: UniProtkbAPIModel;
    selected: boolean;
    handleEntrySelection: (rowId: string) => void;
  } & RouteComponentProps
> = ({ data, selected, handleEntrySelection, history }): JSX.Element => {
  let recommendedNameNode;
  const recommendedName =
    data.proteinDescription?.recommendedName?.fullName.value;
  if (recommendedName) {
    recommendedNameNode = `${recommendedName} · `;
  }

  const highlights = getProteinHighlights(data);

  const organismNameNode = (
    <>
      <a href="#">{data.organism?.scientificName}</a>
      {' · '}
    </>
  );

  let geneNameListNode;
  if (data.genes) {
    geneNameListNode = (
      <>
        {'Gene: '}
        {data.genes
          .filter((geneName) => geneName.geneName)
          .map((geneName) => geneName.geneName && geneName.geneName.value)
          .join(', ')}
        {' · '}
      </>
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
            checked={selected}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleEntrySelection(data.primaryAccession)}
            data-testid="up-card-checkbox"
          />
        </section>
        <section className="uniprot-card__right">
          <h5>
            <EntryTitle
              mainTitle={data.primaryAccession}
              optionalTitle={data.uniProtkbId}
              entryType={data.entryType}
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

export default withRouter(UniProtKBCard);
