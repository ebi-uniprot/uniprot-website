import { FC, useCallback, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'franklin-sites';

import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';

import { Namespace } from '../../../../shared/types/namespaces';
import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';
import TaxonomyColumnConfiguration, {
  TaxonomyColumn,
} from '../../config/TaxonomyColumnConfiguration';

const BLOCK_CLICK_ON_CARD = new Set(['A', 'INPUT', 'BUTTON']);

const lineage = TaxonomyColumnConfiguration.get(TaxonomyColumn.lineage);

const getIdKey = getIdKeyFor(Namespace.taxonomy);

const TaxonomyCard: FC<{
  data: TaxonomyAPIModel;
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
      history.push(getEntryPath(Namespace.taxonomy, id));
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
          <h5>
            <TaxonomyView data={data} />
          </h5>
          <RenderColumnsInCard data={data} renderers={lineage} />
        </div>
      </div>
    </Card>
  );
};

export default TaxonomyCard;
