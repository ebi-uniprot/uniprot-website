import { useMemo } from 'react';
import { Card } from 'franklin-sites';

import { getEntryPath } from '../../../../app/config/urls';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';
import { mapToLinks } from '../../../../shared/components/MapTo';

import { UniRuleAPIModel } from '../../adapters/uniRuleConverter';
import { Namespace } from '../../../../shared/types/namespaces';

import renderColumnsInCardStyles from '../../../../shared/components/results/styles/render-columns-in-card.module.scss';

const getIdKey = getIdKeyFor(Namespace.unirule);

type Props = {
  data: UniRuleAPIModel;
  selected?: boolean;
  handleEntrySelection?: (rowId: string) => void;
};

const UniRuleCard = ({ data, selected, handleEntrySelection }: Props) => {
  const id = getIdKey(data);

  const links = useMemo(
    () =>
      mapToLinks(Namespace.unirule, data.uniRuleId, {
        reviewedProteinCount: 0,
        unreviewedProteinCount: data.proteinsAnnotatedCount,
      }),
    [data.proteinsAnnotatedCount, data.uniRuleId]
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
          <h2 className="tiny">{data.uniRuleId}</h2>
        </>
      }
      headerSeparator={false}
      to={getEntryPath(Namespace.unirule, id)}
      links={links}
    >
      <div className={renderColumnsInCardStyles['result-card__info-container']}>
        {data.uniRuleId}
      </div>
    </Card>
  );
};

export default UniRuleCard;
