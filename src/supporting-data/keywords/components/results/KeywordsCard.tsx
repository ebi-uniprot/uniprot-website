import { Card } from 'franklin-sites';
import { useMemo } from 'react';
import { Link } from 'react-router';

import { getEntryPath } from '../../../../app/config/urls';
import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';
import { mapToLinks } from '../../../../shared/components/MapTo';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';
import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';
import { Namespace } from '../../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import { KeywordsAPIModel } from '../../adapters/keywordsConverter';
import KeywordsColumnConfiguration, {
  KeywordsColumn,
} from '../../config/KeywordsColumnConfiguration';

const category = KeywordsColumnConfiguration.get(KeywordsColumn.category);

const getIdKey = getIdKeyForNamespace(Namespace.keywords);

const KeywordsCard = ({ data }: { data: KeywordsAPIModel }) => {
  const id = getIdKey(data);

  const links = useMemo(
    () => mapToLinks(Namespace.keywords, id, data.statistics),
    [data.statistics, id]
  );

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="small">
            <Link to={getEntryPath(Namespace.keywords, id)}>
              {data.keyword.name}
            </Link>
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

export default KeywordsCard;
