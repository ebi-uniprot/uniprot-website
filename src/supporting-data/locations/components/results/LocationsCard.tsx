import { useMemo } from 'react';
import { Card } from 'franklin-sites';

import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';
import { mapToLinks } from '../../../../shared/components/MapTo';

import { LocationsAPIModel } from '../../adapters/locationsConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import LocationsColumnConfiguration, {
  LocationsColumn,
} from '../../config/LocationsColumnConfiguration';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

const category = LocationsColumnConfiguration.get(LocationsColumn.category);

const getIdKey = getIdKeyFor(Namespace.locations);

type Props = {
  data: LocationsAPIModel;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
};

const CitationCard = ({ data, selected, handleEntrySelection }: Props) => {
  const id = getIdKey(data);

  const links = useMemo(
    () => mapToLinks(Namespace.locations, id, data.statistics),
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
          <h2 className="tiny">{data.name}</h2>
        </>
      }
      headerSeparator={false}
      to={getEntryPath(Namespace.locations, id)}
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
