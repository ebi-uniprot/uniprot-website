/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import idx from 'idx';
import { SwissProtIcon, TremblIcon, Bubble, InfoList } from 'franklin-sites';
import {
  UniProtkbAPIModel,
  EntryType,
} from '../../../model/uniprotkb/UniProtkbConverter';
import './styles/UniProtCard.scss';
import { getKeywordsForCategories } from '../../../model/utils/KeywordsUtil';
import KeywordCategory from '../../../model/types/KeywordCategory';
import convertGeneNames from '../../../model/uniprotkb/GeneNamesConverter';
import GeneNamesView from './GeneNamesView';
import { KeywordList } from './KeywordView';

const UniProtCard: FC<{ data: UniProtkbAPIModel }> = ({
  data,
}): JSX.Element => {
  const recommendedName = idx(
    data,
    (_): string => _.proteinDescription.recommendedName.fullName.value
  );
  const organismName = idx(data, (_): string => _.organism.scientificName);

  const infoListData: { title: string; content: JSX.Element | string }[] = [];
  if (data.genes) {
    const convertedGeneNames = convertGeneNames(data.genes);
    if (
      convertedGeneNames.name ||
      convertedGeneNames.alternativeNames.length > 0
    ) {
      infoListData.push({
        title: 'Gene',
        content: <GeneNamesView {...convertedGeneNames} />,
      });
    }
  }

  if (data.keywords) {
    const categorisedKewywords = getKeywordsForCategories(data.keywords, [
      KeywordCategory.MOLECULAR_FUNCTION,
      KeywordCategory.BIOLOGICAL_PROCESS,
      KeywordCategory.DISEASE,
    ]);

    if (categorisedKewywords.length > 0) {
      infoListData.push({
        title: 'Keywords',
        content: (
          <Fragment>
            {categorisedKewywords.map((keywordCategory, index) => (
              <Fragment key={keywordCategory.category}>
                {index > 0 && ' ·  '}
                <KeywordList keywords={keywordCategory.keywords} />
              </Fragment>
            ))}
          </Fragment>
        ),
      });
    }
  }

  return (
    <div className="uniprot-card">
      <h5>
        {data.entryType === EntryType.SWISSPROT ? (
          <span className="uniprot-card__status icon--reviewed">
            <SwissProtIcon />
          </span>
        ) : (
          <span className="uniprot-card__status icon--unreviewed">
            <TremblIcon />
          </span>
        )}
        <Link to={`/uniprotkb/${data.primaryAccession}`}>
          {data.primaryAccession}
        </Link>
        {' '}
        {data.uniProtId}
      </h5>
      <p>
        {recommendedName && `${recommendedName} · `}
        <a href="#">{organismName}</a>
        {` · ${data.sequence.length} amino-acids`}
        {` · `}
        <Bubble
          value={data.annotationScore}
          size="small"
          title="Annotation score"
        />
      </p>
      <InfoList infoData={infoListData} />
    </div>
  );
};

export default UniProtCard;
