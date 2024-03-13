import { Link } from 'react-router-dom';
import {
  SpinnerIcon,
  TremblIcon,
  SwissProtIcon,
  UniParcIcon,
  InfoList,
  LongNumber,
} from 'franklin-sites';
import cn from 'classnames';

import MemberLink from '../entry/MemberLink';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';

import useDataApi from '../../../shared/hooks/useDataApi';

import { pluralise } from '../../../shared/utils/utils';
import parseDate from '../../../shared/utils/parseDate';
import { getEntryPath } from '../../../app/config/urls';
import apiUrls from '../../config/apiUrls';

import { Namespace } from '../../../shared/types/namespaces';

import { UniRefUIModel } from '../../adapters/uniRefConverter';

import {
  UniRefMembersResults,
  uniRefMembersFacets,
} from '../../types/membersEndpoint';

import styles from './styles/overview.module.scss';

enum MemberTypes {
  Reviewed = 'uniprotkb_reviewed_swissprot',
  Unreviewed = 'uniprotkb_unreviewed_trembl',
  UniParc = 'uniparc',
}

const MemberIcons = ({ id }: { id: string }) => {
  const { loading, data } = useDataApi<UniRefMembersResults>(
    apiUrls.members(id, {
      facets: uniRefMembersFacets,
      size: 0,
    })
  );

  if (loading) {
    return (
      <span className={styles.members}>
        <SpinnerIcon className={styles.members} />
      </span>
    );
  }

  if (!data) {
    return null;
  }

  const uniProtKBFacetValues = data?.facets?.find(
    (f) => f?.name === 'uniprot_member_id_type'
  )?.values;
  const uniProtReviewedCount = uniProtKBFacetValues?.find(
    (fv) => fv.value === MemberTypes.Reviewed
  )?.count;
  const uniProtUnreviewedCount = uniProtKBFacetValues?.find(
    (fv) => fv.value === MemberTypes.Unreviewed
  )?.count;
  const uniParcCount = data?.facets
    ?.find((f) => f?.name === 'member_id_type')
    ?.values?.find((fv) => fv.value === MemberTypes.UniParc)?.count;

  const pathname = getEntryPath(Namespace.uniref, id);

  return (
    <>
      {uniProtReviewedCount && (
        <Link
          to={{
            pathname,
            search: `facets=uniprot_member_id_type:${MemberTypes.Reviewed}`,
          }}
          className={cn(styles.members, styles['uniprotkb-reviewed'])}
          title={`${uniProtReviewedCount} UniProtKB reviewed ${pluralise(
            'member',
            uniProtReviewedCount
          )}`}
        >
          <SwissProtIcon />
        </Link>
      )}
      {uniProtUnreviewedCount && (
        <Link
          to={{
            pathname,
            search: `facets=uniprot_member_id_type:${MemberTypes.Unreviewed}`,
          }}
          className={cn(styles.members, styles['uniprotkb-unreviewed'])}
          title={`${uniProtUnreviewedCount} UniProtKB unreviewed ${pluralise(
            'member',
            uniProtUnreviewedCount
          )}`}
        >
          <TremblIcon />
        </Link>
      )}
      {uniParcCount && (
        <Link
          to={{
            pathname,
            search: `facets=member_id_type:${MemberTypes.UniParc}`,
          }}
          className={cn(styles.members, styles.uniparc)}
          title={`${uniParcCount} UniParc ${pluralise('member', uniParcCount)}`}
        >
          <UniParcIcon />
        </Link>
      )}
    </>
  );
};

const Overview = ({ transformedData }: { transformedData: UniRefUIModel }) => {
  const infoData = [
    {
      title: 'Cluster name',
      content: transformedData.name.replace(/^Cluster: /, ''),
    },
    {
      title: 'Composition',
      content: (
        <>
          <LongNumber>{transformedData.memberCount}</LongNumber>{' '}
          {pluralise('member', transformedData.memberCount)}{' '}
          <MemberIcons id={transformedData.id} />
        </>
      ),
    },
    {
      title: 'Last updated',
      content: (
        <time dateTime={parseDate(transformedData.updated)?.toISOString()}>
          {transformedData.updated}
        </time>
      ),
    },
    {
      title: 'Seed',
      content: (
        <>
          Built on sequence <MemberLink accession={transformedData.seedId} />
        </>
      ),
    },
    {
      title: 'Common taxon',
      content: <TaxonomyView data={transformedData.commonTaxon} />,
    },
  ];

  return <InfoList columns infoData={infoData} />;
};

export default Overview;
