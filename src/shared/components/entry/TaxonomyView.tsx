import React, { FC } from 'react';
import { InfoList, ExternalLink } from 'franklin-sites';
import { Link } from 'react-router-dom';

import SimpleView from '../../../uniprotkb/components/protein-data-views/SimpleView';

import externalUrls from '../../../uniprotkb/config/externalUrls';

import { OrganismData } from '../../../uniprotkb/adapters/namesAndTaxonomyConverter';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';

type TaxonomyDataProps = {
  data: OrganismData;
};

export const TaxonomyLineage: FC<{ lineage: string[] }> = ({ lineage }) => (
  <>{lineage.join(' > ')}</>
);

export const TaxonomyId: FC<{ taxonId?: number }> = ({ taxonId }) => {
  if (!taxonId) {
    return null;
  }
  return (
    <>
      <Link to={`taxonomy/${taxonId}`}>{`${taxonId} `}</Link>
      <ExternalLink url={externalUrls.NCBI(taxonId)}>NCBI</ExternalLink>
    </>
  );
};

const TaxonomyView: FC<TaxonomyDataProps> = ({ data }) => {
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

export const TaxonomyListView: React.FC<{
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
        <>
          <Link to={`/taxonomy/${data.taxonId}`}>
            {`${data.scientificName} (${data.commonName})`}
          </Link>
          {data.evidences && data.evidences.length && (
            <UniProtKBEvidenceTag evidences={data.evidences} />
          )}
        </>
      ),
    });
  }
  if (data.taxonId) {
    infoListData.push({
      title: 'Taxonomic identifier',
      content: <TaxonomyId taxonId={data.taxonId} />,
    });
  }
  if (data.lineage) {
    infoListData.push({
      title: 'Taxonomic lineage',
      content: <TaxonomyLineage lineage={data.lineage} />,
    });
  }
  if (hosts) {
    infoListData.push({
      title: 'Virus hosts',
      content: (
        <>
          {hosts.map((host) => (
            <p key={host.taxonId}>
              <TaxonomyView data={host} />
            </p>
          ))}
        </>
      ),
    });
  }
  return <InfoList infoData={infoListData} />;
};

export default TaxonomyView;
