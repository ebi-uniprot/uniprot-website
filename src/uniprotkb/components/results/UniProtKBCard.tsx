import { Card } from 'franklin-sites';
import { memo } from 'react';
import { Link } from 'react-router';

import { getEntryPath } from '../../../app/config/urls';
import BasketStatus from '../../../basket/BasketStatus';
import CardCheckboxCell from '../../../shared/components/CardCheckboxCell';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import { Namespace } from '../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../shared/utils/getIdKey';
import getProteinHighlights from '../../adapters/proteinHighlights';
import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import { TabLocation } from '../../types/entry';
import { getKeywordsForCategories } from '../../utils/KeywordsUtil';
import { KeywordList } from '../protein-data-views/KeywordView';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';

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
            <Link to={getEntryPath(Namespace.uniprotkb, id, TabLocation.Entry)}>
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
