import { useMemo } from 'react';
import { Card } from 'franklin-sites';

import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';
import { mapToLinks } from '../../../../shared/components/MapTo';

import { KeywordsAPIModel } from '../../adapters/keywordsConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import KeywordsColumnConfiguration, {
  KeywordsColumn,
} from '../../config/KeywordsColumnConfiguration';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

const category = KeywordsColumnConfiguration.get(KeywordsColumn.category);

const getIdKey = getIdKeyFor(Namespace.keywords);

type Props = {
  data: KeywordsAPIModel;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
};

const KeywordsCard = ({ data, selected, handleEntrySelection }: Props) => {
  const id = getIdKey(data);

  const links = useMemo(
    () => mapToLinks(Namespace.keywords, id, data.statistics),
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
          <h2 className="tiny">{data.keyword.name}</h2>
        </>
      }
      headerSeparator={false}
      to={getEntryPath(Namespace.keywords, id)}
      links={links}
    >
      <div className={renderColumnsInCardStyles['result-card__info-container']}>
        {data.definition}
      </div>
      <RenderColumnsInCard renderers={category} data={data} />
    </Card>
  );
};

export default KeywordsCard;
