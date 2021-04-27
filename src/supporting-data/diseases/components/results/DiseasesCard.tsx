import { FC, useCallback, MouseEvent, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'franklin-sites';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';
import { mapToLinks } from '../../../shared/components/MapTo';

import { DiseasesAPIModel } from '../../adapters/diseasesConverter';
import { Namespace } from '../../../../shared/types/namespaces';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

const getIdKey = getIdKeyFor(Namespace.diseases);

const DiseasesCard: FC<{
  data: DiseasesAPIModel;
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
      history.push(getEntryPath(Namespace.diseases, id));
    },
    [history, id]
  );

  const links = useMemo(
    () => mapToLinks(Namespace.diseases, id, data.statistics),
    [data.statistics, id]
  );

  return (
    <Card onClick={handleCardClick} links={links}>
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
          <h5>{data.name}</h5>
          <div
            className={renderColumnsInCardStyles['result-card__info-container']}
          >
            {data.definition}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DiseasesCard;
