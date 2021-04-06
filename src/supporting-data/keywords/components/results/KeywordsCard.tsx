import { Card } from 'franklin-sites';
import { FC, useCallback, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';

import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';

import { KeywordsAPIModel } from '../../adapters/keywordsConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import KeywordsColumnConfiguration, {
  KeywordsColumn,
} from '../../config/KeywordsColumnConfiguration';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

const BLOCK_CLICK_ON_CARD = new Set(['A', 'INPUT', 'BUTTON']);

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
      if (BLOCK_CLICK_ON_CARD.has((event.target as HTMLElement).tagName)) {
        return;
      }
      history.push(getEntryPath(Namespace.keywords, id));
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
