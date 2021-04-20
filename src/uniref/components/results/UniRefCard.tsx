import { FC, useCallback } from 'react';
import { Card } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import RenderColumnsInCard from '../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../app/config/urls';
import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';

import UniRefColumnConfiguration, {
  UniRefColumn,
} from '../../config/UniRefColumnConfiguration';

import { Namespace } from '../../../shared/types/namespaces';
import { UniRefLiteAPIModel } from '../../adapters/uniRefConverter';

import '../../../shared/components/results/styles/result-card.scss';

const getIdKey = getIdKeyFor(Namespace.uniref);

type Props = {
  data: UniRefLiteAPIModel;
  selected?: boolean;
  handleEntrySelection: (rowId: string) => void;
};

const mainInfoColumns = [
  UniRefColumn.name,
  UniRefColumn.count,
  UniRefColumn.length,
  UniRefColumn.identity,
].map((column) => UniRefColumnConfiguration.get(column));

const UniRefCard: FC<Props> = ({ data, selected, handleEntrySelection }) => {
  const history = useHistory();

  const id = getIdKey(data);

  const handleCardClick = useCallback(
    (event) => {
      if ((event.target as HTMLElement).closest(`a, input, button`)) {
        return;
      }
      history.push(getEntryPath(Namespace.uniref, id));
    },
    [history, id]
  );

  return (
    <Card onClick={handleCardClick}>
      <div className="result-card">
        <div className="result-card__left">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => handleEntrySelection(id)}
            data-testid="up-card-checkbox"
          />
        </div>
        <div className="result-card__right">
          <h5>
            <EntryTitle mainTitle={id} entryType={data.memberIdTypes} />
          </h5>
          <RenderColumnsInCard data={data} renderers={mainInfoColumns} />
        </div>
      </div>
    </Card>
  );
};

export default UniRefCard;
