import { Card } from 'franklin-sites';
import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../../app/config/urls';

import { Namespace } from '../../../../shared/types/namespaces';
import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';
import TaxonomyColumnConfiguration, {
  TaxonomyColumn,
} from '../../config/TaxonomyColumnConfiguration';

const lineage = TaxonomyColumnConfiguration.get(TaxonomyColumn.lineage);

const TaxonomyCard: FC<{
  data: TaxonomyAPIModel;
  selected?: boolean;
  handleEntrySelection: (rowId: string) => void;
}> = ({ data, selected, handleEntrySelection }) => {
  const history = useHistory();

  const handleCardClick = useCallback(() => {
    history.push(getEntryPath(Namespace.proteomes, data.taxonId));
  }, [history, data.taxonId]);

  return (
    <Card onClick={handleCardClick}>
      <div className="result-card">
        <div className="result-card__left">
          <input
            type="checkbox"
            checked={selected}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleEntrySelection(String(data.taxonId))}
            data-testid="up-card-checkbox"
          />
        </div>
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
