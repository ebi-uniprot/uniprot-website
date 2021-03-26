import { Card } from 'franklin-sites';
import { FC, useCallback, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';

import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../../app/config/urls';

import { LocationsAPIModel } from '../../adapters/locationsConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import LocationsColumnConfiguration, {
  LocationsColumn,
} from '../../config/LocationsColumnConfiguration';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

const BLOCK_CLICK_ON_CARD = new Set(['A', 'INPUT', 'BUTTON']);

const category = LocationsColumnConfiguration.get(LocationsColumn.category);

const CitationCard: FC<{
  data: LocationsAPIModel;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }) => {
  const history = useHistory();

  const handleCardClick = useCallback(
    (event: MouseEvent) => {
      if (BLOCK_CLICK_ON_CARD.has((event.target as HTMLElement).tagName)) {
        return;
      }
      history.push(getEntryPath(Namespace.locations, data.id));
    },
    [history, data.id]
  );

  return (
    <Card onClick={handleCardClick}>
      <div className="result-card">
        {handleEntrySelection && (
          <div className="result-card__left">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => handleEntrySelection(data.id)}
              data-testid="up-card-checkbox"
            />
          </div>
        )}
        <div className="result-card__right">
          <h5>{data.name}</h5>
          <div
            className={renderColumnsInCardStyles['result-card__info-container']}
          >
            {data.definition}
          </div>
          <RenderColumnsInCard renderers={category} data={data} />
        </div>
      </div>
    </Card>
  );
};

export default CitationCard;
