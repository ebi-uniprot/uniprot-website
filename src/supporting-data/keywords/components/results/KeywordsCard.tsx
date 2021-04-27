import { FC, useCallback, MouseEvent, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'franklin-sites';

import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';
import { mapToLinks } from '../../../shared/components/MapTo';

import { KeywordsAPIModel } from '../../adapters/keywordsConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import KeywordsColumnConfiguration, {
  KeywordsColumn,
} from '../../config/KeywordsColumnConfiguration';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

const category = KeywordsColumnConfiguration.get(KeywordsColumn.category);

const getIdKey = getIdKeyFor(Namespace.keywords);

const KeywordsCard: FC<{
  data: KeywordsAPIModel;
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
      history.push(getEntryPath(Namespace.keywords, id));
    },
    [history, id]
  );

  const links = useMemo(
    () => mapToLinks(Namespace.keywords, id, data.statistics),
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
          <h5>{data.keyword.name}</h5>
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

export default KeywordsCard;
