import { useMemo } from 'react';
import { Card } from 'franklin-sites';

import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';
import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';

import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import { mapToLinks } from '../../../../shared/components/MapTo';

import { Namespace } from '../../../../shared/types/namespaces';
import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';
import TaxonomyColumnConfiguration, {
  TaxonomyColumn,
} from '../../config/TaxonomyColumnConfiguration';

const lineage = TaxonomyColumnConfiguration.get(TaxonomyColumn.lineage);

const getIdKey = getIdKeyForNamespace(Namespace.taxonomy);

const TaxonomyCard = ({ data }: { data: TaxonomyAPIModel }) => {
  const id = getIdKey(data);

  const links = useMemo(
    () => mapToLinks(Namespace.taxonomy, id, data.statistics),
    [data.statistics, id]
  );

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="small">
            <TaxonomyView data={data} />
          </h2>
        </>
      }
      headerSeparator={false}
      links={links}
    >
      <RenderColumnsInCard data={data} renderers={lineage} />
    </Card>
  );
};

export default TaxonomyCard;
