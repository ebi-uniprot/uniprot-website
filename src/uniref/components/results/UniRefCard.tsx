import { FC, useCallback } from 'react';
import { Card } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import RenderColumnsInCard from '../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../app/config/urls';

import UniRefColumnConfiguration, {
  UniRefColumn,
} from '../../config/UniRefColumnConfiguration';

import { Namespace } from '../../../shared/types/namespaces';
import { UniRefLiteAPIModel } from '../../adapters/uniRefConverter';

import '../../../shared/components/results/styles/result-card.scss';

const BLOCK_CLICK_ON_CARD = new Set(['A', 'INPUT', 'BUTTON']);

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

  const handleCardClick = useCallback(
    (event) => {
      if (BLOCK_CLICK_ON_CARD.has((event.target as HTMLElement).tagName)) {
        return;
      }
      history.push(getEntryPath(Namespace.uniref, data.id));
    },
    [history, data.id]
  );

  return (
    <Card onClick={handleCardClick}>
      <div className="result-card">
        <div className="result-card__left">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => handleEntrySelection(data.id)}
            data-testid="up-card-checkbox"
          />
        </div>
        <div className="result-card__right">
          <h5>
            <EntryTitle mainTitle={data.id} entryType={data.memberIdTypes} />
          </h5>
          <RenderColumnsInCard data={data} renderers={mainInfoColumns} />
        </div>
      </div>
    </Card>
  );
};

export default UniRefCard;
