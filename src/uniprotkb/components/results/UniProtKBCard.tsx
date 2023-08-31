import { memo } from 'react';
import { Card } from 'franklin-sites';
import { Link } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import { KeywordList } from '../protein-data-views/KeywordView';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';
import BasketStatus from '../../../basket/BasketStatus';
import CardCheckboxCell from '../../../shared/components/CardCheckboxCell';

import getProteinHighlights from '../../adapters/proteinHighlights';
import { getKeywordsForCategories } from '../../utils/KeywordsUtil';
import { getEntryPath } from '../../../app/config/urls';
import { getIdKeyForNamespace } from '../../../shared/utils/getIdKey';

import { Namespace } from '../../../shared/types/namespaces';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

const getIdKey = getIdKeyForNamespace(Namespace.uniprotkb);

type Props = {
  data: UniProtkbAPIModel;
  isNotSelectable?: boolean;
};

const UniProtKBCard = ({ data, isNotSelectable }: Props) => {
  const id = getIdKey(data);

  const highlights = getProteinHighlights(data);

  const keywords =
    data.keywords &&
    getKeywordsForCategories(data.keywords, [
      'Molecular function',
      'Biological process',
      'Disease',
    ]).flatMap(({ keywords }) => keywords);

  return (
    <Card
      header={
        <>
          {isNotSelectable ? null : <CardCheckboxCell id={id} />}
          <h2 className="small">
            <Link to={getEntryPath(Namespace.uniprotkb, id)}>
              <EntryTitle
                mainTitle={id}
                optionalTitle={data.uniProtkbId}
                entryType={data.entryType}
              />
            </Link>
          </h2>
          <BasketStatus id={id} className="tiny" />
        </>
      }
      headerSeparator={false}
      links={highlights}
    >
      <ProteinOverview data={data} inCard />
      {keywords?.length ? (
        <small>
          <KeywordList keywords={keywords} inline />
        </small>
      ) : null}
    </Card>
  );
};

export default memo(UniProtKBCard);
