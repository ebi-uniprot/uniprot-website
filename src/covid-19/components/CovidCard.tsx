import { useMemo, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'franklin-sites';

import EntryTitle from '../../shared/components/entry/EntryTitle';
import { KeywordList } from '../../uniprotkb/components/protein-data-views/KeywordView';
import ProteinOverview from '../../uniprotkb/components/protein-data-views/ProteinOverviewView';

import getProteinHighlights from '../../uniprotkb/adapters/proteinHighlights';
import { getKeywordsForCategories } from '../../uniprotkb/utils/KeywordsUtil';
import { getIdKeyFor } from '../../shared/utils/getIdKeyForNamespace';
import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { getEntryPath } from '../../app/config/urls';

import { Namespace } from '../../shared/types/namespaces';

import styles from './style/covid-card.module.scss';

const getIdKey = getIdKeyFor(Namespace.uniprotkb);

const CovidCard = ({ data }: { data: UniProtkbAPIModel }) => {
  const id = getIdKey(data);

  const highlights = useMemo(() => getProteinHighlights(data), [data]);

  const keywordsNode = useMemo(() => {
    if (!data.keywords) {
      return null;
    }

    const categorisedKeywords = getKeywordsForCategories(data.keywords, [
      'Molecular function',
      'Biological process',
      'Disease',
    ]);

    return categorisedKeywords.map((keywordCategory, index) => (
      <Fragment key={keywordCategory.category}>
        {index > 0 && ' · '}
        <KeywordList keywords={keywordCategory.keywords} inline />
      </Fragment>
    ));
  }, [data.keywords]);

  const handleCardClick = (id: string) => {
    console.log(id);
    // TODO emit event to minerva
  };

  return (
    <Card
      id={`acc_${data.primaryAccession}`}
      tabIndex={0}
      className={styles['covid-card']}
      header={
        <>
          <h2 className="tiny">
            <Link to={getEntryPath(Namespace.uniprotkb, data.primaryAccession)}>
              <EntryTitle
                mainTitle={id}
                optionalTitle={data.uniProtkbId}
                entryType={data.entryType}
              />
            </Link>
          </h2>
        </>
      }
      headerSeparator={false}
      onClick={() => handleCardClick(id)}
      links={highlights}
    >
      <ProteinOverview data={data} />
      <small>{keywordsNode}</small>
    </Card>
  );
};

export default CovidCard;
