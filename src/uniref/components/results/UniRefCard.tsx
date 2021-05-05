import { Card } from 'franklin-sites';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import RenderColumnsInCard from '../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../app/config/urls';
import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';

import UniRefColumnConfiguration, {
  UniRefColumn,
} from '../../config/UniRefColumnConfiguration';

import { Namespace } from '../../../shared/types/namespaces';
import { UniRefLiteAPIModel } from '../../adapters/uniRefConverter';

const getIdKey = getIdKeyFor(Namespace.uniref);

type Props = {
  data: UniRefLiteAPIModel;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
};

const mainInfoColumns = [
  UniRefColumn.name,
  UniRefColumn.count,
  UniRefColumn.length,
  UniRefColumn.identity,
].map((column) => UniRefColumnConfiguration.get(column));

const UniRefCard = ({ data, selected, handleEntrySelection }: Props) => {
  const id = getIdKey(data);

  return (
    <Card
      header={
        <>
          {handleEntrySelection && (
            <input
              type="checkbox"
              checked={selected}
              onChange={() => handleEntrySelection(id)}
              data-testid="up-card-checkbox"
            />
          )}
          <h2 className="tiny">
            <EntryTitle mainTitle={id} entryType={data.memberIdTypes} />
          </h2>
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
