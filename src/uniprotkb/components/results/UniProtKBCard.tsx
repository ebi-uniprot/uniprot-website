import { useMemo } from 'react';
import { Card } from 'franklin-sites';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import { KeywordList } from '../protein-data-views/KeywordView';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';
import BasketStatus from '../../../basket/BasketStatus';
import CardCheckboxCell from '../../../shared/components/CardCheckboxCell';

import getProteinHighlights from '../../adapters/proteinHighlights';
import { getEntryPath } from '../../../app/config/urls';
import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';

import { Namespace } from '../../../shared/types/namespaces';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

const getIdKey = getIdKeyFor(Namespace.uniprotkb);

const UniProtKBCard = ({ data }: { data: UniProtkbAPIModel }) => {
  const id = getIdKey(data);

  const highlights = useMemo(() => getProteinHighlights(data), [data]);

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="tiny">
            <EntryTitle
              mainTitle={id}
              optionalTitle={data.uniProtkbId}
              entryType={data.entryType}
            />
          </h2>
          <BasketStatus id={id} />
        </>
      }
      headerSeparator={false}
      to={getEntryPath(Namespace.uniprotkb, id)}
      links={highlights}
    >
      <ProteinOverview data={data} />
      {data.keywords && (
        <small>
          <KeywordList keywords={data.keywords} inline />
        </small>
      )}
    </Card>
  );
};

export default UniProtKBCard;
