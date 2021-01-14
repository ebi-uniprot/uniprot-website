import { Fragment, FC } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';
import { Link, generatePath } from 'react-router-dom';
import cn from 'classnames';

import { Location, LocationToPath } from '../../../app/config/urls';

import { Keyword, KeywordUIModel } from '../../utils/KeywordsUtil';

import './styles/keyword-view.scss';

type KeywordListProps = {
  keywords: Keyword[];
  idOnly?: boolean;
  inline?: boolean;
};

type KeywordItempProps = {
  id?: string;
  value?: string;
};

export const KeywordItem: FC<KeywordItempProps> = ({ id, value }) => {
  if (!id || !value) {
    return null;
  }
  return (
    <Link
      to={generatePath(LocationToPath[Location.KeywordsEntry], {
        accession: id,
      })}
    >{` #${value}`}</Link>
  );
};

export const KeywordList: FC<KeywordListProps> = ({
  keywords,
  idOnly,
  inline,
}) => {
  if (!keywords) {
    return null;
  }

  return (
    <ExpandableList
      descriptionString={idOnly ? 'keyword IDs' : 'keywords'}
      className={cn({ 'keyword-view--inline': inline })}
    >
      {keywords.map((keyword, index) => {
        const { id, name } = keyword;
        if (!id || !name) {
          return null;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <KeywordItem id={id} value={idOnly ? id : name} />
          </Fragment>
        );
      })}
    </ExpandableList>
  );
};

const KeywordView: FC<{ keywords: KeywordUIModel[] }> = ({ keywords }) => {
  if (!keywords?.length) {
    return null;
  }
  const infoData = keywords.map((keywordCategory) => ({
    title: keywordCategory.category,
    content: <KeywordList keywords={keywordCategory.keywords} />,
  }));
  if (infoData.length === 0) {
    return null;
  }
  return (
    <>
      <h3>Keywords</h3>
      <InfoList infoData={infoData} />
    </>
  );
};

export default KeywordView;
