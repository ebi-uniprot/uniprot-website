import { Card } from 'franklin-sites';
import { FC, useCallback } from 'react';
import { useHistory } from 'react-router';
import { getEntryPath } from '../../../../app/config/urls';
import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
import RenderColumnInCard from '../../../../shared/components/results/RenderColumnInCard';
import { Namespace } from '../../../../shared/types/namespaces';
import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';
import TaxonomyColumnConfiguration, {
  TaxonomyColumn,
} from '../../config/TaxonomyColumnConfiguration';

const mainInfoColumns = [TaxonomyColumn.lineage];

const TaxonomyCards: FC<{
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
      <section className="result-card">
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
          <div className="result-card__info-container">
            {mainInfoColumns.map((column) => (
              <RenderColumnInCard
                type={column}
                data={data}
                columnConfig={TaxonomyColumnConfiguration}
                key={column}
              />
            ))}
          </div>
        </div>
      </section>
    </Card>
  );
};

export default TaxonomyCards;
