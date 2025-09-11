import { Card, LongNumber } from 'franklin-sites';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import BasketStatus from '../../../basket/BasketStatus';
import CardCheckboxCell from '../../../shared/components/CardCheckboxCell';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import { EntryType } from '../../../shared/components/entry/EntryTypeIcon';
import RenderColumnsInCard from '../../../shared/components/results/RenderColumnsInCard';
import renderColumnsInCardStyles from '../../../shared/components/results/styles/render-columns-in-card.module.scss';
import { Namespace } from '../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../shared/utils/getIdKey';
import { UniParcLiteAPIModel } from '../../adapters/uniParcConverter';
import UniParcColumnConfiguration, {
  UniParcColumn,
} from '../../config/UniParcColumnConfiguration';
import { TabLocation } from '../../types/entry';

const mainInfoColumns = [
  UniParcColumn.firstSeen,
  UniParcColumn.lastSeen,
  UniParcColumn.length,
].map((column) => UniParcColumnConfiguration.get(column));

const getIdKey = getIdKeyForNamespace(Namespace.uniparc);

const UniParcCard = ({ data }: { data: UniParcLiteAPIModel }) => {
  const id = getIdKey(data);

  const taxonCount = data.commonTaxons?.length ?? 0;
  const uniProtKBCount = data.uniProtKBAccessions?.length;

  return (
    <Card
      header={
        <>
          <CardCheckboxCell id={id} />
          <h2 className="small">
            <Link to={getEntryPath(Namespace.uniparc, id, TabLocation.Entry)}>
              <EntryTitle mainTitle={id} entryType={EntryType.UNIPARC} />
            </Link>
          </h2>
          <BasketStatus id={id} className="tiny" />
        </>
      }
      headerSeparator={false}
    >
      <div className={renderColumnsInCardStyles['result-card__info-container']}>
        {taxonCount > 0 && (
          <span className={renderColumnsInCardStyles['result-card__info-bit']}>
            <strong>
              {taxonCount === 1 ? 'Common taxon' : 'Common taxons'}:{' '}
            </strong>
            {data.commonTaxons?.map((taxon, i) => (
              <Fragment key={taxon.commonTaxonId}>
                <Link
                  to={getEntryPath(Namespace.taxonomy, taxon.commonTaxonId)}
                >
                  {taxon.commonTaxon}
                </Link>
                {i < taxonCount - 1 ? ', ' : ''}
              </Fragment>
            ))}
          </span>
        )}
        {uniProtKBCount && (
          <span className={renderColumnsInCardStyles['result-card__info-bit']}>
            <strong>UniProtKB entries: </strong>
            <LongNumber>{uniProtKBCount}</LongNumber>
          </span>
        )}
      </div>
      <RenderColumnsInCard data={data} renderers={mainInfoColumns} />
    </Card>
  );
};

export default UniParcCard;
