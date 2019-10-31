import React, { Fragment } from 'react';
import { InfoList, ExternalLink } from 'franklin-sites';
import { Link } from 'react-router-dom';
import SimpleView from './SimpleView';
import { OrganismData } from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';

type OrganismDataProps = {
  data: OrganismData;
};

export const OrganismLineage: React.FC<{ lineage: string[] }> = ({
  lineage,
}) => <Fragment>{lineage.join(' > ')}</Fragment>;

export const OrganismId: React.FC<{ taxonId: number | undefined }> = ({
  taxonId,
}) => {
  if (!taxonId) {
    return null;
  }
  return (
    <Fragment>
      <Link to={`taxonomy/${taxonId}`}>{`${taxonId} `}</Link>
      <ExternalLink
        url={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id=${taxonId}`}
      >
        NCBI
      </ExternalLink>
    </Fragment>
  );
};

const OrganismView: React.FC<OrganismDataProps> = ({
  data,
}): JSX.Element | null => {
  if (!data) {
    return null;
  }

  const termValue = `${data.scientificName}${
    data.commonName ? ` (${data.commonName})` : ''
  } ${data.synonyms && data.synonyms.length > 0 ? ` (${data.synonyms})` : ''}`;

  return (
    <SimpleView termValue={termValue} linkTo={`/taxonomy/${data.taxonId}`} />
  );
};

export const OrganismListView: React.FC<{
  data?: OrganismData;
  hosts?: OrganismData[];
}> = ({ data, hosts }): JSX.Element | null => {
  if (!data) {
    return null;
  }
  const infoListData: { title: string; content: JSX.Element | string }[] = [];
  if (data.scientificName) {
    infoListData.push({
      title: 'Organism',
      content: (
        <Link to={`/taxonomy/${data.taxonId}`}>
          {`${data.scientificName} (${data.commonName})`}
        </Link>
      ),
    });
  }
  if (data.taxonId) {
    infoListData.push({
      title: 'Taxonomic identifier',
      content: <OrganismId taxonId={data.taxonId} />,
    });
  }
  if (data.lineage) {
    infoListData.push({
      title: 'Taxonomic lineage',
      content: <OrganismLineage lineage={data.lineage} />,
    });
  }
  if (hosts) {
    infoListData.push({
      title: 'Virus hosts',
      content: (
        <Fragment>
          {hosts.map(host => (
            <p key={host.taxonId}>
              <OrganismView data={host} />
            </p>
          ))}
        </Fragment>
      ),
    });
  }
  return <InfoList infoData={infoListData} />;
};

export default OrganismView;
