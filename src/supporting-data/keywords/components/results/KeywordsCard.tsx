import { useMemo } from 'react';
import { Card } from 'franklin-sites';
import { Link } from 'react-router-dom';

import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';
import CardCheckboxCell from '../../../../shared/components/CardCheckboxCell';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import { mapToLinks } from '../../../../shared/components/MapTo';

import { KeywordsAPIModel } from '../../adapters/keywordsConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import KeywordsColumnConfiguration, {
  KeywordsColumn,
} from '../../config/KeywordsColumnConfiguration';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

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
