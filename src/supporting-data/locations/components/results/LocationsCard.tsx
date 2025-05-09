import { Card } from 'franklin-sites';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../../app/config/urls';
import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';
import { mapToLinks } from '../../../../shared/components/MapTo';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';
import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';
import { Namespace } from '../../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import { LocationsAPIModel } from '../../adapters/locationsConverter';
import LocationsColumnConfiguration, {
  LocationsColumn,
} from '../../config/LocationsColumnConfiguration';

const category = LocationsColumnConfiguration.get(LocationsColumn.category);

const getIdKey = getIdKeyForNamespace(Namespace.locations);

const CitationCard = ({ data }: { data: LocationsAPIModel }) => {
  const id = getIdKey(data);

  const links = useMemo(
    () => mapToLinks(Namespace.locations, id, data.statistics),
    [data.statistics, id]
  );

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="small">
            <Link to={getEntryPath(Namespace.locations, id)}>{data.name}</Link>
          </h2>
        </>
      }
      headerSeparator={false}
      links={links}
    >
      <div className={renderColumnsInCardStyles['result-card__info-container']}>
        {data.definition}
      </div>
      <RenderColumnsInCard renderers={category} data={data} />
    </Card>
  );
};

export default CitationCard;
