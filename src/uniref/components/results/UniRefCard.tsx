import { Card } from 'franklin-sites';
import { Link } from 'react-router';

import { getEntryPath } from '../../../app/config/urls';
import BasketStatus from '../../../basket/BasketStatus';
import CardCheckboxCell from '../../../shared/components/CardCheckboxCell';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import RenderColumnsInCard from '../../../shared/components/results/RenderColumnsInCard';
import { Namespace } from '../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../shared/utils/getIdKey';
import { UniRefLiteAPIModel } from '../../adapters/uniRefConverter';
import UniRefColumnConfiguration, {
  UniRefColumn,
} from '../../config/UniRefColumnConfiguration';

const getIdKey = getIdKeyForNamespace(Namespace.uniref);

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
          <h2 className="small">
            <Link to={getEntryPath(Namespace.uniref, id)}>
              <EntryTitle mainTitle={id} entryType={data.memberIdTypes} />
            </Link>
          </h2>
          <BasketStatus id={id} className="tiny" />
        </>
      }
      headerSeparator={false}
    >
      <RenderColumnsInCard data={data} renderers={mainInfoColumns} />
    </Card>
  );
};

export default UniRefCard;
