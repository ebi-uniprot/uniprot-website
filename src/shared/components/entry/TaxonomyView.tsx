import { FC } from 'react';
import { InfoList, ExternalLink } from 'franklin-sites';
import { Link } from 'react-router-dom';

import SimpleView from '../views/SimpleView';

import externalUrls from '../../config/externalUrls';
import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import TaxonomyLightView from '../views/TaxonomyView';
import {
  isLineage,
  Lineage,
  TaxonomyDatum,
} from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';

type TaxonomyDataProps = {
  data: TaxonomyDatum;
};

export const TaxonomyLineage: FC<{ lineage: Lineage | string[] }> = ({
  lineage,
}) => {
  if (isLineage(lineage)) {
    return <></>;
  }
  return <>{lineage.join(' > ')}</>;
};

export const TaxonomyId: FC<{ taxonId?: number }> = ({ taxonId }) => {
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

const TaxonomyView: FC<TaxonomyDataProps> = ({ data }) => {
  if (!data?.taxonId) {
    return null;
  }

  const termValue = `${data.scientificName}${
    data.commonName ? ` (${data.commonName})` : ''
  } ${data.synonyms?.length ? ` (${data.synonyms.join(', ')})` : ''}`;

  return (
    <SimpleView
      termValue={termValue}
      linkTo={getEntryPath(Namespace.taxonomy, data.taxonId)}
    />
  );
};

export const TaxonomyListView: FC<{
  data?: TaxonomyDatum;
  hosts?: TaxonomyDatum[];
}> = ({ data, hosts }) => {
  if (!data) {
    return null;
  }
  const infoListData: { title: string; content: JSX.Element | string }[] = [];
  if (data.scientificName && data.taxonId) {
    infoListData.push({
      title: 'Organism',
      content: (
        <>
          <TaxonomyLightView organism={data} />
          {data.evidences?.length ? (
            <UniProtKBEvidenceTag evidences={data.evidences} />
          ) : null}
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
