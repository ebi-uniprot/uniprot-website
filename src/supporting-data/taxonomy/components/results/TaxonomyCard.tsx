import { useMemo } from 'react';
import { Card } from 'franklin-sites';

import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';
import { mapToLinks } from '../../../../shared/components/MapTo';

import { Namespace } from '../../../../shared/types/namespaces';
import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';
import TaxonomyColumnConfiguration, {
  TaxonomyColumn,
} from '../../config/TaxonomyColumnConfiguration';

const lineage = TaxonomyColumnConfiguration.get(TaxonomyColumn.lineage);

const getIdKey = getIdKeyFor(Namespace.taxonomy);

type Props = {
  data: TaxonomyAPIModel;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
};

const TaxonomyCard = ({ data, selected, handleEntrySelection }: Props) => {
  const id = getIdKey(data);

  const links = useMemo(
    () => mapToLinks(Namespace.taxonomy, id, data.statistics),
    [data.statistics, id]
  );

  return (
    <Card
      header={
        <>
          {handleEntrySelection && (
            <input
              type="checkbox"
              checked={selected}
              onChange={() => handleEntrySelection(id)}
              data-testid="up-card-checkbox"
            />
          )}
          <h2 className="tiny">
            <TaxonomyView data={data} />
          </h2>
        </>
      }
      headerSeparator={false}
      to={getEntryPath(Namespace.taxonomy, id)}
      links={links}
    >
      <RenderColumnsInCard data={data} renderers={lineage} />
    </Card>
  );
};

export default TaxonomyCard;
