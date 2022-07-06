import { Fragment, ReactNode } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import ExternalLink from '../ExternalLink';
import SimpleView from '../views/SimpleView';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';

import externalUrls from '../../config/externalUrls';
import { getEntryPath } from '../../../app/config/urls';

import * as logging from '../../utils/logging';

import { Namespace } from '../../types/namespaces';
import { Lineage } from '../../types/apiModel';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';

import styles from './styles/taxonomy-view.module.css';

type TaxonomyDataProps = {
  data: TaxonomyDatum;
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
  /* istanbul ignore if */
  if (!data.taxonId) {
    logging.warn('No taxon ID, this should not happen', { extra: { data } });
    return null;
  }
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
  lineage?: Lineage[];
  displayOnlyID?: boolean;
}) => (
  <>
    {lineage?.length
      ? Array.from(lineage)
          .reverse()
          .map((data, index) => (
            <Fragment key={data.taxonId}>
              {index ? ' > ' : undefined}
              <TaxonomyView
                data={data}
                displayOnlyID={displayOnlyID}
                className={data.hidden ? styles['hidden-taxon'] : undefined}
              />
            </Fragment>
          ))
      : null}
  </>
);

export const TaxonomyListView = ({
  data,
  hosts,
}: {
  data?: TaxonomyDatum;
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
  if (data.lineage) {
    infoListData.push({
      title: <span data-article-id="taxonomic_lineage">Taxonomic lineage</span>,
      content: <TaxonomyLineage lineage={data.lineage} />,
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
