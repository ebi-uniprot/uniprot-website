import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList } from 'franklin-sites';
import { Link } from 'react-router-dom';
import { Keyword, KeywordUIModel } from '../../../model/utils/KeywordsUtil';

type KeywordListProps = {
  keywords: Keyword[];
  idOnly?: boolean;
};

type KeywordItempProps = {
  id?: string;
  value?: string;
};

export const KeywordItem: React.FC<KeywordItempProps> = ({ id, value }) => {
  if (!id || !value) {
    return null;
  }
  return <Link to={`/keywords/${id}`}>{` #${value}`}</Link>;
};

export const KeywordList: React.FC<KeywordListProps> = ({
  keywords,
  idOnly = false,
}) => {
  if (!keywords) {
    return null;
  }
  const nodes = keywords.map((keyword, index) => {
    const { id, name } = keyword;
    if (!id || !name) {
      return null;
    }
    return (
      <Fragment key={v1()}>
        <KeywordItem id={id} value={idOnly ? id : name} />
        {index < keywords.length - 1 && ' '}
      </Fragment>
    );
  });

  return <Fragment>{nodes}</Fragment>;
};

const KeywordView: React.FC<{ keywords: KeywordUIModel[] }> = ({
  keywords,
}) => {
  if (!keywords || keywords.length <= 0) {
    return null;
  }
  const infoData = keywords.map(keywordCategory => ({
    title: keywordCategory.category,
    content: <KeywordList keywords={keywordCategory.keywords} />,
  }));
  if (infoData.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <h3>Keywords</h3>
      <InfoList infoData={infoData} />
    </Fragment>
  );
};

export default KeywordView;
