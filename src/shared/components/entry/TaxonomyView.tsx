import { Fragment, ReactNode } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import ExternalLink from '../ExternalLink';
import SimpleView from '../views/SimpleView';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import LazyComponent from '../LazyComponent';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';
import externalUrls from '../../config/externalUrls';
import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';
import { Lineage } from '../../types/apiModel';
import {
  TaxonomyAPIModel,
  TaxonomyDatum,
} from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { UniProtKBSimplifiedTaxonomy } from '../../../uniprotkb/adapters/uniProtkbConverter';

import styles from './styles/taxonomy-view.module.css';

type TaxonomyDataProps = {
  data: TaxonomyDatum | UniProtKBSimplifiedTaxonomy;
  displayOnlyID?: boolean;
  className?: string;
  noLink?: boolean;
};

export const TaxonomyId = ({ taxonId }: { taxonId?: number }) => {
  if (!taxonId) {
    return null;
  }
  return (
    <>
      <Link
        to={getEntryPath(Namespace.taxonomy, taxonId)}
      >{`${taxonId} `}</Link>
      <ExternalLink url={externalUrls.NCBI(taxonId)}>NCBI</ExternalLink>
    </>
  );
};

const TaxonomyView = ({
  data,
  displayOnlyID,
  className,
  noLink = false,
}: TaxonomyDataProps) => {
  const { scientificName, commonName, taxonId, synonyms } = data;

  const termValue = `${scientificName || taxonId}${
    commonName ? ` (${commonName})` : ''
  }${synonyms?.length ? ` (${synonyms.join(', ')})` : ''}`;

  return (
    <SimpleView
      termValue={displayOnlyID ? String(taxonId) : termValue}
      linkTo={
        noLink ? undefined : getEntryPath(Namespace.taxonomy, data.taxonId)
      }
      title={`${
        termValue.length > 0 ? `${termValue}, ` : ''
      }taxon ID ${taxonId}`}
      className={className}
    />
  );
};

export const TaxonomyLineage = ({
  lineage,
  displayOnlyID,
}: {
  lineage?: Array<Partial<Lineage>>;
  displayOnlyID?: boolean;
}) => (
  <>
    {lineage?.length
      ? Array.from(lineage)
          .reverse()
          .map((data, index) => (
            <Fragment key={data.taxonId || data.scientificName || index}>
              {index ? ' > ' : undefined}
              {data.taxonId ? (
                <TaxonomyView
                  data={data as Lineage}
                  displayOnlyID={displayOnlyID}
                  className={data.hidden ? styles['hidden-taxon'] : undefined}
                />
              ) : (
                data.scientificName
              )}
            </Fragment>
          ))
      : null}
  </>
);

const SelfLoadingTaxonomyLineage = ({
  taxonId,
  fallbackData,
  blockLoading,
}: {
  taxonId: number;
  fallbackData: string[];
  blockLoading?: boolean;
}) => {
  const { data } = useDataApi<TaxonomyAPIModel>(
    blockLoading ? null : apiUrls.entry(`${taxonId}`, Namespace.taxonomy)
  );

  let lineage: Array<Partial<Lineage>> = fallbackData
    .map((scientificName) => ({
      scientificName,
    }))
    .reverse(); // Lineage as string and as objects don't have the same order...
  if (data && data.lineage) {
    lineage = data.lineage;
  }

  return <TaxonomyLineage lineage={lineage} />;
};

export const TaxonomyListView = ({
  data,
  hosts,
}: {
  data?: TaxonomyDatum | UniProtKBSimplifiedTaxonomy;
  hosts?: TaxonomyDatum[];
}) => {
  if (!data) {
    return null;
  }
  const infoListData: { title: ReactNode; content: ReactNode }[] = [];
  if (data.scientificName && data.taxonId) {
    infoListData.push({
      title: 'Organism',
      content: (
        <>
          <TaxonomyView data={data} />
          {data.evidences?.length ? (
            <UniProtKBEvidenceTag evidences={data.evidences} />
          ) : null}
        </>
      ),
    });
  }
  if (data.taxonId) {
    infoListData.push({
      title: (
        <span data-article-id="taxonomic_identifier">Taxonomic identifier</span>
      ),
      content: <TaxonomyId taxonId={data.taxonId} />,
    });
  }
  if (data.lineage?.length) {
    infoListData.push({
      title: <span data-article-id="taxonomic_lineage">Taxonomic lineage</span>,
      content: (
        // Will wait to be in view in order to fetch the lineage data
        <LazyComponent
          fallback={
            <SelfLoadingTaxonomyLineage
              taxonId={data.taxonId}
              fallbackData={data.lineage as string[]}
              blockLoading
            />
          }
        >
          <SelfLoadingTaxonomyLineage
            taxonId={data.taxonId}
            fallbackData={data.lineage as string[]}
          />
        </LazyComponent>
      ),
    });
  }
  if (hosts) {
    infoListData.push({
      title: 'Virus hosts',
      content: (
        <ExpandableList
          displayNumberOfHiddenItems
          descriptionString="virus hosts"
        >
          {hosts.map((host) => (
            <TaxonomyView key={host.taxonId} data={host} />
          ))}
        </ExpandableList>
      ),
    });
  }
  return <InfoList infoData={infoListData} />;
};

export default TaxonomyView;
