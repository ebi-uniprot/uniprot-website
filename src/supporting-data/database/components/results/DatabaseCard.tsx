import { Card } from 'franklin-sites';
import { FC, useCallback, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';

import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';

import { DatabaseAPIModel } from '../../adapters/databaseConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import DatabaseColumnConfiguration, {
  DatabaseColumn,
} from '../../config/DatabaseColumnConfiguration';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

const category = DatabaseColumnConfiguration.get(DatabaseColumn.category);

const getIdKey = getIdKeyFor(Namespace.database);

const DatabaseCard: FC<{
  data: DatabaseAPIModel;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }) => {
  const history = useHistory();

  const id = getIdKey(data);

  const handleCardClick = useCallback(
    (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(`a, input, button`)) {
        return;
      }
      history.push(getEntryPath(Namespace.database, id));
    },
    [history, id]
  );

  return (
    <Card onClick={handleCardClick}>
      <div className="result-card">
        {handleEntrySelection && (
          <div className="result-card__left">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => handleEntrySelection(id)}
              data-testid="up-card-checkbox"
            />
          </div>
        )}
        <div className="result-card__right">
          <h5>{data.abbrev}</h5>
          <div
            className={renderColumnsInCardStyles['result-card__info-container']}
          >
            {data.name}
          </div>
          <RenderColumnsInCard renderers={category} data={data} />
        </div>
      </div>
    </Card>
  );
};

export default DatabaseCard;
