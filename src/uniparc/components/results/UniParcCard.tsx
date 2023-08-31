import { useMemo } from 'react';
import { Card, LongNumber } from 'franklin-sites';
import { Link } from 'react-router-dom';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import BasketStatus from '../../../basket/BasketStatus';
import CardCheckboxCell from '../../../shared/components/CardCheckboxCell';

import {
  UniParcAPIModel,
  XRefsInternalDatabasesEnum,
} from '../../adapters/uniParcConverter';

import { getEntryPath } from '../../../app/config/urls';
import { getIdKeyForNamespace } from '../../../shared/utils/getIdKeyForNamespace';
import xrefGetter from '../../utils/xrefGetter';
import { pluralise } from '../../../shared/utils/utils';

import UniParcColumnConfiguration, {
  UniParcColumn,
} from '../../config/UniParcColumnConfiguration';
import RenderColumnsInCard from '../../../shared/components/results/RenderColumnsInCard';

import { Namespace } from '../../../shared/types/namespaces';
import { EntryType } from '../../../shared/components/entry/EntryTypeIcon';

import renderColumnsInCardStyles from '../../../shared/components/results/styles/render-columns-in-card.module.scss';

const mainInfoColumns = [
  UniParcColumn.firstSeen,
  UniParcColumn.lastSeen,
  UniParcColumn.length,
].map((column) => UniParcColumnConfiguration.get(column));

const uniProtKBCounter = (data: UniParcAPIModel) => {
  let reviewed = 0;
  let unreviewed = 0;
  for (const xref of data.uniParcCrossReferences || []) {
    if (xref.database === XRefsInternalDatabasesEnum.REVIEWED) {
      reviewed += 1;
    } else if (xref.database === XRefsInternalDatabasesEnum.UNREVIEWED) {
      unreviewed += 1;
    }
  }
  return { reviewed, unreviewed };
};

const getIdKey = getIdKeyForNamespace(Namespace.uniparc);

const UniParcCard = ({ data }: { data: UniParcAPIModel }) => {
  const id = getIdKey(data);

  const organismCount = xrefGetter(data, 'organism', 'taxonId')?.length || 0;
  const uniProtKBCount = useMemo(() => uniProtKBCounter(data), [data]);

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="small">
            <Link to={getEntryPath(Namespace.uniparc, id)}>
              <EntryTitle mainTitle={id} entryType={EntryType.UNIPARC} />
            </Link>
          </h2>
          <BasketStatus id={id} className="tiny" />
        </>
      }
      headerSeparator={false}
    >
      <div className={renderColumnsInCardStyles['result-card__info-container']}>
        <span className={renderColumnsInCardStyles['result-card__info-bit']}>
          <strong>{pluralise('Organism', organismCount)}: </strong>
          <LongNumber>{organismCount}</LongNumber>
        </span>
        <span className={renderColumnsInCardStyles['result-card__info-bit']}>
          <strong>UniprotKB entries: </strong>
          <LongNumber>{uniProtKBCount.reviewed}</LongNumber> reviewed and{' '}
          <LongNumber>{uniProtKBCount.unreviewed}</LongNumber> unreviewed
        </span>
      </div>
      <RenderColumnsInCard data={data} renderers={mainInfoColumns} />
    </Card>
  );
};

export default UniParcCard;
