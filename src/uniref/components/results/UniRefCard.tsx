import { Card } from 'franklin-sites';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import RenderColumnsInCard from '../../../shared/components/results/RenderColumnsInCard';
import BasketStatus from '../../../basket/BasketStatus';
import CardCheckboxCell from '../../../shared/components/CardCheckboxCell';

import { getEntryPath } from '../../../app/config/urls';
import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';

import UniRefColumnConfiguration, {
  UniRefColumn,
} from '../../config/UniRefColumnConfiguration';

import { Namespace } from '../../../shared/types/namespaces';
import { UniRefLiteAPIModel } from '../../adapters/uniRefConverter';

const getIdKey = getIdKeyFor(Namespace.uniref);

const mainInfoColumns = [
  UniRefColumn.name,
  UniRefColumn.count,
  UniRefColumn.length,
  UniRefColumn.identity,
].map((column) => UniRefColumnConfiguration.get(column));

const UniRefCard = ({ data }: { data: UniRefLiteAPIModel }) => {
  const id = getIdKey(data);

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="tiny">
            <EntryTitle mainTitle={id} entryType={data.memberIdTypes} />
          </h2>
          <BasketStatus id={id} />
        </>
      }
      headerSeparator={false}
      to={getEntryPath(Namespace.uniref, id)}
    >
      <RenderColumnsInCard data={data} renderers={mainInfoColumns} />
    </Card>
  );
};

export default UniRefCard;
