import { Fragment, ReactNode } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import ExternalLink from '../ExternalLink';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import LazyComponent from '../LazyComponent';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls/apiUrls';
import externalUrls from '../../config/externalUrls';
import { getEntryPath } from '../../../app/config/urls';
import { pluralise } from '../../utils/utils';

import { Namespace } from '../../types/namespaces';
import { Lineage } from '../../types/apiModel';
import {
  TaxonomyAPIModel,
  TaxonomyDatum,
} from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { UniProtKBSimplifiedTaxonomy } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { ReferenceComment } from '../../../supporting-data/citations/adapters/citationsConverter';

import styles from './styles/taxonomy-view.module.css';

const TaxonomyId = ({ taxonId }: { taxonId?: number }) => {
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

type TaxonomyDataProps = {
  data: TaxonomyDatum | UniProtKBSimplifiedTaxonomy;
  // To be used only for Proteomes
  strain?: string;
  displayOnlyID?: boolean;
  className?: string;
  noLink?: boolean;
};

const TaxonomyView = ({
  data,
  strain,
  displayOnlyID,
  className,
  noLink = false,
}: TaxonomyDataProps) => {
  const { scientificName, commonName, taxonId, synonyms } = data;

  if (taxonId === 1) {
    return <span className={className}>Top level (root)</span>;
  }

  const termValue = `${scientificName || taxonId}${
    commonName ? ` (${commonName})` : ''
  }${synonyms?.length ? ` (${synonyms.join(', ')})` : ''}${
    strain ? ` (${strain})` : ''
  }`;

  const content = displayOnlyID ? String(taxonId) : termValue;
  const title = `${
    termValue.length > 0 ? `${termValue}, ` : ''
  }taxon ID ${taxonId}`;

  if (noLink) {
    return (
      <span className={className} title={title} translate="no">
        {content}
      </span>
    );
  }

  return (
    <Link
      to={getEntryPath(Namespace.taxonomy, data.taxonId)}
      className={className}
      title={title}
      translate="no"
    >
      {content}
    </Link>
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
      ? Array.from(lineage).map((data, index) => (
          <Fragment key={data.taxonId || index}>
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
    blockLoading ? null : apiUrls.entry.entry(`${taxonId}`, Namespace.taxonomy)
  );

  let lineage: Array<Partial<Lineage>> = fallbackData.map((scientificName) => ({
    scientificName,
  }));
  if (data && data.lineage) {
    lineage = data.lineage;
  }

  return <TaxonomyLineage lineage={lineage} />;
};

type TaxonomyListViewProps = {
  data?: TaxonomyDatum | UniProtKBSimplifiedTaxonomy;
  hosts?: TaxonomyDatum[];
  strains?: ReferenceComment[];
};

export const TaxonomyListView = ({
  data,
  hosts,
  strains,
}: TaxonomyListViewProps) => {
  if (!data) {
    return null;
  }
  const infoListData: { title: ReactNode; content: ReactNode }[] = [];
  if (data.taxonId) {
    infoListData.push({
      title: (
        <span data-article-id="taxonomic_identifier">Taxonomic identifier</span>
      ),
      content: <TaxonomyId taxonId={data.taxonId} />,
    });
  }
  if (data.scientificName && data.taxonId) {
    infoListData.push({
      title: <span data-article-id="organism-name">Organism</span>,
      content: (
        <>
          <TaxonomyView data={data} />
          <UniProtKBEvidenceTag evidences={data.evidences} />
        </>
      ),
    });
  }
  if (strains?.length) {
    infoListData.push({
      title: pluralise('Strain', strains.length),
      content: (
        <ExpandableList displayNumberOfHiddenItems descriptionString="strains">
          {strains.map((strain) => (
            <Fragment key={strain.value}>
              {strain.value}
              <UniProtKBEvidenceTag evidences={strain.evidences} />
            </Fragment>
          ))}
        </ExpandableList>
      ),
    });
  }
  if (data.lineage?.length) {
    infoListData.push({
      title: <span data-article-id="taxonomic_lineage">Taxonomic lineage</span>,
      content: (
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
      title: <span data-article-id="virus_host">Virus hosts</span>,
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
